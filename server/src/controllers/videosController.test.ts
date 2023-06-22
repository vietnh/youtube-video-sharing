import { VideoController, IVideoController } from './videosController';
import { IYoutubeService } from '../services/youtubeService';
import Video, { IVideoProperties } from '../models/Video';
import { Response } from 'express';
import { IAuthRequest } from '../middlewares/authenticationMiddleware';

jest.mock('../models/Video');
jest.mock('../socket');

describe('VideoController', () => {
  const youtubeService: IYoutubeService = {
    getVideoInfo: jest.fn(),
  };
  const videoController: IVideoController = new VideoController(youtubeService);
  let req = {} as IAuthRequest;
  let res = {
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getVideos', () => {
    it('should return a list of videos', async () => {
      const mockVideos: IVideoProperties[] = [
        {
          videoId: '123',
          title: 'Test Video 1',
          description: 'This is a test video',
          sharedBy: 'user1@example.com',
          createdAt: new Date(),
        },
        {
          videoId: '234',
          title: 'Test Video 2',
          description: 'This is a test video 2',
          sharedBy: 'user2@example.com',
          createdAt: new Date(),
        },
      ];
      Video.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockVideos),
      });

      await videoController.getVideos(req, res);

      expect(res.json).toHaveBeenCalledWith(mockVideos);
    });
  });

  describe('shareVideo', () => {
    it('should share a new video', async () => {
      const videoInfo = {
        videoId: '123',
        title: 'Test Video 1',
        description: 'This is a test video',
      };
      youtubeService.getVideoInfo = jest.fn().mockResolvedValue(videoInfo);
      req = {
        body: { url: 'https://www.youtube.com/watch?v=123' },
        user: { email: 'user@example.com' },
      } as IAuthRequest;
      const io = {
        sockets: {
          emit: jest.fn(),
        },
      };
      jest.spyOn(require('../socket'), 'getSocket').mockReturnValue(io);
      Video.prototype.save = jest.fn().mockResolvedValue(undefined);

      await videoController.shareVideo(req, res);

      expect(youtubeService.getVideoInfo).toHaveBeenCalledWith(req.body.url);
      expect(Video.prototype.save).toHaveBeenCalled();
      expect(io.sockets.emit).toHaveBeenCalledWith('new-video-shared', {
        email: req.user!.email,
        message: videoInfo.title,
      });
      expect(res.json).toHaveBeenCalledWith('successful');
    });

    it('should handle the exception thrown by youtubeService', async () => {
      const errorMessage = 'Invalid YouTube URL';
      jest.spyOn(youtubeService, 'getVideoInfo').mockImplementation(() => {
        throw new Error(errorMessage);
      });
      req = {
        body: { url: 'random string' },
        user: { email: 'user@example.com' },
      } as IAuthRequest;

      try {
        await videoController.shareVideo(req, res);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe(errorMessage);
      }
    });
  });
});
