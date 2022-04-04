FROM node:16.14.2-bullseye

ARG BACKSTOPJS_VERSION

ENV BACKSTOPJS_VERSION=$BACKSTOPJS_VERSION

RUN apt-get update && apt-get install -y git sudo software-properties-common

RUN apt-get -y install chromium

RUN sudo PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install -g --unsafe-perm=true --allow-root backstopjs@${BACKSTOPJS_VERSION}

RUN apt-get -qqy update \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get -qyy clean

WORKDIR /src

ENTRYPOINT ["backstop"]
