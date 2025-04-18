
import { Question } from '@entities/question.entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionDto } from './dto/questionDto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel(Question.name) private questionModel: Model<Question>,
    ) { }

    async create(payload: QuestionDto): Promise<Question> {
        const question = await new this.questionModel(payload)
        return question.save()
    }

    async getQuestion(surveyId: string): Promise<Question[]> {
        const matchStage = surveyId
            ? { $match: { surveyId: surveyId } }
            : { $match: {} };

        return this.questionModel.aggregate([
            matchStage,
            {
                $lookup: {
                    from: 'surveys',
                    localField: 'surveyId',
                    foreignField: '_id',
                    as: 'survey',
                },
            },
            { $unwind: '$survey' },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    type: 1,
                    options: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    survey: {
                        data: '$survey.data',
                        description: '$survey.description',
                    },
                },
            },
        ]);
    }
}
