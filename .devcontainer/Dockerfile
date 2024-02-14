FROM mcr.microsoft.com/devcontainers/universal:2

ENV DEBIAN_FRONTEND=noninteractive
ENV GENERATE_SOURCEMAP=false

RUN apt-get update && apt-get install -y \
    xvfb \
    xsel \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth

WORKDIR /workspace/iTwinUI
