import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    prisma = app.get(PrismaService);
  });

  beforeEach(async () => {
    // প্রতিটি টেস্টের আগে user টেবিল পরিষ্কার করুন, যাতে টেস্টগুলো একটা আরেকটাকে প্রভাবিত না করে
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('সঠিক ডেটায় সফলভাবে register করে এবং token ফেরত দেয়', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'rahim@example.com', password: 'secret123', name: 'Rahim' });

      expect(res.status).toBe(201);
      expect(res.body.accessToken).toBeDefined();
      expect(res.body.user.email).toBe('rahim@example.com');
    });

    it('duplicate email-এ 409 error দেয়', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'rahim@example.com', password: 'secret123', name: 'Rahim' });

      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'rahim@example.com', password: 'anotherpass', name: 'Rahim 2' });

      expect(res.status).toBe(409);
    });

    it('ছোট password-এ (৬ অক্ষরের কম) validation error দেয়', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'short@example.com', password: '123', name: 'Short' });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'nadia@example.com', password: 'correctpass', name: 'Nadia' });
    });

    it('সঠিক credential-এ সফলভাবে login করে এবং valid JWT ফেরত দেয়', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nadia@example.com', password: 'correctpass' });

      expect(res.status).toBe(200);
      expect(res.body.accessToken).toBeDefined();

      // JWT token তিনটি অংশে বিভক্ত (header.payload.signature) কিনা যাচাই করুন
      const parts = res.body.accessToken.split('.');
      expect(parts.length).toBe(3);
    });

    it('ভুল password-এ 401 error দেয়', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nadia@example.com', password: 'wrongpassword' });

      expect(res.status).toBe(401);
    });

    it('না থাকা email-এ 401 error দেয় (404 নয়, যাতে email enumerate করা না যায়)', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'doesnotexist@example.com', password: 'anything' });

      expect(res.status).toBe(401);
    });
  });
});