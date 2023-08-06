#!/bin/bash

tag=$(curl https://hub.docker.com/v2/repositories/shiviraj/blog-backend/tags | jq -r '.results | sort_by(.last_updated) | last(.[]).name')
echo current tag: $tag
majorTag=$(echo $tag | cut -d '.' -f 1-2 )
minorTag=$(echo $tag | cut -d '.' -f 3)
((minorTag++))

newTag=$(echo $majorTag.$minorTag)
echo new tag: $newTag

npm install && \
npm run build && \
rm -rf node_modules && \
npm install --production --ignore-scripts --prefer-offline && \
docker buildx build --platform=linux/arm64,linux/amd64 -t shiviraj/blog-backend:$newTag --push .
