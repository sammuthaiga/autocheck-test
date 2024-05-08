import { Test, TestingModule } from '@nestjs/testing';
import { LastWeekController } from './last-week.controller';

describe('LastWeekController', () => {
  let controller: LastWeekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LastWeekController],
    }).compile();

    controller = module.get<LastWeekController>(LastWeekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
