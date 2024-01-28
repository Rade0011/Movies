import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Playlist, PlaylistSchema } from './playlist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from '../movie/movie.schema';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [MongooseModule.forFeature([
    { name: Playlist.name, schema: PlaylistSchema },
    { name: Movie.name, schema: MovieSchema },
    { name: User.name, schema: UserSchema },
  ])],
  controllers: [PlaylistController],
  providers: [PlaylistService, UserService],
})
export class PlaylistModule {}
