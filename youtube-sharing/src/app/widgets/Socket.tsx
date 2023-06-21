'use client';

import React, { useState, useEffect } from 'react';
import socket from '../lib/socket';

const Socket = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (message: string) => {
        alert(message)
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Socket;