#FROM node:19-alpine as builder
#WORKDIR /app
#COPY package* ./
#RUN npm install
#COPY . .
#RUN npm run build

# STAGE 2
FROM node:19-alpine
WORKDIR /app
COPY package* ./
COPY node_modules ./node_modules
COPY dist ./dist
EXPOSE 3001
CMD [ "npm", "start" ]
