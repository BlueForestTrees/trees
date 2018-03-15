FROM arm32v7/node:latest

WORKDIR /usr/api

COPY package*.json ./

RUN [ "cross-build-start" ]
RUN npm install
RUN [ "cross-build-end" ]

COPY src/main/index.js .
COPY src/ ./src

EXPOSE 8080
ENTRYPOINT ["npm","run","start"]
