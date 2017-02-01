#!/bin/env node
var express = require('express');
var fs      = require('fs');
var path = require('path');
var request = require('sync-request');
var Find = require('find-key');
require('shelljs/global');

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
var cachePath = "./static/demolay/app.cache";

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

demolay.get('/cache', function (req, res) {
	exec("echo  CACHE MANIFEST > " + cachePath, {silent:true}).stdout;
	getCache();
	getCacheImg(_capitulos, "capitulos");
	getCacheImg(_castelos, 'castelos');
	getCacheImg(_cortes, 'cortes');
	getCacheImg(_eventos, 'eventos');
	getCacheImg(_gabinete, 'gabinete');
	getCacheImg(_gce, 'gce');
	getCacheImg(_oficiais, 'oficiais');
	getCacheImg(_priorados, 'priorados');
	getCacheImg(getNews(), 'noticias');
	exec("echo   >> " + cachePath, {silent:true}).stdout;
	exec("echo   NETWORK: >>  " + cachePath, {silent:true}).stdout;
	exec("echo   \\* >>  " + cachePath, {silent:true}).stdout;
    res.send(200);
});


getCache = function(){
	exec("echo   >> " + cachePath, {silent:true}).stdout;
	libs = [
		'/res/lib/angular-material/angular-material.css',
		'https://fonts.googleapis.com/icon?family=Material+Icons',
		'/res/lib/bootstrap/dist/css/bootstrap.css',
		'/res/lib/angular/angular.js',
		'/res/lib/angular-route/angular-route.js',
		'/res/lib/angular-aria/angular-aria.js',
		'/res/lib/angular-animate/angular-animate.js',
		'/res/lib/angular-material/angular-material.js',
		'/res/demolay/js/app.js',
		'/res/demolay/js/config.js',
		'/res/demolay/js/controllers/toolbar.js',
		'/res/demolay/js/controllers/main.js',
		'/res/demolay/js/controllers/home.js',
		'/res/demolay/js/controllers/contatos.js',
		'/res/demolay/js/controllers/corpos.js',
		'/res/demolay/js/controllers/taxas.js',
		'/res/demolay/js/controllers/cache.js'
	]

	html = [
		'/res/demolay/html/cache.html',
		'/res/demolay/html/home.html',
		'/res/demolay/html/toolbar.html',
		'/res/demolay/html/contatos.html',
		'/res/demolay/html/dialog.tmpl.html',
		'/res/demolay/html/sidenav.html',
		'/res/demolay/html/corpos.html',
		'/res/demolay/html/eventos.html',
		'/res/demolay/html/taxas.html',
		'/res/demolay/html/dialog/capitulos.html',
		'/res/demolay/html/dialog/castelos.html',
		'/res/demolay/html/dialog/contatos.html',
		'/res/demolay/html/dialog/cortes.html',
		'/res/demolay/html/dialog/priorados.html',
		'/res/demolay/html/dialog/taxas.html'
	]

	for(i in html)
		exec("echo " + html[i] + " >> " + cachePath, {silent:true}).stdout;
	for(i in libs)
		exec("echo " + libs[i] + " >> "  + cachePath, {silent:true}).stdout;
}
          
getCacheImg = function(array, tipo){
	exec("echo   >> " + cachePath, {silent:true}).stdout;
	exec("echo \\#" + tipo + " >> " + cachePath, {silent:true}).stdout;
	for(i in array){
		if(tipo != 'noticias')
			exec("echo " + array[i].imgext + " >> " + cachePath, {silent:true}).stdout;
		else
			exec("echo " + array[i].img + " >> " + cachePath, {silent:true}).stdout;
	}
}

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

