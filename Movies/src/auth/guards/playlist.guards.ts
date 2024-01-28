import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PlaylistService } from 'src/playlist/playlist.service';


@Injectable()
export class PrivatePlaylistGuard implements CanActivate {
  constructor(private readonly playlistService: PlaylistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

      const playlist = await this.playlistService.findOne(id);

      if (playlist.condition) {
        return false;
      }
      return true;
    }
}

  
