import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'


export class CreateMovieDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    year: number;
    @ApiProperty()
    genre?: mongoose.Schema.Types.ObjectId[];
    @ApiProperty() 
    duration: number;
    @ApiProperty()
    director?: mongoose.Schema.Types.ObjectId[];
    @ApiProperty()
    reviews?: mongoose.Schema.Types.ObjectId[];
}
