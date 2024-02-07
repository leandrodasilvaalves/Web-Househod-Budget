FROM node:20.11.0-alpine3.19 AS build-env
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY --chown=node:node . .
USER node

RUN npx webpack --mode production

EXPOSE 80
EXPOSE 443

CMD ["node", "src/app.js"]