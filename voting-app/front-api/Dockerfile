FROM node:18.12.1-alpine as base
WORKDIR /app
COPY . .
EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development
RUN npm ci
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
CMD ["npm", "run", "dev"]

FROM base as build
RUN npm ci && npm run build

FROM nginx:1.14.0-alpine as production
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build/ /usr/share/nginx/html/
EXPOSE 80
