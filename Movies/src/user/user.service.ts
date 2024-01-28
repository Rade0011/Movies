import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { ERROR_MESSAGE } from 'src/helpers/constans';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existingEmail = await this.userModel.findOne({ email });
    if (existingEmail) {
      throw new ConflictException(ERROR_MESSAGE.E_USER_ID);
    }
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  findUserEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  findByUserId(id: string) {
    return this.userModel.findById({id}).exec()
  }

  async findAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const findIdUser = await this.userModel.findById(id);
    if (!findIdUser) {
      throw new NotFoundException(ERROR_MESSAGE.E_USER_ID);
    }
    findIdUser.set(updateUserDto)
    return findIdUser.save();
  }

  async authUserData(email: string, password: string) {
    const authUser = (await this.findUserEmail(email)) as User;

    if (!authUser) {
      throw new NotFoundException(ERROR_MESSAGE.E_USEREMAIL);
    }

    const isPassword = authUser.password === password;

    if (!isPassword) {
      throw new UnauthorizedException(ERROR_MESSAGE.E_PASSWORD);
    }

    return authUser;
  }

  async addPlaylistToUser(userId: string, playlistId: string) {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { playlist: playlistId },
      },
      {
        new: true,
      },
    );
  }

  async removePlaylistToUser(userId: string, playlistId:string) {
    await this.userModel.findByIdAndUpdate(
      { _id: userId},
      {
        $pull: { playlist: playlistId},
      },
      {
        new: true,
      },
    );
  }
  
  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(ERROR_MESSAGE.E_USER_ID);
    }
    return deletedUser;
  }
  
  async deleteUserByName(username: string) {
    return await this.userModel.deleteMany({ username });
  }
  async countUsers() {
    return this.userModel.countDocuments().exec();
  }
}


