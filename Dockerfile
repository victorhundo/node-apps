# Dockerfile to build app
FROM node:latest

WORKDIR /workspace
RUN npm install -g bower

EXPOSE 8080
CMD [ "sh", "-c", "npm install --unsafe-perm && npm start" ]
