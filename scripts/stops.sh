#!/bin/sh

docker stop $(docker ps | grep "frontend:latest" | awk '{print $1}')
docker stop $(docker ps | grep "backend:latest" | awk '{print $1}')