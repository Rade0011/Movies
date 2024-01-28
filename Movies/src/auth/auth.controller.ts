import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/helpers/constans';
import { Public } from 'src/decorators/public.decorators';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
      private readonly userService: UserService) {}
    
    @Post('login')
    @Public()
    @HttpCode(200)
    async login(@Body() authDto: AuthDto) {
      const user = await this.authService.login(authDto);
      const token = this.authService.generateToken(
        user._id.toString(),
        user.email,
        user.roles,
      );
      return token;
    }

    @Roles(Role.Admin, Role.User)
    @Post('link')
    @HttpCode(200)
    async sendLink(@Body('email') email: string) { 
      const sendLink = await this.authService.sendLink(email); 
      return sendLink; 
    }
  }

