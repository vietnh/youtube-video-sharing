'use client';

import React, { useState, useEffect } from 'react';
import socket from '../lib/socket';
import Notification from '../components/Notifications';

export interface NotificationMessage {
  email: string;
  message: string;
}

export interface NotificationProps {
  duration?: number;
}

const Notifications = ({ duration = 5000 }: NotificationProps) => {
  const [messages, setMessages] = useState<NotificationMessage[]>([]);

  useEffect(() => {
    socket.on('new-video-shared', (message: NotificationMessage) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      socket.off('new-video-shared');
    };
  }, []);

  return (
    <div className="fixed left-1 top-24">
      <ul>
        {messages.map((message, index) => (
          <Notification
            id={index}
            email={message.email}
            message={message.message}
            duration={duration}
            onDurationEnd={() => {
              setMessages((prevMessages) =>
                prevMessages.filter((_, idx) => idx !== index)
              );
            }}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
