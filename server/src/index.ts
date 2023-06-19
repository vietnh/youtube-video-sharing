import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from './database';
import { IAuthenticationController } from './controllers/authenticationController';
import { validateToken } from './middlewares/authentication';
import bodyParser from 'body-parser';
import container from './container';
import Types from './types';
import { IVideoController } from './controllers/videosController';

const connectionString = 'mongodb://127.0.0.1:27017/youtube-sharing';
connect(connectionString);

dotenv.config();

const app: Express = express();
const port = '3001';

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const videoController = container.get<IVideoController>(Types.VideoController);
const authenticationController = container.get<IAuthenticationController>(Types.AuthenticationController);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/login', authenticationController.login);

app.get('/videos', validateToken, videoController.getVideos);
app.post('/videos', validateToken, videoController.shareVideo);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export interface Video {
  id: number;
  url: string;
  title: string;
  description: string;
  shared_by: string;
  shared_at: string;
}
