angular.module('registry',['registry.controllers','registry.services','ngRoute','infinite-scroll','hc.marked','localytics.directives','zeroclipboard'])

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})

.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ title }}</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
            link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
                if(value === true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
})

.config(['uiZeroclipConfigProvider', function(uiZeroclipConfigProvider) {

    // config ZeroClipboard
    uiZeroclipConfigProvider.setZcConf({
      swfPath: '../lib/zeroclipboard/dist/ZeroClipboard.swf'
    });
}])

.config(['markedProvider', function(markedProvider) {
      markedProvider.setOptions({gfm: true});
}])

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
      when('/mystacks', {
        templateUrl: 'partials/mystacks.html',
        controller: 'MyStackController'
      }).
      when('/404', {
         templateUrl: 'partials/404.html'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
