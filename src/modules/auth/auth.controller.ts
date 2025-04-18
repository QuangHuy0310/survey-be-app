import { AuthService } from '@modules/auth/auth.service';
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { plainToInstance } from 'class-transformer';
import { userResDto } from '@modules/users/dto/user.dto';
import { LocalAuthGuard } from '@guard/local-auth.guard';
import { USER_ROLE } from '@utils/data-types/emuns';
import { Public } from '@utils/decorators/public.decorator';
import { GoogleAuthGuard } from '@guard/google-auth.guard';
import { GuardRole } from '@utils/decorators/guard-role.decorator';
import { UserService } from '@modules/users/user.service';
import { configs } from '@utils/config/config';

@ApiTags('AUTHENTICATION')

@Controller('Auth')
export class AuthController {
    constructor(
        private authService: AuthService
        , private userService: UserService
    ) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        const data = await this.authService.register(dto);
        return {
            ...data,
            user: plainToInstance(userResDto, data.user, { excludeExtraneousValues: true }),
        };
    }
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: any, @Body() dto: LoginDto) {
        const data = await this.authService.login(req.user);
        return {
            ...data,
            user: plainToInstance(userResDto, data.user, { excludeExtraneousValues: true }),
        };
    }

    @GuardRole(USER_ROLE.USER, USER_ROLE.MANAGER)
    @Get('profile')
    getProfile(@Req() req: any) {
        return plainToInstance(userResDto, req.user, {
            excludeExtraneousValues: true,
        });
    }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    async googleLogin() { }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/redirect')
    async googleCallback(@Req() req, @Res() res) {
        const user = await this.userService.findByGoogleId(req.user.id);
        const payload = {
            email: user.email,
            id: user._id, 
            role: user.role,
        }
        const response = await this.authService.googleLogin(payload);
        res.redirect(`${configs.front_end_url}/oauth-success?token=${response.accessToken}`);
    }
}
