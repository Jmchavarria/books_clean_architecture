import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { ICurrentUser } from '../domain/interfaces/current-user.interface';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext): ICurrentUser => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
