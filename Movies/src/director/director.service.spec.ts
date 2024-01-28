import { Test, TestingModule } from '@nestjs/testing';
import { DirectorService } from './director.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './director.schema';


describe('DirectorService', () => {
  let service: DirectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
        MongooseModule.forFeature([{ name: Director.name, schema: DirectorSchema }]),
      ],
      providers: [DirectorService],
    }).compile();

    service = module.get<DirectorService>(DirectorService);
  });

  it('should created a director', async () => {
    const createDirectorDto = {
      name: 'vyachecloav durmushametov',
      dateOfBirth: new Date('2023-11-18')
    };
    const createdDirector = await service.create(createDirectorDto)
    expect(createdDirector).toBeDefined();
  });
});
