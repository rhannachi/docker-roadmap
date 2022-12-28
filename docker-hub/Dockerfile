FROM node:18.12.1-alpine
RUN apk update && apk add curl
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 80

CMD ["npm", "start"]
