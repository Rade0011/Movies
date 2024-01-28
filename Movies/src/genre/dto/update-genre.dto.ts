import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { ApiProperty } from '@nestjs/swagger'

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
    @ApiProperty()
    genre: string
}
