import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from './database';
import { login } from './controllers/auth';
import { validateToken } from './middlewares/authentication';

const connectionString = 'mongodb://mongodb:27017/youtube-sharing';
connect(connectionString);

dotenv.config();

const app: Express = express();
const port = '3001';

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/login', login);

app.get('/videos', validateToken, (req: Request, res: Response) => {
  res.send(mockVideos);
});

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

const mockVideos: Video[] = [
  {
    id: 1,
    url: 'https://youtu.be/uCXZOylfOc4',
    title: 'test video 1',
    description: 'test video 1',
    shared_by: 'test_user_1@yopmail.com',
    shared_at: '2021-09-01T00:00:00.000Z',
  },
  {
    id: 2,
    url: 'https://youtu.be/3yLqJZyOcjc',
    title: 'test video 2',
    description: 'test video 2',
    shared_by: 'test_user_2@yopmail.com',
    shared_at: '2021-09-02T00:00:00.000Z',
  },
  {
    id: 3,
    url: 'https://youtu.be/NjijSB4bpwU',
    title: 'test video 3',
    description: 'test video 3',
    shared_by: 'test_user_3@yopmail.com',
    shared_at: '2021-09-03T00:00:00.000Z',
  }
]