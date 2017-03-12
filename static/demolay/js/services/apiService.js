angular.module("demolay").factory("dataAPI", function ($http, config, $window){

	var items = [];
    return {
        resolver: function(){
            return $http.get(config.baseUrl + '/demolay/data').then(function(success){
                items = success.data;
            })
            
            /*
             --- Storage Data Android ---

            if(Android.firstAccess() == "true"){
                return $http.get( 'file:///android_asset/www/demolay/data.json').then(function (success){
                    Android.saveData(JSON.stringify(success.data));
                    items = JSON.parse(Android.getData());
                    Android.setAcessFlag();
                });
            }else{
                items = JSON.parse(Android.getData());
                $http.get( config.baseUrl +  '/demolay/data/').then(function (success){
                    Android.saveData(JSON.stringify(success.data));
                });
            } */
        },
        get() {
            return items;
        }
    }
});

