angular.module("demolay").factory("dataAPI", function ($http, config){

	var _getData = function(){
		return $http.get( config.baseUrl + '/demolay/data');
	};

	var _getNoticias = function(){
		return $http.get( '/demolay/data/noticias');
	};

	var _getContatos = function(){
		return $http.get( '/demolay/data/contatos');
	};

	var _getCorpos = function(){
		return $http.get( '/demolay/data/corpos');
	};

	var _getEventos = function(){
		return $http.get( '/demolay/data/eventos');
	};

	var _getTaxas = function(){
		return $http.get( '/demolay/data/taxas');
	};

	return {
		getData: _getData,
		getNoticias: _getNoticias,
		getContatos: _getContatos,
		getCorpos: _getCorpos,
		getEventos: _getEventos,
		getTaxas: _getTaxas
	};
});

