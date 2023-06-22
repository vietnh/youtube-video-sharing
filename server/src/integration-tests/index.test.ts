import 'reflect-metadata';
import 'express-async-errors';
import request from 'supertest';
import dotenv from 'dotenv';
import app, { server } from './app';
import mongoose from 'mongoose';
import { createDefaultUsers } from '../scripts/defaultUsers';
import Video from '../models/Video';

dotenv.config();

describe('Integration tests', () => {
  let jwtToken: string;

  beforeAll(async () => {
    await createDefaultUsers();
  });

  afterAll(async () => {
    await Video.deleteMany({});
    await server.close();
    await mongoose.disconnect();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('At first, video list should be empty', async () => {
    const response = await request(app).get('/videos');

    expect(response.body).toEqual([]);
  });

  it('User share a video without login', async () => {
    const res = await request(app)
      .post('/videos')
      .send({ url: 'https://www.youtube.com/watch?v=skA2OVdAZXg' });

    expect(res.status).toBe(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'No token or token is in invalid format, authorization denied',
      })
    );
  });

  it('User try to login with incorrect email', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'wrongemail@example.com', password: 'password' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Invalid email or password.',
      })
    );
  });

  it('User try to login with correct email but wrong password', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'mickey@yopmail.com', password: 'password' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Invalid email or password.',
      })
    );
  });

  it('User login successfully', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'mickey@yopmail.com', password: 'mickey' });

    jwtToken = res.body.token;

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: { email: 'mickey@yopmail.com' },
      })
    );
  });

  it('User share an invalid youtube video', async () => {
    const res = await request(app)
      .post('/videos')
      .send({ url: 'https://google.com' })
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Invalid YouTube URL',
      })
    );
  });

  it('User share a youtube video successfully', async () => {
    const res = await request(app)
      .post('/videos')
      .send({ url: 'https://www.youtube.com/watch?v=skA2OVdAZXg' })
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual('successful');
  });

  it('User should get updated video list', async () => {
    const response = await request(app).get('/videos');

    expect(response.body).toEqual([
      expect.objectContaining({
        videoId: 'skA2OVdAZXg',
        title: expect.any(String),
        description: expect.any(String),
        sharedBy: 'mickey@yopmail.com',
      }),
    ]);
  });

  it('User share a 2nd video and video list must be ordered by date', async () => {
    await request(app)
      .post('/videos')
      .send({ url: 'https://www.youtube.com/watch?v=_8vekzCF04Q' })
      .set('Authorization', `Bearer ${jwtToken}`);
    const response = await request(app).get('/videos');

    expect(response.body).toEqual([
      expect.objectContaining({
        videoId: '_8vekzCF04Q',
        title: expect.any(String),
        description: expect.any(String),
        sharedBy: 'mickey@yopmail.com',
      }),
      expect.objectContaining({
        videoId: 'skA2OVdAZXg',
        title: expect.any(String),
        description: expect.any(String),
        sharedBy: 'mickey@yopmail.com',
      }),
    ]);
  });
});
