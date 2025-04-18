import { ApiProperty } from "@nestjs/swagger";
import { Expose, Exclude } from 'class-transformer';

export class userResDto {
    @Expose()
    _id: string;

    @Expose()
    email: string;

    @Expose()
    role: string;

    @Exclude()
    password: string; // ẩn password nếu có

    constructor(partial: Partial<userResDto>) {
        Object.assign(this, partial);
    }

}