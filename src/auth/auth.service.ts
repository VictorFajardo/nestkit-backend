import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { HashService } from './hash/hash.service';
import { TokenService } from './token/token.service';
import { AuthDto } from './dto/auth.dto';
import { AuditLogService } from '@audit-log/audit-log.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
    private tokenService: TokenService,
    private auditLogService: AuditLogService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ForbiddenException('Email already in use');
    }

    const hash = await this.hashService.hashData(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        name: dto.name,
        role: 'USER', // Default role
      },
    });

    return {
      email: user.email,
      name: user.name ?? undefined,
      role: user.role,
    };
  }

  async login(dto: LoginDto, req?: Request) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    const passwordValid =
      user && (await this.hashService.compareData(dto.password, user.password));
    if (!user || !passwordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const tokens = await this.tokenService.generateTokens(
      user.id,
      user.email,
      user.role,
    );
    await this.tokenService.updateRefreshToken(user.id, tokens.refresh_token);

    await this.auditLogService.log(user.id, 'auth.login', {
      email: user.email,
      ip: req?.ip || 'unknown',
      userAgent: req?.headers?.['user-agent'] || 'unknown',
    });

    return tokens;
  }

  async logout(userId: string) {
    await this.tokenService.removeRefreshToken(userId);
  }

  async refreshTokens(userId: string, email: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.tokenService.generateTokens(
      user.id,
      user.email,
      user.role,
    );
    await this.tokenService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }
}
