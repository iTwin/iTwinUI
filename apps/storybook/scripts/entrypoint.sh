#!/bin/sh

# `&` is used to run the process in the background
yarn workspace storybook preview &
yarn workspace storybook cypress run "$@"
