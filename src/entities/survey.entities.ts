import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '@entities/base.entities'; 


export type SurveyDocument = Survey & Document;

@Schema({ timestamps: true })
export class Survey extends BaseEntity {
  @Prop({ required: true })
  data: string;

  @Prop({ required: true })
  description: string;
    
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
