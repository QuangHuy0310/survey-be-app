import { MongooseModule } from '@nestjs/mongoose';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { Module } from '@nestjs/common';
import { Survey, SurveySchema } from '@entities/survey.entities';
import { RedisModule } from '@modules/redis/redis.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Survey.name,
            schema: SurveySchema
        }]),
        RedisModule
    ],
    controllers: [
        SurveyController,],
    providers: [
        SurveyService,],
})
export class SurveyModule { }
