import { ApiProperty } from '@nestjs/swagger'
export class CreateGenreDto {
    @ApiProperty()
    genre: string
}
