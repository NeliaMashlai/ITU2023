#!/bin/sh

docker ps | grep "frontend:latest" | awk '{print $1}' | xargs -r docker stop
docker ps | grep "python run.py" | awk '{print $1}' | xargs -r docker stop
