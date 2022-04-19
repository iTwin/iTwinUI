FROM node:16.14.2-bullseye

ENV BACKSTOPJS_VERSION=6.0.4

# from https://packages.debian.org/bullseye/chromium
ENV CHROMIUM_VERSION=99.0.4844.74-1~deb11u1

RUN apt-get update && apt-get install -y git sudo software-properties-common

RUN apt-get -y -f install chromium=${CHROMIUM_VERSION} chromium-common=${CHROMIUM_VERSION}

RUN sudo PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install -g --unsafe-perm=true --allow-root backstopjs@${BACKSTOPJS_VERSION}

RUN apt-get -qqy update \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get -qyy clean

WORKDIR /src

ENTRYPOINT ["backstop"]
