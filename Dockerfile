FROM node:19.8.1-alpine3.17 as builder
WORKDIR /app
COPY package* ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2
FROM node:19.8.1-alpine3.17
WORKDIR /app
COPY --from=builder /app/package* ./
RUN npm install
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD [ "npm", "start" ]
