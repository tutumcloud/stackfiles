angular.module('registry',['registry.controllers','registry.services','ngRoute','ngTagsInput'])

.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
          templateUrl: 'partials/main.html',
          controller: 'MainController'
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
      when('/mystack', {
        templateUrl: 'partials/mystack.html',
        controller: 'UserController'
      }).
      when('/mystack/:mystackId', {
        templateUrl: 'partials/mystack-details.html',
        controller: 'UserDetailsController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
