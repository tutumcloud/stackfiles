FROM node:0.10

# TUT-660 Temporary fix for CVE-2015-7547
RUN apt-get update -q && apt-get install -yq libc6 && apt-get clean

ADD . /app

WORKDIR /app

RUN npm install

ENV PORT 80
EXPOSE 80

CMD ["node", "server.js"]
