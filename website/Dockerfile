FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html

COPY . .

RUN rm /etc/nginx/conf.d/default.conf
RUN mv nginx.conf /etc/nginx/conf.d/default.conf
