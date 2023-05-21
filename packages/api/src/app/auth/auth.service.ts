import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '1m' });
        const refreshToken = this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' });
        this.usersService.updateRefreshToken(user.id, refreshToken);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
}
