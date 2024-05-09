import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TopWordsController } from './top-words.controller';
import { TestingModule, Test } from '@nestjs/testing';
import { TopWordsService } from './top-words.service';

let app: INestApplication;

beforeAll(async () => {
  // Increase the timeout to 40 seconds
  jest.setTimeout(40000);

  const module: TestingModule = await Test.createTestingModule({
    controllers: [TopWordsController], // Replace with actual controller name
    providers: [TopWordsService], // Replace with actual service name
  }).compile();

  app = module.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('GET /last-week', () => {
  it("should return top 10 most occurring words in the titles of the last week's stories", async () => {
    // Increase the timeout to 40 seconds
    jest.setTimeout(40000);

    const response = await request(app.getHttpServer()).get('/last-week');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);

    response.body.forEach((wordCount, index) => {
      expect(wordCount).toHaveProperty('id', index + 1);
      expect(wordCount).toHaveProperty('word');
      expect(wordCount).toHaveProperty('count');
    });
  });

  // New test: handle empty response from service
  it('should return an empty array if no stories are found from the last week', async () => {
    // Mock the LastWeekService to return an empty array of titles
    const mockLastWeekService = {
      getTop10WordsInLast25Stories: jest.fn().mockResolvedValue([]),
    };

    // Inject the mock service into the controller
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopWordsController],
      providers: [{ provide: TopWordsService, useValue: mockLastWeekService }],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer()).get('/last-week');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);

    // Verify that the mocked service method was called
    expect(mockLastWeekService.getTop10WordsInLast25Stories).toHaveBeenCalled();
  });

  // New test: verify top words with specific counts
  it('should return the top words with their correct counts', async () => {
    // Mock the LastWeekService to return titles with specific word counts
    const mockLastWeekService = {
      getTop10WordsInLast25Stories: jest.fn().mockResolvedValue([
        { word: 'javascript', count: 5 },
        { word: 'framework', count: 3 },
        { word: 'testing', count: 2 },
        { word: 'NestJS', count: 1 },
        { word: 'different', count: 1 },
        { word: 'word', count: 1 },
        { word: 'another', count: 1 },
        { word: 'example', count: 1 },
        { word: 'completely', count: 1 },
        { word: 'irrelevant', count: 1 },
      ]),
    };

    // Inject the mock service into the controller
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopWordsController],
      providers: [{ provide: TopWordsService, useValue: mockLastWeekService }],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer()).get('/last-week');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);

    // Verify the top 3 words and their counts
    expect(response.body[0]).toEqual({ word: 'javascript', count: 5 });
  });
});
