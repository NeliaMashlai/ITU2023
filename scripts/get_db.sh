#!/bin/sh

CONTAINER_ID=$(docker ps | grep 'backend:latest' | awk '{print $1}')
echo $(docker ps)
if [ ! -z "$CONTAINER_ID" ]; then
  docker cp "${CONTAINER_ID}":/app/src/database.db ../backend/src/database.db
else
  echo "No running backend:latest container found."
fi
