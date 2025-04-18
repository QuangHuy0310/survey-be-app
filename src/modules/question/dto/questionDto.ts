import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class QuestionDto {
    @ApiProperty()
    @IsString()
    surveyId: string

    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    @IsString()
    type: string

    @ApiProperty({
        example: ['JavaScript', 'Python', 'Go'],
        description: 'Danh sách lựa chọn (tuỳ chọn, tùy vào type)',
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    options?: string[];
}