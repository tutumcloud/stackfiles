angular.module('registry',['registry.controllers','registry.services','ngRoute'])

.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
          templateUrl: 'partials/main.html'
      }).
      when('/registry', {
        templateUrl: 'partials/registry.html',
        controller: 'RegistryController'
      }).
      when('/registry/:registryId', {
        templateUrl: 'partials/registry-details.html',
        controller: 'RegistryDetailsController'
      }).
      when('/create', {
        templateUrl: 'partials/create.html',
        controller: 'CreateController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
