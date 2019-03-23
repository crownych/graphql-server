FROM node:lts-alpine

WORKDIR /app

COPY ./dist /app/dist
COPY ./node_modules /app/node_modules


EXPOSE 4001

CMD [ "node", "dist/src/server.js" ]

