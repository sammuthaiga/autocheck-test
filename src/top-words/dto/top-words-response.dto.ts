import { IsString, IsInt } from 'class-validator';

/**
 * DTO for the response of the endpoint that returns the top 10 most occurring words in the titles of the last 25 stories.
 */
export class TopWordsResponseDto {
  id: number;
  @IsString()
  word: string;

  @IsInt()
  count: number;
}
