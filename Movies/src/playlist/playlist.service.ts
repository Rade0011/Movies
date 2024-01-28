import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PlaylistDocument } from './playlist.schema';
import { Playlist } from './playlist.schema';
import { Model, ClientSession } from 'mongoose';
import { ERROR_MESSAGE } from '../helpers/constans';
import { User } from 'src/user/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>, 
    ) {}
    async create(createPlaylistDto: CreatePlaylistDto) { 
      createPlaylistDto.movie = Array.from(new Set(createPlaylistDto.movie)) 
      const createList = new this.playlistModel(createPlaylistDto);
      return createList.save(); 
    }

  async createPublic(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {  // Создаем 'публичный' плейлист
    const publicPlaylist = { ...createPlaylistDto, condition: false };
    const createdPlaylist = new this.playlistModel(publicPlaylist);
    return createdPlaylist.save();
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistModel.find().exec();
  }

  async findPublicPlaylist(): Promise<Playlist[]> {
    return this.playlistModel
      .find({ condition: false })
      .populate('movie', 'title');
  }

  async findOne(id: string) {
    const playlist = await this.playlistModel
      .findById(id)
      .populate('user')
      .exec();
    if (!playlist) throw new Error(ERROR_MESSAGE.E_PLAYLIST_OWNER);
    return playlist;
  }
  

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    const findIdPlaylist = await this.playlistModel.findById(id);
    if (!findIdPlaylist) {
      throw new NotFoundException(ERROR_MESSAGE.E_PLAYLIST_ID);
    }
    findIdPlaylist.set(updatePlaylistDto)
    return findIdPlaylist.save();
  }

  async remove(id: string) {
    const deletedPlaylist = await this.playlistModel.findByIdAndDelete(id);
    if (!deletedPlaylist) {
      throw new NotFoundException(ERROR_MESSAGE.E_PLAYLIST_ID);
    }
    return deletedPlaylist;
  }

  async deletePlayListByName(name: string) {
    return await this.playlistModel.deleteMany({ name });
  }

async updateEntriesCount(playlistId: string, increment: number) {
  await this.playlistModel
      .findByIdAndUpdate(playlistId, { $inc: { entriesCount: increment } }, { new: true })
      .exec();
}

  async countPlaylists() {
    return this.playlistModel.countDocuments().exec();
}
  async findTopPlaylist() {
    return this.playlistModel
    .find()
    .sort({ entriesCount: -1 })
    .limit(50)
    .exec();
}

async removeFromPlaylists( 
  movieId: string, 
  session: mongoose.mongo.ClientSession, 
) { 
  return await this.playlistModel.updateMany( 
      { movie: movieId }, 
      { $pull: { movie: movieId } }, 
      { session, new: true }, 
  )
}
}
