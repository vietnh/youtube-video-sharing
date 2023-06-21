import { Response } from 'express';
import Video, { IVideo, IVideoProperties } from '../models/Video';
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
    const videos = (
      await Video.find().sort({ createdAt: -1 })
    ).map<IVideoProperties>((video: IVideo) => ({
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      sharedBy: video.sharedBy,
      createdAt: video.createdAt,
    }));

    return res.json(videos);
  };

  public shareVideo = async (
    req: IAuthRequest,
    res: Response<any, Record<string, any>>
  ): Promise<Response> => {
    const { url } = req.body;
    const videoInfo = await this.youtubeService.getVideoInfo(url);
    const video = new Video({
      videoId: videoInfo.videoId,
      title: videoInfo.title,
      description: videoInfo.description,
      sharedBy: req.user!.email,
    });
    await video.save();

    return res.json('successful');
  };
}
