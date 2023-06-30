#!/bin/bash

. ./env/prod.sh
# Publish
docker stack deploy -c swarm.yml --with-registry-auth ${STACK_NAME}