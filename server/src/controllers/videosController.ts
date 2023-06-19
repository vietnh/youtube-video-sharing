import { Request, Response } from 'express';
import Video from '../models/Video';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { inject, injectable } from 'inversify';
import Types from '../types';
import { IYoutubeService } from '../services/youtubeService';
import { IAuthRequest } from '../middlewares/authentication';

export interface IVideoController {
  shareVideo(req: IAuthRequest, res: Response): Promise<Response>;
  getVideos(req: IAuthRequest, res: Response): Promise<Response>;
}

@injectable()
export class VideoController implements IVideoController {
  constructor(
    @inject(Types.YoutubeService) private youtubeService: IYoutubeService
  ) {}

  async getVideos(
    req: IAuthRequest,
    res: Response<any, Record<string, any>>
  ): Promise<Response> {
    try {
      const videos = await Video.find();
      return res.json(videos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async shareVideo(
    req: IAuthRequest,
    res: Response<any, Record<string, any>>
  ): Promise<Response> {
    try {
      const { url } = req.body;
      const videoInfo = await this.youtubeService.getVideoInfo(url);

      await Video.create({
        url,
        title: videoInfo.title,
        description: videoInfo.description,
        shared_by: req.user!.email,
        shared_at: new Date(),
      });

      return res.json('successful');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
}
