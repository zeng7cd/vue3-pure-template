FROM nginx:alpine

ARG ppath

COPY . /usr/share/nginx/html/${ppath}/

RUN sed -i "/index\.htm;/a\        try_files \$uri \$uri/ /${ppath}/index.html;" /etc/nginx/conf.d/default.conf

ENV public_path=${ppath}
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;'"]
