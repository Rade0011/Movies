import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './reviews.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

describe('ReviewsController', () => {
  let controller: ReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb+srv://Rade00:Shade3run55955228@movies.1bmuaei.mongodb.net/movies?retryWrites=true&w=majority'),
        MongooseModule.forFeature([
          { name: Review.name, schema: ReviewSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      controllers: [ReviewsController],
      providers: [ReviewsService, UserService],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
