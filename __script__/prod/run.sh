#!/bin/bash

docker compose down --rmi all

docker compose up -d

echo "Finish build and deploy prod"

exit 0