#!/bin/bash
curl --silent -X GET https://localhost:12086/hello --insecure > actual.txt
if grep -f ./test/curl/hello.txt actual.txt > /dev/null; then
  #pass
  echo "Pass"
  exit 0
fi
  #fail
  echo "Fail"
  exit 1
