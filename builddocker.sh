#!/usr/bin/env bash
npm run build
cp -R dist/ server/public/
cd server
docker login
docker build -t moonkat/mynewpath .
docker push moonkat/mynewpath
