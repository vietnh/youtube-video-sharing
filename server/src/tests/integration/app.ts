import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import container from './container';
import createApp from '../../appFactory';

dotenv.config();

export const { app, server } = createApp({
  container,
  port: 3002,
  connectionString: 'mongodb://localhost:27017/youtube-sharing-test',
});

export default app;
