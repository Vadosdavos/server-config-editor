FROM node:16-alpine

WORKDIR ./config_editor

COPY package.json ./
RUN npm install
COPY . .

CMD npm run $METHOD