import { Module } from '@nestjs/common';
import { TopWordsController } from './top-words.controller';
import { TopWordsService } from './top-words.service';

@Module({
  controllers: [TopWordsController], // Register the controller
  providers: [TopWordsService], // Register the service
})
export class TopWordsModule {}
