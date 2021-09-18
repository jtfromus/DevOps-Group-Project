#!/bin/bash
curl --silent -X DELETE -H "Content-Type: application/json" -H "api_key: cs4783ftw!"  https://localhost:12086/properties/c --insecure -I > actual.txt
if grep -f ./test/curl/http400.txt actual.txt > /dev/null; then
  #pass
  echo "Pass"
  exit 0
fi
  #fail
  echo "Fail"
  exit 1
