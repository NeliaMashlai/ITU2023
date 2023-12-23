#!/bin/sh

docker ps | grep "frontend:latest" | awk '{print $1}' | xargs -r docker stop
docker ps | grep "backend:latest" | awk '{print $1}' | xargs -r docker stop
