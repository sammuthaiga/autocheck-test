import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TopWordsResponseDto } from './dto/top-words-response.dto';
import { from } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';

@Injectable()
export class TopWordsService {
  private readonly apiUrl: string =
    process.env.HACKER_NEWS_API_URL || 'https://hacker-news.firebaseio.com/v0'; // Load API URL from .env

  /**
   * Fetches the last 25 stories and calculates the top 10 most occurring words in the titles.
   * @returns {Promise<TopWordsResponseDto[]>} - The top 10 most occurring words with their counts.
   */
  async getTop10WordsInLast25Stories(): Promise<TopWordsResponseDto[]> {
    // Fetch the IDs of the last 25 stories from the HackerNews API
    const response = await axios.get(`${this.apiUrl}/newstories.json`);
    const storyIds = response.data.slice(0, 25); // Only fetch the last 25 story IDs

    // Create an observable stream for fetching details of each story in parallel
    const stories$ = from(storyIds).pipe(
      mergeMap((id: number) =>
        from(axios.get(`${this.apiUrl}/item/${id}.json`)),
      ),
      map((response) => response.data.title), // Extract title from story data
    );

    // Convert the observable stream to a promise and retrieve the list of titles
    const titles = await stories$.pipe(toArray()).toPromise();

    // Calculate the word count for the titles
    const wordCount = this.countWords(titles);

    // Get the top 10 most occurring words from the word count
    return this.getTopWords(wordCount, 10);
  }

  /**
   * Counts the occurrences of each word in the titles.
   * @param {string[]} titles - The array of titles from the stories.
   * @returns {Record<string, number>} - A dictionary with each word and its count.
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
   * @param {Record<string, number>} wordCount - A dictionary with each word and its count.
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
          id: index + 1,
          word,
          count,
        }),
      );

    return sortedWords;
  }
}
