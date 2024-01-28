import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { Public } from '../decorators/public.decorators';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/helpers/constans';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist';
import { PlaylistService } from 'src/playlist/playlist.service';
import { UserDocument } from './user.schema';
import { PrivatePlaylistGuard } from 'src/auth/guards/playlist.guards';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly playlistService: PlaylistService) {}

  @ApiBearerAuth() 
  @Public()
  @Post()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth() 
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
  
  @Roles(Role.Admin)
  @Get()
  findAllUser() {
    return this.userService.findAllUser()
  }
 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }
  
  @Get('/me') 
  me(@Req() req: Request) {  
  const {user} = req;  
  return user 
}
}