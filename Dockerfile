FROM node:latest

ADD . /app

WORKDIR /app

RUN npm install -g gulp
RUN npm start

ENV PORT 80
EXPOSE 80

CMD ["node", "server.js"]
