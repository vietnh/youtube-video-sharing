'use client';
import { useState } from 'react';
import Button from '../components/Button';
import client from '../lib/api';
import socket from '../lib/socket';
import Cookie from 'js-cookie';

export default function ShareForm() {
  const [url, setUrl] = useState('');
  const shareVideo = async () => {
    const res = await client.post('/videos', {
      url,
    });
    console.log(res);
    socket.emit('message', `${Cookie.get('email')} shared a video: ${url}`)
  };

  return (
    <>
      <div className="flex items-center">
        <input
          value={url}
          type="text"
          placeholder="Youtube URL"
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <Button className="w-full mt-6" onClick={() => shareVideo()}>
        Share
      </Button>
    </>
  );
}