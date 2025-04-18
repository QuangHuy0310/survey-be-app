import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class AnswerDto {
    @ApiProperty({ example: '6630d0059c9a0c1d40ad4321', description: 'ID câu hỏi' })
    @IsString()
    questionId: string;

    @ApiPropertyOptional({ example: 'Yes', description: 'Câu trả lời dạng text hoặc single choice' })
    @IsString()
    @IsOptional()
    answer?: string;

    @ApiPropertyOptional({ example: ['Option 1', 'Option 2'], description: 'Câu trả lời dạng multiple choice' })
    @IsArray()
    @IsOptional()
    answerMultiple?: string[];
}

export class InputResponseDto {
    @ApiProperty({ example: '6630cf9b132a45f3d4ee1234', description: 'ID của khảo sát (survey)' })
    @IsString()
    surveyId: string;

    @ApiProperty({ type: [AnswerDto], description: 'Danh sách câu trả lời của người dùng' })
    @IsArray()
    @Type(() => AnswerDto)
    answers: AnswerDto[];
}

export class CreateResponseDto extends InputResponseDto {
    
    @ApiProperty({ example: 'user_123', description: 'ID người dùng (hoặc anonymous)' })
    @IsString()
    userId: string;

}