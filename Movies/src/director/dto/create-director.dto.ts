import { ApiProperty } from '@nestjs/swagger'
export class CreateDirectorDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    dateOfBirth: Date;
}
