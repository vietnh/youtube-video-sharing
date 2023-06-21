export function IconHome() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFFFFF"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      width="50"
      height="50"
    >
      <path d="M3 9l9-6 9 6v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}

export function HomeIcon() {
  return (
    <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="50"
        height="50"
      >
        <path d="M3 9l9-6 9 6v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
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
