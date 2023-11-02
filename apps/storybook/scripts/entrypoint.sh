#!/bin/sh

# `&` is used to run the process in the background
yarn serve apps/storybook/build --listen 6006 -L &
yarn workspace storybook cypress run "$@"
