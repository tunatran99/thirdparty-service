#!/bin/bash

. ./env/stage.sh
# Build
docker-compose -f build.yml build
docker login $REGISTRY_HOST -u="$REGISTRY_USERNAME" -p="$REGISTRY_PASSWORD"
docker push $REGISTRY_HOST/$REGISTRY_PUBLISHER/${PROJECT_NAME}:latest