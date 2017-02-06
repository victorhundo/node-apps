#!/bin/env node
var express = require('express');
var fs      = require('fs');
var path = require('path');
var request = require('sync-request');
var http = require('request').defaults({ encoding: null });;
var Find = require('find-key');
require('shelljs/global');
var base64Img = require('base64-img');
var rp = require('request-promise');

//Json File - http://blog.pamelafox.org/2013/06/exporting-google-spreadsheet-as-json.html
var _capitulos = require('./json/capitulos.js');
var _castelos = require('./json/castelos.js');
var _cortes = require('./json/cortes.js');
var _eventos = require('./json/eventos.js');
var _gabinete = require('./json/gabinete.js');
var _gce = require('./json/gce.js');
var _oficiais = require('./json/oficiais.js');
var _priorados = require('./json/priorados.js');
var _taxas = require('./json/taxas.js');
var _news = undefined;
var _api = undefined;
var delayFunction = 300000; //5min
var demolay = express();
var cachePath = "./static/demolay/app.cache";

var httpGet = function(array, i){
	return new Promise(function(resolve, reject){
		http(array[i].imgext, function (error, response, body) {
			array[i].img = 'data:' + response["headers"]["content-type"] + ';base64,' + body.toString('base64');
			resolve(body);
		});
	});
}

arrayPromise = function(array){
	promises = [];
	for(i in array)
		for(j in array[i])
			promises.push(httpGet(array[i], j));
	return promises;
}


var getNews = function(){
	yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.demolaypb.com.br%2Fnoticias%22&format=json&diagnostics=true&callback="
    var result = request('GET', yql);
	var dm = JSON.parse(result.getBody());
    dm = dm.query.results.body.div[2].div.div[0].div;
    dm.pop();
    noticias = [];
    for (i in dm){
    	demolaypb = "http://www.demolaypb.com.br/"
    	noticia = {}
    	noticia.imgext = demolaypb + dm[i]["div"][0].a.img.src
    	noticia.link = demolaypb + dm[i]["div"][0].a.href
    	noticia.titulo = dm[i]["div"][1].h4.a.content
    	noticia.conteudo = dm[i]["div"][1].content
    	noticias.push(noticia);
    }

    return noticias;
}



var getApi = function(){
		var api = {
			noticias: getNews(),
			contatos: {
				gce: _gce,
				gabinete: _gabinete,
				oficiais: _oficiais
			},
			corpos: {
				capitulos: _capitulos,
				priorados: _priorados,
				castelos: _castelos,
				cortes: _cortes
			},
			eventos: _eventos,
			taxas: _taxas
		}
	_api = api;
}

//setInterval(getApi, delayFunction);

var getData = function(){
	if(_api == undefined)
		getApi();
	return _api;
}

demolay.get('/', function (req, res) {
    res.sendfile('./static/demolay/index.html');
});
	
demolay.get('/data', function (req, res) {
	res.send(getData());
});

demolay.get('/data/noticias', function (req, res) {
    res.send(getData().noticias);
});

demolay.get('/data/contatos', function (req, res) {
    res.send(getData().contatos);
});

demolay.get('/data/corpos', function (req, res) {
    res.send(getData().corpos);
});

demolay.get('/data/eventos', function (req, res) {
    res.send(getData().eventos);
});

demolay.get('/data/taxas', function (req, res) {
    res.send(getData().taxas);
});

/*demolay.get('/async', function (req, res) {
	http('https://raw.githubusercontent.com/victorhundo/DeMolayPB-Android/master/app/src/main/assets/img/gce/gm.jpg', function (error, response, body) {
		res.send('<img src="data:' + response["headers"]["content-type"] + ';base64,' + body.toString('base64') + '">');
		//res.send(response);
	});
	
});*/

console.log("Carregando Json Data...");
//getData();

Promise.all(arrayPromise([
	_gce,
	_gabinete,
	_oficiais,
	_capitulos,
	_priorados,
	_castelos,
	_cortes,
	_eventos,
	getNews()
]))
.then(([result1]) => {
    console.log("TODOS TERMINARAM");
})
.catch(err => {
    // Receives first rejection among the Promises
});
module.exports = demolay;
