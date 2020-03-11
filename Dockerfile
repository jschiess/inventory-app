FROM node:12
WORKDIR /app
COPY /frontend/dist /app/dist
COPY /API/package.json /app
COPY /API/package-lock.json /app

RUN npm i
COPY /API/database/package.json /app/database/package.json
COPY /API/database/package-lock.json /app/database/package-lock.json

WORKDIR /app/database/
RUN npm i
RUN npm run build

WORKDIR /app
COPY /API/. /app

CMD ["npm","run","start-dev"]
