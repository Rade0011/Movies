import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    roles: string[];
    @ApiProperty()
    password: string;
    @ApiProperty()
    playlist: string[];
    @ApiProperty()
    token?: string;
}
