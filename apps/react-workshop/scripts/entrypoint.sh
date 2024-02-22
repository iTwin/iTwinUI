#!/bin/sh

cd apps/react-workshop

# `&` is used to run the process in the background
npx -y serve build --listen 6006 -L &
npx -y cypress run "$@"
