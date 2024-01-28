import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { AuthController } from 'src/auth/auth.controller';
import { User, UserSchema } from '../user/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PlaylistService } from 'src/playlist/playlist.service';
import { Playlist, PlaylistSchema } from 'src/playlist/playlist.schema';
import { MailService } from 'src/mail/mail.service';
import { Review, ReviewSchema } from 'src/reviews/reviews.schema';
import { ReviewsService } from 'src/reviews/reviews.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema },
      { name: User.name, schema: UserSchema },
    {name: Playlist.name, schema: PlaylistSchema},
  {name: Review.name, schema: ReviewSchema}]),
  ],
  controllers: [MovieController, UserController, AuthController],
  providers: [MovieService, UserService, AuthService, JwtService, ConfigService, PlaylistService, MailService, ReviewsService],
})
export class MovieModule {}
