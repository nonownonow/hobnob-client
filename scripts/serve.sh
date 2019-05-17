#!/usr/bin/env bash
# Set environment variables from .env and set NODE_ENV to test
export NODE_ENV=test
yarn run build
pushstate-server -d dist/ -p $SERVER_PORT_TEST
