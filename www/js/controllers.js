angular.module('registry.controllers', [])

.controller('MainController', function($scope, API){
    $scope.signin = function(){
        API.signin();
    }
})

.controller('RegistryDetailsController', function($scope){
})

.controller('RegistryController', function($scope){
})

.controller('CreateController', function($scope){
})

.controller('LoginController', function($scope){
})
