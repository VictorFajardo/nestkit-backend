import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Audit Logs e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let adminToken: string;
  let userId: string;

  const email = 'admin@auditlog.test';
  const password = 'Admin123!';
  const name = 'Audit Admin';

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get(PrismaService);

    // Create admin user manually to ensure role
    const adminUser = await prisma.user.create({
      data: {
        email,
        password: 'dummy', // hashed not needed since login not used
        name,
        role: 'ADMIN',
      },
    });
    userId = adminUser.id;

    // Manually insert a fake audit log entry
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'USER_CREATED',
        context: 'user',
        metadata: {
          email,
          note: 'Test insert',
        },
      },
    });

    // Bypass login if needed; or insert hashed password + login
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password });

    adminToken = loginRes.body?.access_token || 'mock-admin-token';
  });

  afterAll(async () => {
    await prisma.auditLog.deleteMany({ where: { userId } });
    await prisma.user.deleteMany({ where: { email } });
    await app.close();
  });

  it('GET /audit-logs should be forbidden without token', async () => {
    await request(app.getHttpServer()).get('/audit-logs').expect(401);
  });

  it('GET /audit-logs should return logs for admin', async () => {
    const res = await request(app.getHttpServer())
      .get('/audit-logs')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toMatchObject({
      action: 'USER_CREATED',
      context: 'user',
      metadata: expect.any(Object),
    });
  });
});
