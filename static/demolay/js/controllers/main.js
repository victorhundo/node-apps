angular.module("demolay").controller("Main", function($scope, $http, $timeout, $mdSidenav,  $mdDialog){
  $http.get("/demolay/data")
     .then(function (success){
        $scope.data = success.data;
     },function (error){
        console.log("TA PEGANDO FOGO BIXO!")
     });

  $scope.appTitle = "DeMolay PB"
  $scope.icons = {
      menu: "reorder"
  }

  $scope.menu = [
  	{
  		nome: "Home",
  		icon: "home",
  		href: "#!/"
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


});