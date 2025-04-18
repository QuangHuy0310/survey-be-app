import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "./roles.decorator";
import { JwtAuthGuard } from "@guard/jwt-auth.guard";
import { RolesGuard } from "@guard/roles.guard";
import { USER_ROLE } from "@utils/data-types/emuns";

export function GuardRole(...roles: USER_ROLE[]) {
    return applyDecorators(
      ApiBearerAuth('access-token'),
      UseGuards(JwtAuthGuard, RolesGuard),
      Roles(...roles),
    );
  }