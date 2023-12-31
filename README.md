<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
API for survey project using [Nest](https://github.com/nestjs/nest) and TypeScript.

# Docker
Install [Docker](https://www.docker.com/)

## 1.- Enviroment variables
change variables in `.env` file

#### For Development change stage variable to `dev`
```ini
#Port for example 3001
PORT=

#Cors Domain for example http://localhost:3000
CORS_DOMAIN=

#Google Auth 2.0
#https://console.cloud.google.com
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

#encuesta-mongodb is a name of mongodb container, change only for production
#(use external mongodb service in production, Mongo Atlas for example)
#https://www.mongodb.com/atlas/database
MONGO_URI='mongodb://encuesta-mongodb:27017/surveydb'
```

## 2.- Build docker image

#### Build Project for Docker (MongoDB and Project in docker)


### 2.1 Production
Replace docker-compose.yml content for this and then execute the commands from step 2.2
```yml
version: '3.8'

services:

  backend:
    build:
      context: .
      target: prod
      dockerfile: Dockerfile
    container_name: encuesta-api
    image: encuesta-api
    ports:
      - ${PORT}:${PORT}
    env_file:
      - ./.env

```
### 2.2 Commands

#### Build image
```bash 
docker compose -f docker-compose.yml build
```
#### Run Image
* this command can be used for build and run docker image
```bash 
docker compose -f docker-compose.yml up -d
```

### Serverless
Read more of [Serverless](https://www.serverless.com)

For test deploy using serverless in local use this command:
```bash
sls offline
```

For deploy directly in AWS Lambda you need authentication from user with console permissions in AWS, need first compile project

```bash
npm run build
```

after, deploy project in AWS using serverless

```bash
sls deploy
```

> .[!WARNING].
> Automatic deployment
> Be careful when committing to the main branch, these changes will be deployed to AWS automatically
> 

> .[!INFO].
> Lack the Github Actions - CI/CD implementation
> 

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
