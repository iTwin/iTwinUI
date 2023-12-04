#!/bin/sh

# `&` is used to run the process in the background
yarn serve apps/react-workshop/build --listen 6006 -L &
yarn workspace react-workshop cypress run "$@"
