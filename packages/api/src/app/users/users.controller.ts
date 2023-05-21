import { Controller, Get, Request} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findMany();
    }


    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
