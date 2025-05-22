import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/decorators/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const userId = req.user?.userId;
    return this.usersService.findById(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('all')
  getAllUsers(@Req() req) {
    const userId = req.user?.userId;
    return this.usersService.getAll(userId);
  }
}
