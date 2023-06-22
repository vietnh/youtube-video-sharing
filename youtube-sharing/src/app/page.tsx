import VideoList from './widgets/VideoList';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <VideoList />
    </div>
  );
}