import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Question, QuestionSchema } from '@entities/question.entities';
import { LocalStrategy } from '@strategies/local-auth.strategy';
import { JwtStrategy } from '@strategies/jwt.auth.strategy';
import { GoogleStrategy } from '@strategies/google.strategy';
import { JwtAuthGuard } from '@guard/jwt-auth.guard';
import { RolesGuard } from '@guard/roles.guard';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Question.name, schema: QuestionSchema },
        ]),
    ],
    controllers: [
        QuestionController,],
    providers: [
        QuestionService,
    ],
})
export class QuestionModule { }
