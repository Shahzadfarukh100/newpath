FROM node:alpine
MAINTAINER Keymetrics <contact@keymetrics.io>

RUN npm install pm2 -g

RUN npm install

COPY . /app

VOLUME ["/app"]

# Expose ports
EXPOSE 80 443 43554

WORKDIR /app

# Start process.yml
CMD ["pm2-docker", "start", "--env", "production", "process.yml"]
