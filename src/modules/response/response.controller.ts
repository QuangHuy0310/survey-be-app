import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ResponseService } from '@modules/response/response.service';
import { InputResponseDto } from './dto/resDto';
import { USER_ROLE } from '@utils/data-types/emuns';
import { GuardRole } from '@utils/decorators/guard-role.decorator';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('RESPONSE')
@Controller('responses')
export class ResponseController {
    constructor(private readonly responseService: ResponseService) { }

    @GuardRole(USER_ROLE.MANAGER, USER_ROLE.USER)
    @Post('new-response')
    async newResponse(@Req() req: any, @Body() dto: InputResponseDto) {
        return await this.responseService.handleCreate(req.user._id, dto);
    }

    @ApiQuery({ name: 'userId', required: false })
    @Get('by-user')
    async getResponsesByUser(@Query('userId') userId?: string) {
        return this.responseService.getByUserId(userId);
    }

    @Get('users')
    getRespondedUsers() {
        return this.responseService.getRespondedUsers();
    }
}
