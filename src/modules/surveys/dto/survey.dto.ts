import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ResponseDto {
    @ApiProperty()
    @IsString()
    data: string

    @ApiProperty()
    @IsString()
    description: string
}

export class FilterDto {
    @ApiPropertyOptional()
    @IsOptional()
    page: number = 1

    @ApiPropertyOptional()
    @IsOptional()
    limit: number = 12
}

export class UpdateDto {
    @ApiPropertyOptional()
    @IsOptional()
    data: string

    @ApiPropertyOptional()
    @IsOptional()
    description: string
}