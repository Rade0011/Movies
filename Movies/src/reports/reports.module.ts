import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './reports.schema';
import { Playlist, PlaylistSchema } from 'src/playlist/playlist.schema';
import { Movie, MovieSchema } from 'src/movie/movie.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MovieService } from 'src/movie/movie.service';
import { PlaylistService } from 'src/playlist/playlist.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: Playlist.name, schema: PlaylistSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, JwtService, ConfigService, MovieService, PlaylistService, UserService],
})
export class ReportsModule {}
