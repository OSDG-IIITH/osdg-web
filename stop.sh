#!/bin/bash

if [[ $WEBSITE_DIR == "" ]]; then
    WEBSITE_DIR=.
fi

docker-compose -f $WEBSITE_DIR/docker-compose.yml -p web down
