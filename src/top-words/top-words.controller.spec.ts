import { Test, TestingModule } from '@nestjs/testing';
import { TopWordsController } from './top-words.controller';

describe('TopWordsController', () => {
  let controller: TopWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopWordsController],
    }).compile();

    controller = module.get<TopWordsController>(TopWordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
