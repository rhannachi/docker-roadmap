FROM node:16-alpine as build
WORKDIR /app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm i
COPY . ./
RUN npm run build

FROM nginx:1.14.0-alpine
COPY --from=build /app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
