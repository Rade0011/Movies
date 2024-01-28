import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { OwnerPlaylistGuard } from 'src/auth/guards/isowner.guards';

export const IS_OWNER_PLAYLIST = 'isOwnerPlaylist';

export const IsOwnerPlaylist = () => {
  return applyDecorators(
    SetMetadata(IS_OWNER_PLAYLIST, true),
    UseGuards(OwnerPlaylistGuard),
  );
};
