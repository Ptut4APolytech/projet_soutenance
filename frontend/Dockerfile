FROM nginx:1.23.2-alpine

WORKDIR /root

COPY angular-src /root

RUN apk add nodejs npm
RUN npm install
RUN npm run build

RUN rm -R /usr/share/nginx/html
RUN mv /root/dist/poly-soutenances /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx-config.conf /etc/nginx/conf.d/