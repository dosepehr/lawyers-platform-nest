import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

interface LoginDto {
  username: string;
  password: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }
}
