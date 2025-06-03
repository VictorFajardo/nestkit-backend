import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Users e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;
  const email = 'e2euser2@example.com';
  const password = 'Test123!';
  const name = 'E2E User 2';

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get(PrismaService);

    // Register test user
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password, name });

    // Login test user
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password });

    accessToken = loginRes.body.access_token;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
    await app.close();
  });

  it('GET /users should require auth', async () => {
    await request(app.getHttpServer()).get('/users').expect(401); // or 403 depending on your guards
  });

  it('GET /users should return list with valid token', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('email');
  });
});
