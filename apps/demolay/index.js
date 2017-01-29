#!/bin/env node
var express = require('express');
var fs      = require('fs');
var path = require('path');
var request = require('sync-request');
var Find = require('find-key');

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
var delayFunction = 300000; //5min
var demolay = express();

var getNews = function(){
	if (_news == undefined)
		_news = getWebNews()
	return _news;
}

var getWebNews = function(){
	yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.demolaypb.com.br%2Fnoticias%22&format=json&diagnostics=true&callback="
    var result = request('GET', yql);
	var dm = JSON.parse(result.getBody());
    dm = dm.query.results.body.div[2].div.div[0].div;
    dm.pop();
    noticias = [];
    for (i in dm){
    	demolaypb = "http://www.demolaypb.com.br/"
    	noticia = {}
    	noticia.img = demolaypb + dm[i]["div"][0].a.img.src
    	noticia.link = demolaypb + dm[i]["div"][0].a.href
    	noticia.titulo = dm[i]["div"][1].h4.a.content
    	noticia.conteudo = dm[i]["div"][1].content
    	noticias.push(noticia);
    }

    return noticias;
}
setInterval(getWebNews, delayFunction);

demolay.get('/', function (req, res) {
    res.sendfile('./static/demolay/index.html');
});

demolay.get('/data', function (req, res) {
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
    res.send(api);
});

module.exports = demolay;

