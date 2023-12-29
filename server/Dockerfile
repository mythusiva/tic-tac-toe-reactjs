FROM node:20.10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

EXPOSE ${SERVER_PORT}

CMD [ "npm", "run", "server" ]
