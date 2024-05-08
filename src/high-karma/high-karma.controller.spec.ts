import { Test, TestingModule } from '@nestjs/testing';
import { HighKarmaController } from './high-karma.controller';

describe('HighKarmaController', () => {
  let controller: HighKarmaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighKarmaController],
    }).compile();

    controller = module.get<HighKarmaController>(HighKarmaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
