FROM node:18

WORKDIR /server

COPY *.json ./

RUN ls -al

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "npm", "start" ]