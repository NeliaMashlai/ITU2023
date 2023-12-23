#!/bin/sh

CONTAINER_ID=$(docker ps | grep 'python run.py' | awk '{print $1}')
if [ ! -z "$CONTAINER_ID" ]; then
  docker cp "${CONTAINER_ID}":/app/src/database.db ../backend/src/database.db
else
  echo "No running backend:latest container found."
fi
