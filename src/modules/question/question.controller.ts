import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto/questionDto';
import { ApiTags } from '@nestjs/swagger';
import { GuardRole } from '@utils/decorators/guard-role.decorator';
import { USER_ROLE } from '@utils/data-types/emuns';
ApiTags('QUESTION')
@Controller('questions')
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService,
    ) { }

    @GuardRole(USER_ROLE.MANAGER,USER_ROLE.USER)
    @Post('new-question')
    async newQuestion(@Body() dto: QuestionDto) {
        return this.questionService.create(dto)
    }

    @GuardRole(USER_ROLE.MANAGER, USER_ROLE.USER)
    @Get('get-question')
    async getQuestion(@Query('surveyId') surveyId: string) {
        return this.questionService.getQuestion(surveyId)
    }
}
