import { Test, TestingModule } from '@nestjs/testing';
import { HighKarmaService } from './high-karma.service';

describe('HighKarmaService', () => {
  let service: HighKarmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HighKarmaService],
    }).compile();

    service = module.get<HighKarmaService>(HighKarmaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
