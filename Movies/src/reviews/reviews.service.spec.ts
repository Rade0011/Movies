import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });
})
