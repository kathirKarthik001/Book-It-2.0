# base image containing nodejs & package.json files
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# dev stage with nodemon ( dev dependencies installed)
FROM base AS dev 
ENV CHOKIDAR_USEPOLLING=true
RUN npm install
COPY . .
CMD ["npm" , "run" , "dev"]

# production stage without dev dependencies
FROM base AS prod
RUN npm install --omit=dev
COPY . .
CMD ["npm" , "start"]