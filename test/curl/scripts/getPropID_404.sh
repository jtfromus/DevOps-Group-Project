#!/bin/bash
curl --silent -X GET https://localhost:12086/properties/500 --insecure -I > actual.txt
if grep -f ./test/curl/http404.txt actual.txt > /dev/null; then
  #pass
  echo "Pass"
  exit 0
fi
  #fail
  echo "Fail"
  exit 1
