#!/bin/bash

cleanup() {
  docker-compose down
}

frontend_image_name=asteroids-frontend
backend_image_name=asteroids-backend

if ! docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "${frontend_image_name}:latest"; then
  docker build --file frontend/frontend.dockerfile -t $frontend_image_name .
fi

if ! docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "${backend_image_name}:latest"; then
  cd backend
  ./mvnw clean package
  cd ..
  docker build --file backend/backend.dockerfile -t $backend_image_name .
fi

docker-compose -f compose.yml up

trap cleanup EXIT

