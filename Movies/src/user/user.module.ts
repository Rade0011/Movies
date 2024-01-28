import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from '../auth/auth.controller';
import { PlaylistService } from 'src/playlist/playlist.service';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { Playlist, PlaylistSchema } from 'src/playlist/playlist.schema';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Playlist.name, schema: PlaylistSchema}])],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, JwtService, ConfigService, PlaylistService, MailService],
})
export class UserModule {}
