# Project: ITU project - Garage sale website

# @file Dockerfile

# @brief Dockerfile for Garage sale website

# @author Neonila Mashlai - xmashl00

FROM node:16-alpine as build

WORKDIR /app

COPY . .
EXPOSE 3000

RUN npm install
RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]

