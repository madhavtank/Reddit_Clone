FROM node:18.13.0

COPY package.json .

RUN npm install
# copy the files 
COPY . .
# 
EXPOSE 7000


CMD [ "npm", "start" ]