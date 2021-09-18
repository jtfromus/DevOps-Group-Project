#!/bin/bash
curl --silent -X PUT -H "Content-Type: application/json" -H "api_key: cs4783ftw!" -d '{"address": "123 Address Street", "city": "", "state": "TX", "zip": "75034"}' https://localhost:12086/properties/1 --insecure > actual.txt
if grep -f ./test/curl/putCityError.txt actual.txt > /dev/null; then
	#pass
	echo "Pass"
	exit 0
fi
#fail
echo "Fail"
exit 1
