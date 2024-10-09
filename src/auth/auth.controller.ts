import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }

  @Post('check')
  async checkSession(
    @Res({ passthrough: true }) res: Response,
    @Body('email') email: string,
  ) {
    const checked = await this.authService.checkSession(email);
    res.status(checked ? 200 : 404);
    return checked;
  }
}
