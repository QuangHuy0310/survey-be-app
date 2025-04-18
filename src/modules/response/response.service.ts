import { ResponseUser, ResponseUserDocument } from '@entities/response-user.entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResponseDto, InputResponseDto } from './dto/resDto';

@Injectable()
export class ResponseService {
    constructor(
        @InjectModel(Response.name)
        private readonly responseModel: Model<ResponseUserDocument>,
    ) { }

    async handleCreate(id: string, dto: InputResponseDto): Promise<any> {
        const responseData = {
            ...dto,
            userId: id,
        };
        return this.create(responseData);
    }

    async create(createResponseDto: CreateResponseDto): Promise<ResponseUser> {
        const created = new this.responseModel(createResponseDto);
        return created.save();
    }

    async getByUserId(id?: string): Promise<ResponseUser[]> {
        const matchStage: any = {}

        if (id) {
            matchStage.userId = id;
        }

        return this.responseModel.aggregate([
            { $match: matchStage },
            { $unwind: '$answers' },
            {
                $lookup: {
                    from: 'questions',
                    localField: 'answers.questionId',
                    foreignField: '_id',
                    as: 'questionData',
                },
            },
            { $unwind: '$questionData' },
            {
                $group: {
                    _id: '$_id',
                    surveyId: { $first: '$surveyId' },
                    userId: { $first: '$userId' },
                    answers: {
                        $push: {
                            questionId: '$answers.questionId',
                            title: '$questionData.title',
                            answer: '$answers.answer',
                            answerMultiple: '$answers.answerMultiple',
                        },
                    },
                    createdAt: { $first: '$createdAt' },
                },
            },
        ]).exec();
    }

    async getRespondedUsers(): Promise<any[]> {
            return this.responseModel.aggregate([
            // Lấy danh sách userId đã response (duy nhất)
            {
                $group: {
                    _id: '$userId',
                },
            },
            // Join sang bảng users để lấy thông tin user
            {
                $lookup: {
                    from: 'users', // đúng tên collection MongoDB
                    localField: '_id',
                    foreignField: '_id', // `_id` trong bảng users
                    as: 'userInfo',
                },
            },
            // Loại bỏ user không tồn tại (nếu có)
            {
                $match: {
                    userInfo: { $ne: [] },
                },
            },
            // Trả về dữ liệu gọn gàng
            {
                $project: {
                    userId: '$_id',
                    email: { $arrayElemAt: ['$userInfo.email', 0] },
                    _id: 0,
                },
            },
        ]);
    }
}
