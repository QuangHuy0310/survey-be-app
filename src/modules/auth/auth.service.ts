import { User } from '@entities/user.entities';
import { UserService } from '@modules/users/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/auth.dto';
import { USER_ROLE } from '@utils/data-types/emuns';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, private jwtService: JwtService
    ) { }

    async register(dto: RegisterDto) {
        const { email, password } = dto
        const hashed = await bcrypt.hash(password, 10);
        const user = await this.userService.create({ email, password: hashed });
        return this.generateTokens(user);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        return this.generateTokens(user);
    }

    async googleLogin(googleUser: any) {
        return this.generateTokens(googleUser);
    }

    private async generateTokens(user: User) {
        const payload = { sub: user._id, email: user.email, role: user.role };
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
            user,
        };
    }
}
