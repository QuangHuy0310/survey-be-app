import { SetMetadata } from '@nestjs/common';
import { USER_ROLE } from '@utils/data-types/emuns/role';

export const Roles = (...roles: USER_ROLE[]) => SetMetadata('roles', roles);
