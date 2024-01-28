import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { defaultName, defaultUser } from '../fixtures/user.fixtures';

describe('UserService', () => {
  let service: UserService;

  async function createAndGetUserId(
    createUserByDefault = defaultUser(),
    token: string,
  ) {
    const createdUser = await service.create(createUserByDefault, token);
    return createdUser.id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/movies'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should created a user', async () => {
    const token = 'chiki briki i v damki';
    const createUserDto = defaultUser();
    const createUser = await service.create(createUserDto, token);
    expect(createUser).toBeDefined();
    expect(createUser.username).toBeDefined();
  });

  afterEach(async () => {
    await service.deleteUserByName(defaultName);
  });

  it('should return all users', async () => {
    const users = await service.findAllUser();
    expect(users).toBeInstanceOf(Array);
  });
});