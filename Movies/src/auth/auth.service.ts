import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { ERROR_MESSAGE } from 'src/helpers/constans';
import { MailService } from 'src/mail/mail.service';
import { RolePermissions } from 'src/enums/rolePermission.enum';
import { Permissions } from 'src/enums/permission.enum';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
  }
  generateToken( _id: string, email: string, roles: string[]) {
    const secret = this.configService.get('JWT_SECRET'); 
    return this.jwtService.sign({ _id, email, roles }, { secret });
  }
  
  async sendLink(email: string) {
    const user = await this.userService.findUserEmail(email);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.E_USER_ID);
    }

    const clientUrl = this.configService.get('CLIENT_URL');
    const token = this.generateToken(
      user._id.toString(),
      user.email,
      user.roles,
    );
    const link = `${clientUrl}/auth/${token}`;
    const html = `<p><a href="${link}">Войти в аккаунт</a></p>`;

    this.mailService.sendMessage({
      email: user.email,
      subject: 'Login link',
      html,
    });
  }

  async login(authDto: AuthDto): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email: authDto.email }).exec();
    if (!user) throw new Error(ERROR_MESSAGE.E_USER_ID);
    if (user.password !== authDto.password)
      throw new Error(ERROR_MESSAGE.E_PASSWORD);
    return user;
  }

  async checkPermission(user: UserDocument, permission: Permissions) {
    const hasPermission = user.roles.some((role: string) =>
      (RolePermissions as Record<string, string[]>)[role].includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(ERROR_MESSAGE.E_PERMISSIN);
    }

    return hasPermission;
  }
}



