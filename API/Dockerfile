FROM node:12
WORKDIR /app

COPY /package.json /app/
COPY /package-lock.json /app/
RUN npm i
COPY . /app/

CMD ["npm","run","start-pro"]