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
import http from 'http';
import { setupSocket } from './socket';

dotenv.config();

const app: Express = express();
const port = '3001';
const server = http.createServer(app);

connect(process.env.MONGO_URI as string);
setupSocket(server);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandlerMiddleware);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

const videoController = container.get<IVideoController>(Types.VideoController);
const authenticationController = container.get<IAuthenticationController>(
  Types.AuthenticationController
);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/login', authenticationController.login);

app.get('/videos', videoController.getVideos);
app.post('/videos', authenticationMiddleware, videoController.shareVideo);

app.use(errorHandlerMiddleware);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;