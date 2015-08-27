#Stackfiles

Stackfile registry

[![Deploy to Tutum](https://s.tutum.co/deploy-to-tutum.svg)](https://dashboard.tutum.co/stack/deploy/)

#Requirements

- Docker
- Docker-compose
- Node.JS
- Bower

#Instructions

Follow the following instruction to run the project in dev mode:

First, in the project folder, run `npm install -g gulp bower && npm install` to install all the Node.JS dependencies, then `bower install` to install the assets.

Set the following environment variables:

- NODE_ENV=development
- GITHUB_CLIENT_ID=yourgithubclientid
- GITHUB_CLIENT_SECRET=yourgithubclientsecret

Run `docker-compose -f docker-compose.dev.yml up`
Run `gulp`

#####Note
By default the mongodb database dev IP is set to 192.168.59.100 in the project.

To run the project in production mode:

Add your Github client id and client secret to the docker-compose.yml file.

Run `docker-compose up`
