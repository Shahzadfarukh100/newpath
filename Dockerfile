FROM node:alpine
LABEL maintainer="contact@keymetrics.io"

RUN npm install pm2 -g

RUN npm install

RUN mkdir /app

WORKDIR /app

ADD . /app

# Expose ports
EXPOSE 80 443 43554

# Start process.yml
CMD ["pm2-docker", "start", "--env", "production", "process.yml"]
