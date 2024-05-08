import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopWordsModule } from './top-words/top-words.module';
import { LastWeekModule } from './last-week/last-week.module';
import { HighKarmaModule } from './high-karma/high-karma.module';

@Module({
  imports: [TopWordsModule, LastWeekModule, HighKarmaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
