import { QuestionModule } from './modules/question/question.module';
import { ResponseModule } from './modules/response/response.module';
import { Module } from '@nestjs/common';
import * as MODULES from '@modules/index-module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from '@guard/jwt-auth.guard';
import { JwtStrategy } from '@strategies/jwt.auth.strategy';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '@utils/config/jwt-config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@guard/roles.guard';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [jwtConfig],
    }),
    ...Object.values(MODULES),
    MongooseModule.forRoot('mongodb+srv://huynqgcs210462:12345@phonggia.lojvqqd.mongodb.net/?retryWrites=true&w=majority&appName=phonggia')
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard
  ],
})
export class AppModule { }
