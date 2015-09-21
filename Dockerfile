FROM node:0.10

ADD . /app

WORKDIR /app

RUN npm install

ENV PORT 80
EXPOSE 80

CMD ["node", "server.js"]
