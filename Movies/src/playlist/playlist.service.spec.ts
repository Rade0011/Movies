import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './playlist.schema';
import { CONDITION } from 'src/helpers/constans';

describe('PlaylistService', () => {
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
        MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }]),
      ],
      providers: [PlaylistService],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', async () => {
    const createPlaylistDto: CreatePlaylistDto = {
      title: "MyPlaylist",
      movie: [],
      user: "ffff",
      condition: true,
      entriesCount: 0
    }
    const createdPlaylist = await service.create(createPlaylistDto)
    expect(createdPlaylist).toBeDefined();
  });
});
