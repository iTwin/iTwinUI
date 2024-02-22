#!/bin/sh

# `&` is used to run the process in the background
corepack enable pnpm
pnpm exec serve apps/react-workshop/build --listen 6006 -L &
pnpm --filter react-workshop cypress run "$@"
