#!/bin/bash
for f in ./test/curl/scripts/*.sh; do
    bash "$f"
    TESTRESULT=$?
    if [ $TESTRESULT -eq 1 ]; then
        echo "$f failed"
        exit 1
    else
        echo "$f passed"
    fi
done
echo "ALL CURL TESTS PASSED"
rm actual.txt
exit 0
