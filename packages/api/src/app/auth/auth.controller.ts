import { Controller, Get, Logger, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../public.decorator';


@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({passthrough: true}) res) {
    const tokens = await this.authService.login(req.user);
    res.cookie('refresh_token', tokens.refresh_token, {httpOnly: true})

    return {
      access_token: tokens.access_token,
    }
  }

  @Public() // this should be changed to a different guard
  @Get('refresh')
  async refresh(@Request() req, @Res({passthrough: true}) res) {
    this.logger.log('Refreshing token')
    const tokens = await this.authService.refresh(req.cookies['refresh_token']);
    res.cookie('refresh_token', tokens.refresh_token, {httpOnly: true})

    return {
      access_token: tokens.access_token,
    }
  }
}
