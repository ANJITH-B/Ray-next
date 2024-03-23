FROM node:alpine3.16 as first

WORKDIR /appdir


COPY . .

RUN npm install --production

RUN npm install -g pm2

CMD ["pm2-runtime","--name","core","server.js"]
