import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),  
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PassportModule,
    JwtModule,
  ],
  providers: [AuthService, JwtService, JwtStrategy, ConfigService, UserService, MailService]
})

export class AuthModule {}
