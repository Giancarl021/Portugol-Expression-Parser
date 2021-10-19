FROM timbru31/java-node:11-jdk
WORKDIR /usr/app

COPY package*.json .

RUN npm install --only=production

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]