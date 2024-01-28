import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../user/user.schema';


describe('MovieController', () => {
  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
        UserModule
      ],
      controllers: [MovieController, AuthController],
      providers: [MovieService, AuthService, ConfigService, UserService, JwtService],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
