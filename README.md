# YouTube Video Sharing Website

This website allows users to share their favorite YouTube videos with others. It has two primary screens: the homepage, which displays all shared videos, and the video sharing screen, where users can submit a new video.


## Table of Contents

1. [Live Version](#live-version)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Deployment](#deployment)
7. [Usage](#usage)

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

Clone this repository:

```
git clone https://github.com/vietnh/youtube-video-sharing.git
```

### For testing

At the root folder of the repository:
```
docker-compose up -d
```

The website should now be running at `http://localhost:3000`.

### For development

1. Navigate to the backend `server` directory:
```
cd server
```

2. Install the required backend dependencies:
```
npm install
```

3. Create a `.env` file in the `server` directory and add the following environment variables:
````
JWT_TOKEN=myyoutubesharingappjwtsecret
YOUTUBE_API_KEY=<your_google_api>
MONGO_URI=mongodb://localhost:27017/youtube-sharing
````

4. Start the server:
```
npm run dev
```

The backend server should now be running at `http://localhost:3001`.

5. Open a new terminal window and navigate to the frontend `youtube-sharing` directory:
```
cd youtube-sharing
```

6. Install the required frontend dependencies:
```
npm install
```

7. Create a `.env` file in the `youtube-sharing` directory and add the following environment variable:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

8. Start the frontend development server:
```
npm run dev
```

The frontend should now be running at `http://localhost:3000`.

## Deployment

Ensure that you already have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on an AWS EC2 Linux instance up and running. To deploy the application using Docker Compose on an EC2 instance, follow these steps:

1. Use `scp` to copy the source code from your local machine to the EC2 instance:
```
scp -r /path/to/local/youtube-video-sharing ec2-user@ec2-instance-ip:/path/to/remote/directory
```

Replace `/path/to/local/youtube-video-sharing-website` with the path to your local project folder, `ec2-user@ec2-instance-ip` with your EC2 instance's user and IP address, and `/path/to/remote/directory` with the desired path on the EC2 instance.

2. SSH into your EC2 instance:
```
ssh ec2-user@ec2-instance-ip
```

Replace `ec2-user@ec2-instance-ip` with your EC2 instance's user and IP address.

3. Navigate to the project directory on the EC2 instance:
```
cd /path/to/remote/directory/youtube-video-sharing
```

4. Start the application using Docker Compose:
```
docker-compose up -d
```

This command will build and start the frontend, backend, and MongoDB services in Docker containers.

Your application should now be deployed and running on your EC2 instance. Access the application at http://ec2-instance-ip:3001.

## Usage
Homepage: Visit the homepage at http://localhost:3000 to view all shared YouTube videos.

Share a Video: Click on the "Share a Video" button or navigate to http://localhost:3000/share to open the video sharing screen. Enter the YouTube video URL and click the "Share" button to submit the video.