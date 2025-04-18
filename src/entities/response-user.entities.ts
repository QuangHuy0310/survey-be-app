import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '@entities/base.entities'; // đảm bảo đã có createdAt, updatedAt...


@Schema({ timestamps: true })
export class ResponseUser extends BaseEntity {
    @Prop({ type: String, required: true, ref: 'Survey' })
    surveyId: string;

    @Prop({ type: String, required: true, ref: 'User' })
    userId: string;

    @Prop({
        type: [
            {
                questionId: { type: String, required: true, ref: 'Question' },
                answer: { type: String, required: true }, 
            },
        ],
        required: true,
    })
    answers: {
        questionId: string;
        answer: string;
    }[];
}

export const ResponseUserSchema = SchemaFactory.createForClass(ResponseUser);
export type ResponseUserDocument = ResponseUser & Document;
