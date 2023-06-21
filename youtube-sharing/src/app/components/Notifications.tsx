import { useEffect } from 'react';

export interface NotificationProps {
  id: string | number;
  email: string;
  message: string;
  duration: number;
  onDurationEnd: () => void;
}

function Notification({
  id,
  email,
  message,
  duration,
  onDurationEnd,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDurationEnd(), duration);

    return () => {
      clearTimeout(timer);
    };
  }, [message, id, duration]);

  return (
    <div className="bg-green-500 text-white px-4 py-2 rounded shadow">
      <div>User {email} has shared a new video</div>
      <div className="font-bold">{message}</div>
    </div>
  );
}

export default Notification;
