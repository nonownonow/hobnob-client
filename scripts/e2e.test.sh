#!/bin/bash
export NODE_ENV="test"
yarn run api:init>/dev/null 2>&1 &
yarn run api:build>/dev/null 2>&1 &
yarn run api:serve>/dev/null 2>&1 &
yarn run serve>/dev/null 2>&1

TRIES=0
RETRY_LIMIT=50
RETRY_INTERVAL=0.5
SERVER_UP=false
while [ $TRIES -lt $RETRY_LIMIT ]; do
  if lsof -i -n -P 2>/dev/null | grep "8200 (LISTEN)"; then
    SERVER_UP=true
    break
  else
    sleep $RETRY_INTERVAL
    let TRIES=$TRIES+1
  fi
done
#
if $SERVER_UP; then
  for browser in $@; do
    export TEST_BROWSER=$browser
    echo -e "\n-------------$TEST_BROWSER test start"
    npx dotenv cucumber-js -- spec/cucumber/features --require-module @babel/register --require spec/cucumber/steps
    echo -e "------------$TEST_BROWSER test end\n"
#    wait
  done
fi

kill -15 0
