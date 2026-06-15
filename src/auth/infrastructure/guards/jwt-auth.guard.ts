import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    console.log('Ruta:', request.url);
    console.log('Método:', request.method);
    console.log('Authorization:', request.headers.authorization);

    return super.canActivate(context);
  }
}
