import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectorDto } from './create-director.dto';
import { ApiProperty } from '@nestjs/swagger'

export class UpdateDirectorDto extends PartialType(CreateDirectorDto) {
    @ApiProperty()
    name: string;
    @ApiProperty()
    dateOfBirth: Date;
}
