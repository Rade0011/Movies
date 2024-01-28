import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './genre.schema';


describe('GenreService', () => {
  let service: GenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
        MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
      ],
      providers: [GenreService],
    }).compile();

    service = module.get<GenreService>(GenreService);
  });

  it('should created a genre', async () => {
    const createGenreDto = {
      genre: "kriminal"
    };
    const createGenre = await service.create(createGenreDto);
    expect(createGenre).toBeDefined();
  });
});
