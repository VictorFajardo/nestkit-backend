import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(userId: string, dto: UpdateUserDto) {
    const user = await this.getById(userId);

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...dto,
      },
    });
  }

  async remove(userId: string) {
    await this.getById(userId);
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
