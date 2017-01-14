'use strict';

const express = require('express');
var fs      = require('fs');
var path = require('path');
var redis = require('redis');
var requestProxy = require('express-request-proxy');
var main = require('./apps/main')
var naoouvo = require('./apps/naoouvo');

const PORT = process.env.PORT || 8080;

const app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

io.on('connection', function(socket){
   	socket.on('naoouvo', function(msg){
		io.emit('chat message', msg);
	});
});

// Seting static files path
app.use('/res',  express.static(__dirname + '/static/'));

//Allow Cross
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// Mouting applications.
app.use('/', main);
app.use('/naoouvo', naoouvo);

// Start the server
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});