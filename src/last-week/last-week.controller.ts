import { Controller, Get } from '@nestjs/common';
import { LastWeekService } from './last-week.service';
import { TopWordsResponseDto } from '../top-words/dto/top-words-response.dto';

@Controller('last-week')
export class LastWeekController {
  constructor(private readonly lastWeekService: LastWeekService) {}

  /**
   * Endpoint for fetching the top 10 most occurring words in the titles of the last week's stories.
   * @returns {Promise<TopWordsResponseDto[]>} - The top 10 most occurring words with their counts.
   */
  @Get()
  async getTop10WordsInLastWeekStories(): Promise<TopWordsResponseDto[]> {
    return await this.lastWeekService.getTop10WordsInLastWeekStories();
  }
}
