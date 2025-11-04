#!/bin/sh

npx tsc --noEmit --pretty
tsc_exit_code=$?

rm -f tsconfig.tsbuildinfo

exit $tsc_exit_code
