import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/helpers/constans';
import { Roles } from 'src/decorators/roles.decorators';
import { Public } from 'src/decorators/public.decorators';
import { UseGuards } from '@nestjs/common';
import { OwnerReviewGuard } from 'src/auth/guards/reviewOwner.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { IsOwnerReview } from 'src/decorators/ownerReview.decorators';

@ApiBearerAuth()
@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Get()
 async findAll() {
  return this.reviewsService.findAll()
 }

 @Roles(Role.Admin, Role.User)
 @IsOwnerReview()
 @Put(':id')
 async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  this.reviewsService.update(id, updateReviewDto);
 }

 @Roles(Role.Admin, Role.User)
 @IsOwnerReview()
 @Delete(':id')
 async remove(@Param('id') id: string) {
  this.reviewsService.remove(id);
 }
}