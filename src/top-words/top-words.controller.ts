import { Controller, Get } from '@nestjs/common';
import { TopWordsService } from './top-words.service';
import { TopWordsResponseDto } from './dto/top-words-response.dto';

@Controller('top-words')
export class TopWordsController {
  constructor(private readonly topWordsService: TopWordsService) {}

  /**
   * Handles the endpoint for fetching the top 10 most occurring words in the titles of the last 25 stories.
   * @returns {Promise<TopWordsResponseDto[]>} - The top 10 most occurring words with their counts.
   */
  @Get('last-25')
  async getTop10WordsInLast25Stories(): Promise<TopWordsResponseDto[]> {
    return await this.topWordsService.getTop10WordsInLast25Stories();
  }
}
