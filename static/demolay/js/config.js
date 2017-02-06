angular.module("demolay").config(function($routeProvider, $locationProvider, $mdThemingProvider) {
  
  $mdThemingProvider.theme('default')
    .primaryPalette('red', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('red', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });

    
  $routeProvider
   .when('/', {
    templateUrl: '/res/demolay/html/home.html',
    controller: 'Home',
    resolve: {
        demolayData : function(dataAPI){
          return dataAPI.getNoticias();
        }
    }
  })
  .when('/contatos', {
    templateUrl: '/res/demolay/html/contatos.html',
    controller: 'Contatos',
    resolve: {
        contatos : function(dataAPI){
          return dataAPI.getContatos();
        }
    }
  })
  .when('/corpos', {
    templateUrl: '/res/demolay/html/corpos.html',
    controller: 'Corpos',
    resolve: {
        corpos : function(dataAPI){
          return dataAPI.getCorpos();
        }
    }
  })
  .when('/eventos', {
    templateUrl: '/res/demolay/html/eventos.html',
    controller: 'Eventos',
    resolve: {
        eventos : function(dataAPI){
          return dataAPI.getEventos();
        }
    }
  })
  .when('/taxas', {
    templateUrl: '/res/demolay/html/taxas.html',
    controller: 'Taxas',
    resolve: {
        taxas : function(dataAPI){
          return dataAPI.getTaxas();
        }
    }
  });

});