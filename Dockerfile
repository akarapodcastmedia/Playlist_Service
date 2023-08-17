FROM node:18.16.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
# RUN npm ci --omit=dev
RUN npm install 
COPY . .
# COPY .env ./.env
EXPOSE 9000
CMD ["node","playlist.js"]