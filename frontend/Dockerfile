# base image containing nodejs & package.json files
FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# vite dev stage : env provided during the 
FROM base AS dev 
ENV CHOKIDAR_USEPOLLING=true
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host" , "--mode", "docker"]

# vite build stage : env.production also provided to gel with build 
# vite build picks up only .env.production file during build
FROM base AS build 
RUN npm install
COPY .env.production .env.production
COPY . .
RUN npm run build    

# nginx production stage : serving the vite build files
FROM nginx:alpine AS prod
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]