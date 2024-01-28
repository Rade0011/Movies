import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ConflictException } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Public } from '../decorators/public.decorators';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { OwnerPlaylistGuard } from 'src/auth/guards/isowner.guards';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/helpers/constans';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist';
import { PrivatePlaylistGuard } from 'src/auth/guards/playlist.guards';
import { UserService } from 'src/user/user.service';
import { UserDocument } from '../user/user.schema';
import { IsOwnerPlaylist } from 'src/decorators/ownerPlaylist.decorators';
import { PrivatePlaylist } from 'src/decorators/privatePlaylist.decorators';

@ApiTags('playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService,
    private readonly userService: UserService) {}
  
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto) { // приватный список создается по умолчанию
    return await this.playlistService.create(createPlaylistDto); 
  }
 
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('public')
  async createPublic(@Body() CreatePlaylistDto: CreatePlaylistDto) { // создаем публичный плейлист
    return await this.playlistService.createPublic(CreatePlaylistDto)
  }
  

  @Public()
  @Get()
  findPublicPlaylist() { // находим только публичный списки
    return this.playlistService.findPublicPlaylist(); 
  }

  @Roles(Role.Admin, Role.User)
  @Get('top')
  findTopPlaylists() {
    return this.playlistService.findTopPlaylist();
  }

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  @IsOwnerPlaylist()
  @Get(':id') 
  async findOne(@Param('id') id: string) {  
    const playlist = await this.playlistService.findOne(id);
    return playlist 
  }

  @ApiBearerAuth()
  @Roles(Role.User)
  @IsOwnerPlaylist()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) { 
  return this.playlistService.update(id, updatePlaylistDto)
  }

  @ApiBearerAuth()
  @PrivatePlaylist()
  @Roles(Role.Admin, Role.User)
  @Patch(':id/copy') 
  async addPlayList(
    @Param('id') id: string,
    @Req() req: Request & { user: UserDocument },
  ) {
    const { user } = req;
    const userId = user._id.toString();
    await this.userService.addPlaylistToUser(userId, id);
    await this.playlistService.updateEntriesCount(id, 1);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @Patch(':id/remove')
  async removePlaylistIdFromUserList(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
      const { user }: any = req;
      const userId = user._id.toString();
      await this.userService.removePlaylistToUser(userId, id)
      await this.playlistService.updateEntriesCount(id, 1);
  }
      
  @ApiBearerAuth()
  @Roles(Role.User)
  @IsOwnerPlaylist()
  @Delete(':id')
  async remove(@Param('id') id: string) { 
  return this.playlistService.remove(id)
  }
}
