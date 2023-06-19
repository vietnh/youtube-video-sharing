import { Video } from "./api/videos/route"
import VideoInfo from "./widgets/VideoInfo"

export default async function Home() {
  const data = await getVideos();

  return <ul>{data.map(video => (<li key={video.id}><VideoInfo video={video} /></li>))}</ul>
}

async function getVideos(): Promise<Video[]> {
  const res = await fetch(`${process.env.API_URL}/videos`)
  return res.json()
}