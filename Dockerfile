FROM node:18-alpine3.18 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine3.18 as prod
WORKDIR /usr/src/app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev
CMD npm run start:prod

FROM node:18-alpine3.18 as dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run start:dev
