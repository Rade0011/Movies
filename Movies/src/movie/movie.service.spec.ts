import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import mongoose from 'mongoose';
import { Auth } from 'src/auth/entities/auth.entity';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
      ],
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should created a movie', async () => {
    const createMovieDto: CreateMovieDto = {
      name: 'transformery',
      year: 2009,
      genre: [],
      duration: 138,
      director: [],
    };
 
  // const createdMovie = await service.create(createMovieDto, auth);
  //   expect(createdMovie.name).toBeDefined();
  //   expect(createdMovie.year).toBeDefined();
  //   expect(createdMovie.genre).toBeDefined();
  //   expect(createdMovie.duration).toBeDefined();
  //   expect(createdMovie.director).toBeDefined();
  });
});
