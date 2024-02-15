FROM mcr.microsoft.com/devcontainers/universal:2


ENV GENERATE_SOURCEMAP=false

ARG DEBIAN_FRONTEND=noninteractive
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
