FROM node:18

WORKDIR /web

ENV NEXT_PUBLIC_API_URL=http://server:3001

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]