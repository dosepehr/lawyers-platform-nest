import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../utils/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { RolesGuard } from 'src/utils/guards/roles.guard';
interface LoginDto {
  username: string;
  password: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return {
      statusCode: 200,
      message: 'Logged out successfully'
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('protected')
  @Roles(Role.Admin, Role.Lawyer)
  getProtectedData(@Request() req: any) {
    return {
      statusCode: 200,
      message: 'Protected data',
      data: req.user,
    }
  }
}
