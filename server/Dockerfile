FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install npm@9.2.0

COPY . .

EXPOSE 8000

CMD ["npm", "start"]