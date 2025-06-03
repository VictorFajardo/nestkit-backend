import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@app/app.module';
import { PrismaService } from '@prisma/prisma.service';
import request from 'supertest';

describe('Auth e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const testUser = {
    email: 'e2euser@example.com',
    password: 'Password123!',
    name: 'E2E User',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await app.close();
  });

  it('should register and login successfully', async () => {
    // Register
    const resRegister = await request(app.getHttpServer())
      .post('/auth/register')
      .send(testUser)
      .expect(201);

    expect(resRegister.body).toMatchObject({
      email: testUser.email,
      name: testUser.name,
      role: 'USER',
    });

    // Login
    const resLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(201);

    expect(resLogin.body).toHaveProperty('access_token');
    expect(resLogin.body).toHaveProperty('refresh_token');
  });
});
