# Utilisation de l'image Node.js officielle
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5003

CMD ["node", "server.js"]
