#!/bin/sh

docker run --rm --entrypoint /bin/bash -v %cd%:/testing/a11y -w /testing/a11y cypress/included:13.2.0 -c 'cypress run --component'
