# Web apps hosted on Google App Engine

Aplicações web hospedados ou direcionados para [Victor-Sousa](http://victor-sousa.appspot.com/)

## Running locally

`git clone https://github.com/victorhundo/node-apps.git && cd node-apps`

`npm install && npm start`

`Access Local Server - http://localhost:8080`

## Running locally using Docker

`git clone https://github.com/victorhundo/node-apps.git && cd node-apps`

`docker build -t node-apps`

``` 
docker run -d \
--name node-apps \
-p 1915:8080 \
-v $(pwd):/workspace \
node-apps
```

`Access Local Server - http://localhost:1915`

## Running locally using Docker-Compose

`git clone https://github.com/victorhundo/node-apps.git && cd node-apps`

`docker-compose up`

`Access Local Server - http://localhost:1915`

