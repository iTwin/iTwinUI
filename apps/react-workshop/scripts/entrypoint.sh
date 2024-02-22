#!/bin/sh

# `&` is used to run the process in the background
cd apps/react-workshop &&
npx -y serve build --listen 6006 -L &
npx -y cypress run -- "$@"
