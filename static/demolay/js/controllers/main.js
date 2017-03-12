angular.module("demolay").controller("Main", function($scope, $mdSidenav,  $mdDialog, $window, config, dataAPI){

  $scope.appTitle = "DeMolay PB"
  $scope.icons = {
      menu: "reorder"
  }

  $scope.menu = [
    {
      nome: "Home",
      icon: "home",
      href: "#!/home"
    },
    {
      nome: "Contatos",
      icon: "contact_phone",
      href: "#!/contatos"
    },
    {
      nome: "Corpos",
      icon: "bookmark",
      href: "#!/corpos"
    },
    {
      nome: "Eventos",
      icon: "event",
      href: "#!/eventos"
    },
    {
      nome: "Taxas",
      icon: "attach_money",
      href: "#!/taxas"
    },
  ]

  $scope.showTabDialog = function(item, tipo) {
    item.tipo = tipo;
    $mdDialog.item = item;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/res/demolay/html/dialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: item,
      clickOutsideToClose:true
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.item = $mdDialog.item;

  }

  


  $scope.toggleRight = buildToggler('left');
  $scope.isOpenRight = function(){
    return $mdSidenav('left').isOpen();
  };

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID).toggle()
    }
  }

  $scope.delay = function(){
    setTimeout(function(){
      $scope.$apply(); 
    }, 2500);
  }
  
  var flagAccess = $window.location.toString().split('demolay')[1]; //Garantir que o loading só ocorra quando acessa um serviço diferente
  $scope.closeToolbar = function (flag) {
    // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close();   
  };


});