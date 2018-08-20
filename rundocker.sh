#!/usr/bin/env bash
docker login
docker pull moonkat/mynewpath
docker run -p 80:80 -v `pwd`:/app moonkat/mynewpath &
