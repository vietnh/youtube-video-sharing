import { injectable } from 'inversify';
import fetch from 'node-fetch';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface IYoutubeService {
  getVideoInfo(url: string): Promise<{ videoId: string, title: string; description: string }>;
}

@injectable()
export class YoutubeService implements IYoutubeService {
  private apiKey: string;
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY as string;
  }

  async getVideoInfo(
    url: string
  ): Promise<{ videoId: string; title: string; description: string }> {
    const videoId = this.getYouTubeVideoId(url);
    if (!videoId) throw new Error('Invalid YouTube URL');

    const response = await fetch(
      `${YOUTUBE_API_URL}/videos?id=${videoId}&key=${this.apiKey}&part=snippet`
    );
    const data = await response.json();
    const title = data.items[0].snippet.title;
    const description = data.items[0].snippet.description;

    return { videoId, title, description };
  }

  private getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return null;
    }
  };
}
