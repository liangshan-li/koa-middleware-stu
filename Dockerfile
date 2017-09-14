FROM ubuntu:16.04
MAINTAINER liliangshan

# Replace shell with bash so we can source files
RUN cp /etc/apt/sources.list /etc/apt/sources.list.bkcd
COPY deploy/sources_1604.list /etc/apt/sources.list

RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    apt-utils \
    curl \
    git \
    vim \
    python \
    && apt-get autoremove

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash

ENV NVM_NODEJS_ORG_MIRROR="https://npm.taobao.org/dist"

SHELL ["/bin/bash", "-c"]

RUN source ~/.nvm/nvm.sh && nvm install v7.9.0 && npm config set registry https://registry.npm.taobao.org

COPY . /app
WORKDIR /app

RUN  source ~/.nvm/nvm.sh && npm install --registry=https://registry.npm.taobao.org

RUN  source ~/.nvm/nvm.sh && npm start

#CMD ["npm","start"]