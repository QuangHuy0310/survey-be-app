import { Controller, Get, Post, Body, Param, Put, Delete, Patch, Query } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterDto, ResponseDto } from './dto/survey.dto';
import { GuardRole } from '@utils/decorators/guard-role.decorator';
import { USER_ROLE } from '@utils/data-types/emuns';
@ApiTags('SURVEY')

@Controller('surveys')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) { }

    @GuardRole(USER_ROLE.MANAGER)
    @Post('new-survey')
    async newSurvey(@Body() dto: ResponseDto) {
        return this.surveyService.create(dto)
    }

    @GuardRole(USER_ROLE.MANAGER, USER_ROLE.USER)
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @Get('get-survey')
    async getSurvey(@Query() dto: FilterDto) {
        return this.surveyService.getSurvey(dto)
    }

    @GuardRole(USER_ROLE.MANAGER)
    @Patch(':id')
    async updateSurvey(@Param('id') id: string, @Body() body: ResponseDto) {
        return this.surveyService.updateSurvey(id, body);
    }

    @GuardRole(USER_ROLE.MANAGER)
    @Delete('remove')
    async removeSurvey(@Query('id') id: string) {
        return this.surveyService.remove(id)
    }

}
