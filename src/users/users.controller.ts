import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { GetUser } from '@common/decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@GetUser('userId') userId: string) {
    return this.usersService.getById(userId);
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @GetUser('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, dto);
  }

  @Get('all') // Optional: admin-only route
  async getAllUsers() {
    return this.usersService.getAll();
  }
}
