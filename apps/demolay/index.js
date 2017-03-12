#!/bin/env node
var express = require('express');
var fs      = require('fs');
var path = require('path');
var request = require('sync-request');
var http = require('request').defaults({ encoding: null });;
var Find = require('find-key');
require('shelljs/global');

//Json File - http://blog.pamelafox.org/2013/06/exporting-google-spreadsheet-as-json.html
var _capitulos 	= undefined;
var _castelos 	= undefined;
var _cortes 	= undefined;
var _eventos 	= undefined;
var _gabinete 	= undefined;
var _gce 		= undefined;
var _oficiais 	= undefined;
var _priorados 	= undefined;
var _taxas 		= undefined;
var _news 		= undefined;
var _api 		= undefined;
var delayFunction = 300000; //5min
var demolay = express();
var cachePath = "./static/demolay/app.cache";

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
    	noticia.img = ""
    	noticia.link = demolaypb + dm[i]["div"][0].a.href
    	noticia.titulo = dm[i]["div"][1].h4.a.content
    	noticia.conteudo = dm[i]["div"][1].content
    	noticias.push(noticia);
    }

    return noticias;
}

var getJson = function(array, i){
	return new Promise(function(resolve, reject){
		http("http://flash-json.appspot.com/demolaypb", function (error, response, body) {
			var result = JSON.parse(body);
			_capitulos 	= result.corpos.capitulos;
			_castelos	= result.corpos.castelos;
			_cortes		= result.corpos.cortes;
			_priorados	= result.corpos.priorados;
			_eventos	= result.eventos;
			_taxas		= result.taxas;
			_gabinete	= result.contatos.gabinete;
			_gce		= result.contatos.gce;
			_oficiais	= result.contatos.oficiais;
			_news 		= getNews();
			resolve(body);
			getNews();
		});
	});
}

var convertToBase64 = function(array, i){
	return new Promise(function(resolve, reject){
		var options = {
			url: array[i].imgext,
			headers: {
				'Content-Type': 'image/*'
			}
		};
		http(options, function (error, response, body) {
			array[i].img = 'data:image/*' +  ';base64,' + body.toString('base64');
			resolve(body);
		});
	});
}

arrayPromise = function(array){
	promises = [];
	for(i in array)
		for(j in array[i])
			promises.push(convertToBase64(array[i], j));
	return promises;
}

var getApi = function(){
		var api = {
			noticias: _news,
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
	return api;
}

var getData = function(){
	return getApi();
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


console.log("Carregando Json Data...");
var updateDate = function(){
	getJson().then(function(result) {
		//Convert Images to Base64
		Promise.all(arrayPromise([
			_gce,
			_gabinete,
			_oficiais,
			_capitulos,
			_priorados,
			_castelos,
			_cortes,
			_eventos,
			_news
		])).then(([result1]) => {
			console.log("TODOS TERMINARAM");
		})
	});
}
setInterval(updateDate, delayFunction);
updateDate();

module.exports = demolay;
