#!/bin/sh

# `&` is used to run the process in the background
npx serve apps/storybook/storybook-static --listen 6006 -L &
npx cypress run "$@" --workspace=storybook
