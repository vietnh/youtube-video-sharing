import { Video } from "./interfaces/video"
import client from "./lib/api";
import VideoInfo from "./widgets/VideoInfo"

export default async function Home() {
  const data = await client.get<Video[]>('/videos');

  return <ul>{data.map((video, index) => (<li key={index}><VideoInfo video={video} /></li>))}</ul>
}