import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(email: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findMany(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    async updateRefreshToken(id: number, refreshToken: string): Promise<User> {
        return this.prismaService.user.update({
            where: {
                id,
            },
            data: {
                refreshToken,
            },
        });
    }
}
