FROM node:12
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app
COPY app /usr/src/app
COPY . /usr/src/app
RUN npm install
CMD [ "npm" , "start" ]

