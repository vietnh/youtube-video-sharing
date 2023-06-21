'use client';

import { Video } from '../interfaces/video';
import YouTubePlayer from '../components/YoutubePlayer';

export interface YouTubePlayerProps {
  video: Video
}

export default function VideoInfo({ video }: YouTubePlayerProps) {
  const { videoId, title, description, sharedBy } = video;

  return (
    <div className="flex flex-row">
    <div className="w-1/2 p-4">
      <YouTubePlayer videoId={videoId} title={title} />
    </div>
    <div className="w-1/2 p-4 flex flex-col">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg">Shared by: {sharedBy}</p>
        <p className="text-lg">Description: </p>
        <p className="text-lg overflow-y-auto h-80">{description}</p>
      </div>
    </div>
  );
};