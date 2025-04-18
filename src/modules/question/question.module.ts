import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Question, QuestionSchema } from '@entities/question.entities';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Question.name, schema: QuestionSchema },
        ]),
    ],
    controllers: [
        QuestionController,],
    providers: [
        QuestionService,],
})
export class QuestionModule { }
