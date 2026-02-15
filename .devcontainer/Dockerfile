ARG NODE_VERSION=latest

FROM node:${NODE_VERSION}

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y \
    vim \
    tree \
    sudo && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# sudoを実行可能にする
RUN usermod -aG sudo node
RUN echo 'node ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

RUN echo "alias ll='ls -la --color=auto'" >> /home/node/.bashrc

USER node