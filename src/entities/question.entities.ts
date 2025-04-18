
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '@entities/base.entities'; 

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })
export class Question extends BaseEntity {
    @Prop({ required: true, ref: 'Survey' })
    surveyId: string; 

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    type: string;

    @Prop({ type: [String], default: [], required: false })
    options?: string[];

}

export const QuestionSchema = SchemaFactory.createForClass(Question);
