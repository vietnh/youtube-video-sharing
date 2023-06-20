import 'reflect-metadata';
import 'express-async-errors';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from './database';
import { IAuthenticationController } from './controllers/authenticationController';
import { authenticationMiddleware } from './middlewares/authenticationMiddleware';
import bodyParser from 'body-parser';
import container from './container';
import Types from './types';
import { IVideoController } from './controllers/videosController';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import cors from 'cors';

dotenv.config();

connect(process.env.MONGO_URI as string);

const app: Express = express();
const port = '3001';

app.use(cors({
  origin: process.env.APP_URI,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticationMiddleware);
app.use(errorHandlerMiddleware);

const videoController = container.get<IVideoController>(Types.VideoController);
const authenticationController = container.get<IAuthenticationController>(Types.AuthenticationController);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/login', authenticationController.login);

app.get('/videos', videoController.getVideos);
app.post('/videos', videoController.shareVideo);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});