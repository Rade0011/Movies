import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './genre.schema';
import { MovieService } from 'src/movie/movie.service';
import { Movie, MovieSchema } from 'src/movie/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema },
      { name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [GenreController],
  providers: [GenreService, MovieService],
})
export class GenreModule {}
