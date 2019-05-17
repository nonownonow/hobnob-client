#!/usr/bin/env bash
for browser in $@; do
  export TEST_BROWSER=$browser
  echo $TEST_BROWSER
done
