import { Test, TestingModule } from '@nestjs/testing';
import { HighKarmaService } from './high-karma.service';
import { TopWordsResponseDto } from '../top-words/dto/top-words-response.dto';

describe('HighKarmaService', () => {
  let service: HighKarmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HighKarmaService],
    }).compile();

    service = module.get<HighKarmaService>(HighKarmaService);
  });

  it('should correctly count words in titles', () => {
    // Define a set of titles
    const titles = ['Hello World', 'Hello again', 'Test Story'];

    // Expected word counts
    const expectedWordCount = {
      hello: 2,
      world: 1,
      again: 1,
      test: 1,
      story: 1,
    };

    // Call the countWords function
    const wordCount = service.countWords(titles);

    // Verify the word count
    expect(wordCount).toEqual(expectedWordCount);
  });

  it('should return top N words correctly', () => {
    // Define a word count dictionary
    const wordCount = {
      hello: 10,
      world: 5,
      test: 3,
      story: 2,
    };

    // Expected top N words
    const expectedTopWords: TopWordsResponseDto[] = [
      { id: 1, word: 'hello', count: 10 },
      { id: 2, word: 'world', count: 5 },
      { id: 3, word: 'test', count: 3 },
    ];

    // Call the getTopWords function
    const topWords = service.getTopWords(wordCount, 3);

    // Verify the top words
    expect(topWords).toEqual(expectedTopWords);
  });
});
