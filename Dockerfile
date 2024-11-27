FROM node:18


WORKDIR /myapp


COPY package*.json ./


RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 8090

USER node

CMD ["npm", "run", "dev"]