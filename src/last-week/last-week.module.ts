import { Module } from '@nestjs/common';
import { LastWeekService } from './last-week.service';
import { LastWeekController } from './last-week.controller';

@Module({
  providers: [LastWeekService],
  controllers: [LastWeekController],
})
export class LastWeekModule {}
