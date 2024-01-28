import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/helpers/constans'; 
import { Playlist } from 'src/playlist/playlist.schema';
import { PlaylistService } from 'src/playlist/playlist.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class OwnerPlaylistGuard implements CanActivate {
  constructor(private readonly playlistService: PlaylistService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const { id } = request.params;

    const playlist = await this.playlistService.findOne(id);

    if (playlist?.condition) {
      const isOwner = this.isOwner(user, playlist);
      if (!isOwner) {
        throw new ForbiddenException(ERROR_MESSAGE.E_PLAYLIST_OWNER);
      }
    }
    return true;
  }

  private isOwner(user: User, playlist: Playlist): boolean {
    return playlist.user.email === user.email;
  }
}