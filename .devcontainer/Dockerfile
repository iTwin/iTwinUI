FROM mcr.microsoft.com/devcontainers/universal:2

RUN apt-get update && apt-get install -y \
    xvfb \
    xsel 

WORKDIR /workspace/iTwinUI

RUN yarn install

COPY package.json turbo.json ./

CMD [ "yarn", "build"]

RUN yarn build

