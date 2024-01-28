import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, HttpStatus, Req, Res, Query, StreamableFile } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthService } from '../auth/auth.service';
import { Public } from '../decorators/public.decorators';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/helpers/constans';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist';
import { Request } from 'express'
import { Permissions } from 'src/enums/permission.enum';
import { EnumFileTypes } from 'src/writers/file-types';
import { UserDocument } from 'src/user/user.schema';
import { FileWriter } from 'src/writers/file-writer';
import * as path from 'path';
import { Response } from 'express';
import { ReviewsService } from 'src/reviews/reviews.service';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor( private readonly movieService: MovieService,
    private readonly authService: AuthService,
    private readonly reviewService: ReviewsService) {}

  @ApiBearerAuth()  
  // @Roles(Role.Admin)  
  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Headers('Authorization') auth: string,
    @Req() req: Request,
  ) {
    const { user }: any = req;
    this.authService.checkPermission(user, Permissions.CREATE_MOVIES);
    this.movieService.delCache();
    return this.movieService.create(createMovieDto, auth);
  }
 
  @Public() 
  @Get()
  findAllMovie(@Headers('Authorization') authUser: string) {   // выводит список названий фильмов, с токеном всю другую информацию
    if (authUser) {
    return this.movieService.findAll();
  } else {
    return this.movieService.findAllnoToken();
  }
}

  @Public()
  @Get('comments')
  findComments() {
    return this.movieService.findMovieWithReviews()
  }

  @Roles(Role.Admin)
  @Get('export')
  async getFile(
    @Res() res: Response, 
    @Query('type') type: EnumFileTypes,
    @Req() req: Request 
    ) {
      const movies = await this.movieService.findAll();
      const filePath = await this.movieService.generateFile(type, movies);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=data.${type}`,
    });
    res.sendFile(filePath);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    this.movieService.delCache();
    return this.movieService.update(id, updateMovieDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.movieService.delCache();
    return this.movieService.remove(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @Post(':id/review')
async updateMovie(
  @Param('id') movieId: string,
  @Req() req: Request & { user: UserDocument },
  @Body() createReviewDto: CreateReviewDto
) {
  const { user }: any = req;
  const userId = user._id;
  const review = await this.reviewService.createReview(createReviewDto, userId);
  const reviewId = review._id.toString();
  await this.movieService.addReviewToMovie(movieId, reviewId);
}
}