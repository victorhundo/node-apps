#!/bin/env node
var express = require('express');
var fs      = require('fs');
var path = require('path');
var request = require('sync-request');

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

var demolay = express();

demolay.get('/', function (req, res) {
    res.sendfile('./static/demolay/index.html');
});

demolay.get('/data', function (req, res) {
	var api = {
		contatos: {
			gabinete: _gabinete,
			gce: _gce,
			oficiais: _oficiais
		},
		corpos: {
			capitulos: _capitulos,
			castelos: _castelos,
			cortes: _cortes,
			priorados: _priorados
		},
		eventos: _eventos,
		taxas: _taxas
	}
    res.send(api);
});

module.exports = demolay;

