import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLE } from '@utils/data-types/emuns/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<USER_ROLE[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles?.includes(user?.role);
  }
}
