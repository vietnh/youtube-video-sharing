export const fetchCache = 'default-no-store';

import { Video } from './interfaces/video';
import client from './lib/api';
import VideoInfo from './widgets/VideoInfo';

export default async function Home() {
  const data = await client.get<Video[]>('/videos');

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {data.map((video, index) => (
        <VideoInfo video={video} key={index} />
      ))}
    </div>
  );
}
