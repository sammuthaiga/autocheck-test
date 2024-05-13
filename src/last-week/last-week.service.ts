import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TopWordsResponseDto } from '../top-words/dto/top-words-response.dto';
import { from } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class LastWeekService {
  private readonly apiUrl: string =
    process.env.HACKER_NEWS_API_URL || 'https://hacker-news.firebaseio.com/v0'; // Load API URL from .env

  async getTop10WordsInLastWeekStories(): Promise<TopWordsResponseDto[]> {
    const oneWeekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;

    const response = await axios.get(`${this.apiUrl}/newstories.json`);
    const storyIds = response.data;

    const stories$ = from(storyIds).pipe(
      mergeMap((id: number) =>
        from(axios.get(`${this.apiUrl}/item/${id}.json`)).pipe(
          map((res) => res.data),
          map((story) => {
            if (story.time >= oneWeekAgo && story.title) {
              return story.title;
            }
          }),
        ),
      ),
      toArray(),
    );

    const titles = await stories$.toPromise();

    const wordCount = this.countWords(titles);

    return this.getTopWords(wordCount, 10);
  }

  /**
   * Counts the occurrences of each word in the titles.
   * @param titles - The array of titles from the stories.
   * @returns - The count of each word.
   */
  public countWords(titles: string[]): Record<string, number> {
    const wordCount: Record<string, number> = {};
    titles.forEach((title) => {
      const words = title.toLowerCase().split(/\s+/);
      words.forEach((word) => {
        if (word) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
    });
    return wordCount;
  }

  private getTopWords(
    wordCount: Record<string, number>,
    topN: number,
  ): TopWordsResponseDto[] {
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN)
      .map(
        ([word, count], index): TopWordsResponseDto => ({
          id: index + 1,
          word,
          count,
        }),
      );

    return sortedWords;
  }
}
