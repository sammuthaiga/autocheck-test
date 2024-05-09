import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { mergeMap, map, filter, toArray } from 'rxjs/operators';
import { TopWordsResponseDto } from '../top-words/dto/top-words-response.dto';
import axios from 'axios';

@Injectable()
export class HighKarmaService {
  private readonly apiUrl: string =
    process.env.HACKER_NEWS_API_URL || 'https://hacker-news.firebaseio.com/v0';

  async getTop10WordsInHighKarmaStories(): Promise<TopWordsResponseDto[]> {
    try {
      // Fetch the IDs of the last 600 stories
      const response = await axios.get(`${this.apiUrl}/newstories.json`);
      if (!response || !response.data) {
        throw new Error(
          'Response from newstories.json did not contain expected data',
        );
      }
      const storyIds = response.data.slice(0, 600);

      // Fetch details for each story in parallel using RxJS
      const stories$ = from(storyIds).pipe(
        mergeMap((id: number) =>
          from(axios.get(`${this.apiUrl}/item/${id}.json`)).pipe(
            map((response) => response.data),
            filter((story) => story && story.by && story.title),
            mergeMap((story) =>
              from(axios.get(`${this.apiUrl}/user/${story.by}.json`)).pipe(
                map((userResponse) => {
                  const user = userResponse.data;
                  if (user?.karma >= 10000) {
                    return story.title;
                  }
                  return null;
                }),
              ),
            ),
          ),
        ),
        filter((title) => title !== null),
        toArray(),
      );

      const titles = await stories$.toPromise();

      // Calculate word count and get top 10 words
      const wordCount = this.countWords(titles);
      return this.getTopWords(wordCount, 10);
    } catch (error) {
      console.error('Error fetching top 10 words:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  // Make these methods public
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

  public getTopWords(
    wordCount: Record<string, number>,
    topN: number,
  ): TopWordsResponseDto[] {
    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1]) // Sort by count
      .slice(0, topN)
      .map(
        ([word, count], index): TopWordsResponseDto => ({
          id: index + 1,
          word,
          count,
        }),
      );
  }
}
