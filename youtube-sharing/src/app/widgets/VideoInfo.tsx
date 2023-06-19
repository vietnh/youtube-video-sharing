'use client';

import { useEffect, useState } from 'react';
import { Video } from '../api/videos/route';
import YouTubePlayer from '../components/YoutubePlayer';

export interface YouTubePlayerProps {
  video: Video
}

export default function VideoInfo({ video }: YouTubePlayerProps) {
  const { url, shared_by } = video;
  const [info, setInfo] = useState({ title: '', description: '' });
  const videoId = getYouTubeVideoId(url);

  useEffect(() => {
    if (videoId) {
      getYoutubeVideoData()
      .then((data) => {
        setInfo(data);
      })
    }
  }, [videoId]);

  // TODO: Move this to a service
  async function getYoutubeVideoData(): Promise<{ title: string, description: string }> {
    const apiKey = "AIzaSyB3FR5OwDsLwuZMJ23Sgaw4n84zDGomUtM"
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
    const data = await response.json();
    const title = data.items[0].snippet.title;
    const description = data.items[0].snippet.description;
  
    return { title, description };
  }

  return (
    <div className="flex flex-row">
    <div className="w-1/2 p-4">
      <YouTubePlayer url={url} />
    </div>
    <div className="w-1/2 p-4 flex flex-col">
        <h2 className="text-2xl font-bold">{info.title}</h2>
        <p className="text-lg">Shared by: {shared_by}</p>
        <p className="text-lg">Description: </p>
        <p className="text-lg">{info.description}</p>
      </div>
    </div>
  );
};

function getYouTubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
}