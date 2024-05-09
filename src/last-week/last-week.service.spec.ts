import { Test, TestingModule } from '@nestjs/testing';
import { LastWeekService } from './last-week.service';
import mockAxios from 'jest-mock-axios';
import { TopWordsResponseDto } from '../top-words/dto/top-words-response.dto';

jest.mock('axios');

describe('LastWeekService', () => {
  let service: LastWeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LastWeekService],
    }).compile();

    service = module.get<LastWeekService>(LastWeekService);
  });

  afterEach(() => {
    // Clear mockAxios after each test
    mockAxios.reset();
  });

  it('should return top 10 words from last week stories', async () => {
    // Mock response for `newstories.json` endpoint
    const storyIds = [1, 2, 3];
    mockAxios.get.mockResolvedValueOnce({ data: storyIds });

    // Mocking `item/{id}.json` endpoint
    mockAxios.get.mockResolvedValueOnce({
      data: {
        time: Math.floor(Date.now() / 1000) - 3 * 24 * 60 * 60,
        title: 'Story about technology',
      },
    });
    mockAxios.get.mockResolvedValueOnce({
      data: {
        time: Math.floor(Date.now() / 1000) - 2 * 24 * 60 * 60,
        title: 'Another story about innovation',
      },
    });
    mockAxios.get.mockResolvedValueOnce({
      data: {
        time: Math.floor(Date.now() / 1000) - 4 * 24 * 60 * 60,
        title: 'Technology and innovation',
      },
    });

    // Mock `user/{username}.json` endpoint
    mockAxios.get.mockResolvedValueOnce({ data: { karma: 15000 } });
    mockAxios.get.mockResolvedValueOnce({ data: { karma: 12000 } });
    mockAxios.get.mockResolvedValueOnce({ data: { karma: 20000 } });

    // Expected top words
    const expectedTopWords: TopWordsResponseDto[] = [
      { id: 1, word: 'story', count: 2 },
      { id: 2, word: 'technology', count: 2 },
      { id: 3, word: 'about', count: 2 },
      { id: 4, word: 'innovation', count: 2 },
      { id: 5, word: 'another', count: 1 },
      { id: 6, word: 'and', count: 1 },
    ];

    // Call the function
    const topWords = await service.getTop10WordsInLastWeekStories();
    expect(topWords).toEqual(expectedTopWords);
  });
});
