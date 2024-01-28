import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, GenreDocument, GenreName } from './genre.schema';
import { ERROR_MESSAGE } from 'src/helpers/constans';
import mongoose from 'mongoose';
import { error } from 'console';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}
  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const { genre } = createGenreDto;
    const existGenre = await this.genreModel.findOne({ genre }); 
    if (existGenre) {
      throw new ConflictException(ERROR_MESSAGE.E_GENRE_CONFLICT)
    }
    const createdGenre = new this.genreModel(createGenreDto);
    return createdGenre.save();
  }

  async findAll(): Promise<Genre[]> {
    return this.genreModel.find().exec();
  }

  async findAllNoToken(): Promise<GenreName[]> {
    const genres = await this.genreModel.find().select('genre').exec()
    return genres.map(genre => ({ name: genre.genre}))
  }

  async findOne(_id: string): Promise<Genre> {
    const genre = await this.genreModel.findById(_id).exec();
    if (!genre) {
      throw new NotFoundException('');
    }
    return genre;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const findIdGenre = await this.genreModel.findById(id);
    if (!findIdGenre) {
      throw new NotFoundException(ERROR_MESSAGE.E_GENRE_ID);
    }
    findIdGenre.set(updateGenreDto)
    return findIdGenre.save();
  }

  async remove(id: string, session: mongoose.mongo.ClientSession) {
    const deleteGenre = await this.genreModel.findByIdAndDelete(id, {session});
    const del = new this.genreModel(deleteGenre, {new: true});
    if (!del) {
      throw new NotFoundException(ERROR_MESSAGE.E_GENRE_ID);
    }
}
}
