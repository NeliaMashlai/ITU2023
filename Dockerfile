FROM node:16-alpine as build

WORKDIR /app

COPY . .
EXPOSE 3000

RUN npm install
RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]

