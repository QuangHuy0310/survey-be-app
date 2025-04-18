import { Survey } from '@entities/survey.entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from '@modules/redis/redis.service';
import { FilterDto, ResponseDto, UpdateDto } from './dto/survey.dto';

@Injectable()
export class SurveyService {
    constructor(
        @InjectModel(Survey.name) private surveyModel: Model<Survey>,
        private readonly redisService: RedisService,
    ) { }

    async create(payload: ResponseDto): Promise<Survey> {
        const sur = await new this.surveyModel(payload)
        return sur.save()
    }

    async getSurvey(payload: FilterDto): Promise<{ item: Survey[], total: number }> {
        const { page, limit } = payload
        const skip = (page - 1) * limit;

        const [item, total] = await Promise.all([
            this.surveyModel.find({ deletedAt: null }).skip(skip).limit(limit).exec(),
            this.surveyModel.countDocuments()
        ]);

        return { item, total };
    }


    async updateSurvey(id: string, payload: UpdateDto): Promise<Survey> {
        const updatedSurvey = await this.surveyModel.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true }
        );
    
        if (!updatedSurvey) {
            throw new NotFoundException('Survey not found');
        }
    
        return updatedSurvey;
    }
    
    async remove(id: string):Promise<void>{
        const softDele = await this.surveyModel.findByIdAndUpdate(id,{
            deletedAt: new Date()
        })
    }

}
