import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AuthService } from '@auth/auth.service';
import { PrismaService } from '@prisma-local/prisma.service';
import { HashService } from '@auth/hash/hash.service';
import { TokenService } from '@auth/token/token.service';
import { AuditLogService } from '@audit-log/audit-log.service';
import { ForbiddenException } from '@nestjs/common';

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockHashService = {
  hashData: jest.fn(),
  compareData: jest.fn(),
};

const mockTokenService = {
  generateTokens: jest.fn(),
  updateRefreshToken: jest.fn(),
  removeRefreshToken: jest.fn(),
};

const mockAuditLogService = {
  logEvent: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: HashService, useValue: mockHashService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: AuditLogService, useValue: mockAuditLogService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should throw if user already exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'u1' });
      await expect(
        service.register({
          email: 'test@test.com',
          password: '123',
          name: 'Test',
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should register a new user and return basic info', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockHashService.hashData.mockResolvedValue('hashed');
      mockPrisma.user.create.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        name: 'Test',
        role: 'USER',
      });

      const result = await service.register({
        email: 'test@test.com',
        password: '123',
        name: 'Test',
      });

      expect(mockPrisma.user.create).toHaveBeenCalled();
      expect(mockAuditLogService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'u1',
          action: 'USER_REGISTERED',
        }),
      );
      expect(result).toEqual({
        email: 'test@test.com',
        name: 'Test',
        role: 'USER',
      });
    });
  });

  describe('login', () => {
    it('should throw on invalid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(
        service.login({ email: 'wrong@test.com', password: 'wrong' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return tokens on valid login', async () => {
      const user = {
        id: 'u1',
        email: 'a@b.com',
        password: 'hashed',
        role: 'USER',
      };
      mockPrisma.user.findUnique.mockResolvedValue(user);
      mockHashService.compareData.mockResolvedValue(true);
      mockTokenService.generateTokens.mockResolvedValue({
        access_token: 'a',
        refresh_token: 'r',
      });

      const result = await service.login({ email: 'a@b.com', password: '123' });

      expect(mockTokenService.generateTokens).toHaveBeenCalledWith(
        'u1',
        'a@b.com',
        'USER',
      );
      expect(result).toEqual({ access_token: 'a', refresh_token: 'r' });
    });
  });

  describe('logout', () => {
    it('should call removeRefreshToken and log event', async () => {
      await service.logout('u1');
      expect(mockTokenService.removeRefreshToken).toHaveBeenCalledWith('u1');
      expect(mockAuditLogService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'USER_LOGGED_OUT', userId: 'u1' }),
      );
    });
  });

  describe('refreshTokens', () => {
    it('should throw if user or refresh token is missing', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.refreshTokens('u1', 'a@b.com')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should refresh tokens and log event', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'a@b.com',
        role: 'USER',
        hashedRefreshToken: 'hashed',
      });
      mockTokenService.generateTokens.mockResolvedValue({
        access_token: 'newA',
        refresh_token: 'newR',
      });

      const result = await service.refreshTokens('u1', 'a@b.com');

      expect(mockTokenService.generateTokens).toHaveBeenCalled();
      expect(result).toEqual({ access_token: 'newA', refresh_token: 'newR' });
    });
  });
});
