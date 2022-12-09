FROM node:latest

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "src/server.js"]