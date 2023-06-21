'use client';
import { useState } from 'react';
import Button from '../components/Button';
import client from '../lib/api';

export default function ShareForm() {
  const [url, setUrl] = useState('');
  const shareVideo = async () => {
    const res = await client.post('/videos', {
      url,
    });
    console.log(res);
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