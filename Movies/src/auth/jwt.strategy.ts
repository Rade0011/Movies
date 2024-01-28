import {ExtractJwt, Strategy} from 'passport-jwt'; 
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {UserService} from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
	constructor(
    private readonly configService: ConfigService, 
    private userService: UserService,  
  ) {
    super({ 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: configService.get('JWT_SECRET'), 
      ignoreExpiration: true, 
    });
  } 
  async validate(payload: { _id: string; email: string; roles: [] }) {
    return payload;
  }
}