#!/bin/sh

# `&` is used to run the process in the background
yarn serve apps/storybook/storybook-static --listen 6006 &
yarn workspace storybook cypress run "$@"
