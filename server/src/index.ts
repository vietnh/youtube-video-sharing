import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import container from './container';
import createApp from './appFactory';

dotenv.config();

export const { app, server } = createApp({
  container,
  port: 3001,
  connectionString: process.env.MONGO_URI as string,
  createDefaultData: true
});

export default app;
