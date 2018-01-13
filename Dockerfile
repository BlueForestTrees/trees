#FROM arm32v7/node
FROM node:carbon

WORKDIR /usr/api

COPY package*.json ./
RUN npm install

COPY index.js .
COPY src/ ./src

EXPOSE 8080
ENTRYPOINT ["npm","run","start"]
