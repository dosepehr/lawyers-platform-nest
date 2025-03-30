import { Controller, Post, Body, Get, UseGuards, Request, Bind } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
interface LoginDto {
  username: string;
  password: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Bind(Request())
  async login(req: any) {
    return this.authService.login(req.user);
  }
}
