import {Injectable, ExecutionContext} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport';
import {Reflector} from '@nestjs/core'

export const IS_PUBLIC_KEY = 'IsPublic';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
    const IsPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (IsPublic) {
        return true
    }
    return super.canActivate(context); 
  }
}