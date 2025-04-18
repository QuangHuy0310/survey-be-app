import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { UserModule } from '@modules/users/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { configs } from '@utils/config/config';
import { LocalStrategy } from '@strategies/local-auth.strategy';
import { JwtStrategy } from '@strategies/jwt.auth.strategy';
import { GoogleStrategy } from '@strategies/google.strategy';
import { LocalAuthGuard } from '@guard/local-auth.guard';
import { JwtAuthGuard } from '@guard/jwt-auth.guard';
import { RolesGuard } from '@guard/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@entities/user.entities';
import jwtConfig from '@utils/config/jwt-config';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from '@utils/config/google-oauth.config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    forwardRef(() => UserModule),
    // TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(googleOauthConfig)
  ],
  controllers: [
    AuthController,],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [JwtModule],
})
export class AuthModule { }
