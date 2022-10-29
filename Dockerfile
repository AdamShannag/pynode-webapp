FROM nikolaik/python-nodejs:latest

WORKDIR /home/src/app

# Bundle app source
COPY . .

RUN npm install

EXPOSE 8090
CMD [ "npm", "start" ]