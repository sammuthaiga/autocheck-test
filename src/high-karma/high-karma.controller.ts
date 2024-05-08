import { Controller, Get } from '@nestjs/common';
import { HighKarmaService } from './high-karma.service';
import { TopWordsResponseDto } from '../top-words/dto/top-words-response.dto';

@Controller('high-karma')
export class HighKarmaController {
  constructor(private readonly highKarmaService: HighKarmaService) {}

  /**
   * Endpoint for fetching the top 10 most occurring words in the titles of stories from users with at least 10,000 karma.
   * @returns {Promise<TopWordsResponseDto[]>} - The top 10 most occurring words with their counts.
   */
  @Get()
  async getTop10WordsInHighKarmaStories(): Promise<TopWordsResponseDto[]> {
    return await this.highKarmaService.getTop10WordsInHighKarmaStories();
  }
}
