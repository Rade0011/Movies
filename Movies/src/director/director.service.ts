import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Director, DirectorDocument } from './director.schema';
import { ERROR_MESSAGE } from 'src/helpers/constans';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director.name) private directorModel: Model<DirectorDocument>,
  ) {}
  async create(createDirectorDto: CreateDirectorDto): Promise<Director> {
    const createdDirector = new this.directorModel(createDirectorDto);
    return createdDirector.save();
  }

  async findAll(): Promise<Director[]> {
    return this.directorModel.find().exec();
  }

  findOne(_id: string) {
    return this.directorModel.findById(_id).exec();
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto): Promise<Director> {
    const findIdDirector = await this.directorModel.findById(id);
    if (!findIdDirector) {
      throw new NotFoundException(ERROR_MESSAGE.E_GENRE_ID);
    }
    findIdDirector.set(updateDirectorDto)
    return findIdDirector.save();
  }

  async remove(id: string): Promise<Director> {
    const deletedDirector = await this.directorModel.findByIdAndDelete(id);
    if (!deletedDirector) {
      throw new NotFoundException(ERROR_MESSAGE.E_DIRECTOR_ID);
    }
    return deletedDirector;
  }
}
