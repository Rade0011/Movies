import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument, MovieName } from './movie.schema';
import { Model } from 'mongoose';
import { ERROR_MESSAGE } from 'src/helpers/constans';
import * as NodeCache from 'node-cache';
import mongoose from 'mongoose';
import { EnumFileTypes } from 'src/writers/file-types';
import { FileWriter } from 'src/writers/file-writer';
import * as path from 'path';


@Injectable()
export class MovieService {
  private cache;
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {
    this.cache = new NodeCache({
      stdTTL: 600,
      checkperiod: 120,
    });
  }

  async create(createMovieDto: CreateMovieDto, auth: string): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto, auth);
    return createdMovie.save();
  }

  async findAllnoToken(): Promise<MovieName[]> {
    const movies = await this.movieModel.find().select('name').exec();
    return movies.map(movie => ({ name: movie.name}))
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.movieModel.find();
    if (!movies) {
      throw new Error(ERROR_MESSAGE.E_MOVIE_ID);
    }
    return movies;
  }

  async findMovieWithReviews() {
    return this.movieModel.populate('movie', 'reviews')
  }

  async generateFile(type: EnumFileTypes, movies: any[]): Promise<string> {
    const fileWriter = new FileWriter(type, movies);
    await fileWriter.writeFile();
    const filePath = path.join(__dirname, '../../', `data.${type}`);
    return filePath;
  }

  findOne(_id: string) {
    return this.movieModel.findById(_id).exec();
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const findIdMovie = await this.movieModel.findById(id);
    if (!findIdMovie) {
      throw new NotFoundException(ERROR_MESSAGE.E_MOVIE_ID);
    }
    findIdMovie.set(updateMovieDto)
    return findIdMovie.save();
  }

  async remove(id: string): Promise<Movie> {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id);
    if (!deletedMovie) {
      throw new NotFoundException(ERROR_MESSAGE.E_MOVIE_ID);
    }
    return deletedMovie;
  }

  async removeGenreFromPlaylist(genre: string, session: mongoose.mongo.ClientSession) {
    return await this.movieModel.updateMany(
      {genre: genre},
      { $pull: { genre: genre}},
      { session, new: true},
    );
  }

  async addReviewToMovie(movieId: string, reviewId: string) {
    await this.movieModel.findByIdAndUpdate(
      movieId,
      {
        $addToSet: { reviews: reviewId},
      },
      {
        new: true,
      },
    );
  }

  async delCache() {
    this.cache.del('allMovie');
  }

  async countMovies() {
    return this.movieModel.countDocuments().exec();
  }
}


