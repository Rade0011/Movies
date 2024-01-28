import { ApiProperty } from '@nestjs/swagger'

export class CreatePlaylistDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    movie?: string[];
    @ApiProperty()
    user: string;
    @ApiProperty()
    condition: boolean;
    @ApiProperty()
    entriesCount: number;
}
