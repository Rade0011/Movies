import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
    @ApiProperty()
    title: string;
    @ApiProperty()
    movie?: string[];
    @ApiProperty()
    user: string;
    @ApiProperty()
    condition: boolean;
    @ApiProperty()
    entriesCount?: number
}
