FROM node:12 as bitch

WORKDIR /app

COPY /package.json /app/
COPY /package-lock.json /app/

RUN npm i
RUN npm audit fix
COPY . /app
RUN npm run build

FROM httpd:2.4
COPY --from=bitch /app/dist/ /usr/local/apache2/htdocs/