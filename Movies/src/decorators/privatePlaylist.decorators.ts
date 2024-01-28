import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PrivatePlaylistGuard } from 'src/auth/guards/playlist.guards';
export const IS_PRIVATE_PLAYLIST = 'isPrivate'
export const PrivatePlaylist = () => {
    return applyDecorators(
        SetMetadata(IS_PRIVATE_PLAYLIST, true),
        UseGuards(PrivatePlaylistGuard)
    )
}