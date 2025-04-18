import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLE } from '@utils/data-types/emuns/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<USER_ROLE[]>('roles', context.getHandler());
    if (!roles) return true;
    const user = context.switchToHttp().getRequest().user;
    return roles.includes(user.role);
  }
}
