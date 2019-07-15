FROM node:10.12.0-alpine

WORKDIR /usr/src/app

ENV NODE_ENV dev

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "node", "index.js" ]