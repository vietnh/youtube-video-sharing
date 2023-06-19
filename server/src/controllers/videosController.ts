import { Response } from 'express';
import Video, { IVideoProperties } from '../models/Video';
import { inject, injectable } from 'inversify';
import Types from '../types';
import { IYoutubeService } from '../services/youtubeService';
import { IAuthRequest } from '../middlewares/authenticationMiddleware';

export interface IVideoController {
  shareVideo(req: IAuthRequest, res: Response): Promise<Response>;
  getVideos(req: IAuthRequest, res: Response): Promise<Response>;
}

@injectable()
export class VideoController implements IVideoController {
  constructor(
    @inject(Types.YoutubeService) private youtubeService: IYoutubeService
  ) {}

  public getVideos = async (
    req: IAuthRequest,
    res: Response<any, Record<string, any>>
  ): Promise<Response> => {
    const videos = (await Video.find()).map<IVideoProperties>((video) => ({
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      shared_by: video.shared_by,
      shared_at: video.shared_at,
    }));
    return res.json(videos);
  };

  public shareVideo = async (
    req: IAuthRequest,
    res: Response<any, Record<string, any>>
  ): Promise<Response> => {
    const { url } = req.body;
    const videoInfo = await this.youtubeService.getVideoInfo(url);

    await Video.create({
      videoId: videoInfo.videoId,
      title: videoInfo.title,
      description: videoInfo.description,
      shared_by: req.user!.email,
      shared_at: new Date(),
    });

    return res.json('successful');
  };
}
