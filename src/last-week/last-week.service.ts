import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TopWordsResponseDto } from '../top-words/dto/top-words-response.dto';
import { from } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class LastWeekService {
  private readonly apiUrl: string = process.env.HACKER_NEWS_API_URL; // Load API URL from .env

  /**
   * Fetches stories from the last week and calculates the top 10 most occurring words in the titles.
   * @returns {Promise<TopWordsResponseDto[]>} - The top 10 most occurring words with their counts.
   */
  async getTop10WordsInLastWeekStories(): Promise<TopWordsResponseDto[]> {
    // Calculate the timestamp for one week ago
    const oneWeekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;

    // Fetch top stories in parallel using RxJS and filter by date
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

    // Calculate the word count
    const wordCount = this.countWords(titles);

    // Get the top 10 most occurring words
    return this.getTopWords(wordCount, 10);
  }

  /**
   * Counts the occurrences of each word in the titles.
   * @param {string[]} titles - The array of titles from the stories.
   * @returns {Record<string, number>} - The count of each word.
   */
  private countWords(titles: string[]): Record<string, number> {
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

  /**
   * Retrieves the top N most occurring words from the word count.
   * @param {Record<string, number>} wordCount - The count of each word.
   * @param {number} topN - The number of top words to return.
   * @returns {TopWordsResponseDto[]} - The top N most occurring words with their counts.
   */
  private getTopWords(
    wordCount: Record<string, number>,
    topN: number,
  ): TopWordsResponseDto[] {
    // Convert word count dictionary to an array of [word, count] tuples
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
      .slice(0, topN) // Select the top N words
      .map(
        ([word, count], index): TopWordsResponseDto => ({
          id: index + 1, // Add an ID based on the list index
          word,
          count,
        }),
      );

    return sortedWords;
  }
}