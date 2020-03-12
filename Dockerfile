FROM node:12
WORKDIR /app

# build fronend
COPY /frontend/package.json /app/frontend/package.json
COPY /frontend/package-lock.json /app/frontend/package-lock.json
WORKDIR /app/frontend
RUN npm i
WORKDIR /app
COPY /frontend /app/frontend/
RUN ls -a
WORKDIR /app/frontend 
RUN npm run build

# COPY /app/frontend/dist /app/dist
RUN mv ./dist /app/dist
# copy file over

WORKDIR /app
COPY /API/package.json /app/
COPY /API/package-lock.json /app/

RUN npm i
COPY /API/database/package.json /app/database/package.json
COPY /API/database/package-lock.json /app/database/package-lock.json
WORKDIR /app/database
RUN npm i

WORKDIR /app
COPY API /app/

RUN ls
RUN npm run build


CMD ["npm","run","start-dev"]
