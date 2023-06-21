'use client';

import { useRouter } from 'next/navigation';
import { IconHome } from '../components/Icons';

export function MainTitle() {
  const router = useRouter();
  return (
    <div className="flex cursor-pointer" onClick={() => router.push('/')}>
      <IconHome />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 250 50"
        width="250"
        height="50"
      >
        <text
          x="10"
          y="38"
          font-size="32"
          font-weight="bold"
          fill="#FFF"
          text-anchor="start"
        >
          Funny Movies
        </text>
      </svg>
    </div>
  );
}
