FROM node:latest AS api-builder

RUN mkdir -p /build
COPY package.json ./build/
COPY src/ ./build/src

WORKDIR /build
RUN npm install
RUN npm run build

FROM arm32v7/node:latest
COPY --from=api-builder /build/dist/* .
COPY --from=api-builder /build/node_modules/* .


EXPOSE 8080
ENTRYPOINT ["npm","run","start"]