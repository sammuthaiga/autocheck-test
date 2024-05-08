import { Test, TestingModule } from '@nestjs/testing';
import { TopWordsService } from './top-words.service';

describe('TopWordsService', () => {
  let service: TopWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopWordsService],
    }).compile();

    service = module.get<TopWordsService>(TopWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
