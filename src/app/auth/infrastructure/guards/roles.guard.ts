import { ForbiddenException, type CanActivate, type ExecutionContext } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/app/auth/decorators/roles.decorator';

export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = requireRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException('You do not have permission');
    }

    return true;
  }
}
