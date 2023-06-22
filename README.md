# YouTube Video Sharing Website

This website allows users to share their favorite YouTube videos with others. It has two primary screens: the homepage, which displays all shared videos, and the video sharing screen, where users can submit a new video.


## Table of Contents

1. [Live Version](#live-version)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Live Version

You can access the live version of the YouTube Video Sharing Website at [http://ec2-54-179-213-54.ap-southeast-1.compute.amazonaws.com:3000/](http://ec2-54-179-213-54.ap-southeast-1.compute.amazonaws.com:3000/).

## Features

- Browse and watch shared YouTube videos on the homepage.
- Share a new YouTube video by providing its URL.
- Responsive design for both desktop and mobile devices.

## Technology Stack

- Frontend: Nextjs, Reactjs, Tailwindcss, Typescript
- Backend: Node.js, Express, Typescript, Socket.io
- Database: MongoDB

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone this repository:

```
git clone https://github.com/vietnh/youtube-video-sharing.git
```

### For testing

At the root folder of the repository:
```
docker-compose up -d
```

### For development

1. Navigate to the backend `server` directory:

```
cd server
```

2. Install the required backend dependencies:

````
npm install
```

3. Create a `.env` file in the `server` directory and add the following environment variables:

````
JWT_TOKEN=myyoutubesharingappjwtsecret
YOUTUBE_API_KEY=<your_google_api>
MONGO_URI=mongodb://localhost:27017/youtube-sharing
```

4. Start the server:

````
npm run dev
```

The backend server should now be running at `http://localhost:3001`.

5. Open a new terminal window and navigate to the frontend `youtube-sharing` directory:

````
cd youtube-sharing
```

6. Install the required frontend dependencies:

````
npm install
```

7. Create a `.env` file in the `youtube-sharing` directory and add the following environment variable:

````
NEXT_PUBLIC_API_URL=http://localhost:3001
```

8. Start the frontend development server:

````
npm run dev
```

The frontend should now be running at `http://localhost:3000` or the next available port.