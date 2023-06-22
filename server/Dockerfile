FROM node:18

WORKDIR /server

ENV MONGO_URI=mongodb://mongodb:27017/youtube-sharing

COPY *.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "npm", "start" ]