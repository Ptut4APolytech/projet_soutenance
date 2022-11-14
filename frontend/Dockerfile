FROM nginx:1.23.2-alpine

WORKDIR /root

COPY . /root

RUN apk add nodejs npm
RUN npm install
RUN npm run build

RUN rm -R /usr/share/nginx/html
RUN mv /root/dist/poly-soutenances /usr/share/nginx/html