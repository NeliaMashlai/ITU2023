#!/bin/sh

docker cp $(docker ps | grep 'backend:latest' | awk '{print $1}'):app/src/database.db ../backend/src/database.db