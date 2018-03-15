FROM hypriot/rpi-node:latest

WORKDIR /usr/api

COPY package*.json ./
RUN npm install

COPY src/main/index.js .
COPY src/ ./src

EXPOSE 8080
ENTRYPOINT ["npm","run","start"]
