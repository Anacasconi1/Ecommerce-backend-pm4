FROM node:18

WORKDIR /app

COPY ./ecommerce-anacasconi1/package*.json ./ecommerce-anacasconi1

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]