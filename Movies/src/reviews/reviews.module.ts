import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './reviews.schema';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Review.name, schema: ReviewSchema}])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
