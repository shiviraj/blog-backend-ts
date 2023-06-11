#!/bin/bash
npm install
npm run build
rm -rf node_modules
npm install --production --ignore-scripts --prefer-offline
tag=$(git reflog -1 | cut -d " " -f1)
docker buildx build --platform=linux/arm64,linux/amd64 -t shiviraj/blog-backend:$tag --push .
