import { Module } from '@nestjs/common';
import { HighKarmaService } from './high-karma.service';
import { HighKarmaController } from './high-karma.controller';

@Module({
  providers: [HighKarmaService],
  controllers: [HighKarmaController],
})
export class HighKarmaModule {}
