import { Controller, Get, Logger, Req, Request} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(@Req() request) {
        this.logger.log(`Cookies: ${request.cookies['refresh_token']}`);
        return this.usersService.findMany();
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
