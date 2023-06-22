import { Container } from 'inversify';
import express, { Express, Request, Response } from 'express';
import { connect } from './database';
import { IAuthenticationController } from './controllers/authenticationController';
import { authenticationMiddleware } from './middlewares/authenticationMiddleware';
import bodyParser from 'body-parser';
import Types from './types';
import { IVideoController } from './controllers/videosController';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import http from 'http';
import { setupSocket } from './socket';
import { createDefaultUsers } from './scripts/defaultUsers';

export interface AppFactoryOptions {
  container: Container
  port: number
  connectionString: string
  createDefaultData?: boolean
}

const createApp = ({ container, port, connectionString, createDefaultData }: AppFactoryOptions) => {
  const app: Express = express();
  const server = http.createServer(app);

  connect(connectionString);
  setupSocket(server);

  if (createDefaultData) {
    createDefaultUsers();
  }

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(errorHandlerMiddleware);
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  });

  const videoController = container.get<IVideoController>(
    Types.VideoController
  );
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

  return { app, server };
};

export default createApp;
