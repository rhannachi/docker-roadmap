FROM node:18.12.1-alpine as base
WORKDIR /app
COPY . .
EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development
RUN npm ci
CMD ["npm", "run", "dev"]

#FROM base as production
#ENV NODE_ENV=production
#RUN npm ci --production
#CMD ["npm", "start"]
