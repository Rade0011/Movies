import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './reviews.schema';
import { Model } from 'mongoose';
import { ERROR_MESSAGE } from 'src/helpers/constans';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}
  async createReview(createReviewDto: CreateReviewDto, userId: string) {
    const { rating, feedback } = createReviewDto;
    const reviewCreate = new this.reviewModel({ rating, feedback, user: userId });
    return reviewCreate.save();
  }

  async findAll() {
    return this.reviewModel.find().exec()
  }

  async update(id: string, updateReviewDto: UpdateReviewDto)  {
    const findReview = await this.reviewModel.findById(id);
    if (!findReview) {
      throw new NotFoundException(ERROR_MESSAGE.E_REVIEWS)
    }
    findReview.set(updateReviewDto)
    return findReview.save();
  }

  async remove(id: string) {
    const deleteReview = await this.reviewModel.findByIdAndDelete(id);
    if (!deleteReview) {
      throw new NotFoundException(ERROR_MESSAGE.E_REVIEWS)
    }
    return deleteReview
  }

  async findOne(id: string) {
    const review = await this.reviewModel.findById(id)
    .populate('user')
    .exec();
    if (!review) {
      throw new NotFoundException(ERROR_MESSAGE.E_PLAYLIST_ID)
    }
    return review;
  }
}