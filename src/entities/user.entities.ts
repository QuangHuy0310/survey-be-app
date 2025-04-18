// user/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { USER_ROLE } from '@utils/data-types/emuns';
import { Document } from 'mongoose';
import { BaseEntity } from '@entities/base.entities'; 


export type UserDocument = User & Document;

@Schema()
export class User extends BaseEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ enum: USER_ROLE, default: 'user' })
  role: USER_ROLE;

  @Prop()
  googleId?: string;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
