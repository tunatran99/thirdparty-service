#!/bin/bash

. ./env/stage.sh
# Publish
docker stack deploy -c swarm.yml --with-registry-auth ${STACK_NAME}