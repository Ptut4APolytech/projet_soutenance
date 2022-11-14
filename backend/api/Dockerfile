FROM node:lts-alpine3.16

WORKDIR /root

COPY . /root

RUN npm install

ENTRYPOINT ["npm", "run", "start"]