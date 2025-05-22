import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  RequestPasswordResetDto,
  ResetPasswordDto,
} from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  usersService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @Public()
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('request-reset')
  @Public()
  async requestReset(@Body() dto: RequestPasswordResetDto) {
    // return this.authService.sendPasswordResetToken(dto.email);
  }

  @Post('reset-password')
  @Public()
  async resetPassword(@Body() dto: ResetPasswordDto) {
    // return this.authService.resetPassword(dto.token, dto.newPassword);
  }

  @Public()
  @Post('refresh')
  async refreshTokens(@Body() body: { userId: string; refreshToken: string }) {
    return this.authService.refreshTokens(body.userId, body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@GetUser('userId') userId: string) {
    return this.authService.logout(userId);
  }
}
