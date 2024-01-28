import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @ApiProperty()
    name: string;
    @ApiProperty()
    year: number;
    @ApiProperty()
    genre: mongoose.Schema.Types.ObjectId[];
    @ApiProperty()  
    duration: number;
    @ApiProperty()
    director: mongoose.Schema.Types.ObjectId[]; 
}
