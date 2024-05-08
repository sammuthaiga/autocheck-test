import { Test, TestingModule } from '@nestjs/testing';
import { LastWeekService } from './last-week.service';

describe('LastWeekService', () => {
  let service: LastWeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LastWeekService],
    }).compile();

    service = module.get<LastWeekService>(LastWeekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
