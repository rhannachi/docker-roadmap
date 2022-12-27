FROM node:18.12.1-alpine

RUN apk update && apk add curl

COPY package.json /app/package.json
WORKDIR /app
RUN npm install
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
