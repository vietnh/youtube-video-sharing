import { useState } from 'react';

export interface YouTubePlayerProps {
  url: string
}

export default function YouTubePlayer({ url }: YouTubePlayerProps) {
  const videoId = getYouTubeVideoId(url);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <>
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </>
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