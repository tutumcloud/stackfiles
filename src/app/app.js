import * as LandingModule from './landing/landing.module';
import * as SessionModule from './session/session.module';
import * as FavModule from './favmodule/favmodule.module';
import * as RegistryModule from './registry/registry.module';
import * as MyStacksModule from './mystacks/mystacks.module';
import * as FavoritesModule from './favorites/favorites.module';
import * as CreateModule from './create/create.module';
import * as DetailModule from './detail/detail.module';

angular.module('stackfiles', ['ui.router','infinite-scroll','localytics.directives','zeroclipboard'])

.factory('landingFactory', LandingModule.svc)
.controller('landingController', LandingModule.ctrl)

.factory('sessionFactory', SessionModule.svc)
.controller('sessionController', SessionModule.ctrl)

.factory('favFactory', FavModule.svc)
.controller('favController', FavModule.ctrl)

.factory('registryLoader', RegistryModule.loader)
.factory('registryFactory', RegistryModule.svc)
.controller('registryController', RegistryModule.ctrl)

.factory('mystacksFactory', MyStacksModule.svc)
.controller('mystacksController', MyStacksModule.ctrl)

.factory('favoritesFactory', FavoritesModule.svc)
.controller('favoritesController', FavoritesModule.ctrl)

.factory('createFactory', CreateModule.svc)
.controller('createController', CreateModule.ctrl)

.factory('detailFactory', DetailModule.svc)
.controller('detailController', DetailModule.ctrl)

.config(["$stateProvider", "$urlRouterProvider", ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise("/404");

    $stateProvider.
      state('landing', {
          url: '/',
          views: {
            full: {
              templateUrl: 'partials/landingpage.html',
              controller: 'landingController'
            }
          }
      }).
      state('registry', {
        url: '/registry',
        cache: false,
        views: {
          top: {
            templateUrl: 'partials/top-bar.html'
          },
          side: {
            templateUrl: 'partials/side-menu.html'
          },
          content: {
            templateUrl: 'partials/registry.html'
          }
        }
      }).
      state('detail', {
        url:'/registry/:id',
        cache: false,
        views: {
          top: {
            templateUrl: 'partials/top-bar.html'
          },
          side: {
            templateUrl: 'partials/side-menu.html'
          },
          content: {
            templateUrl: 'partials/registry.detail.html'
          }
        }
      }).
      state('mystacks', {
        url:'/mystacks',
        cache: false,
        views: {
          top: {
            templateUrl: 'partials/top-bar.html'
          },
          side: {
            templateUrl: 'partials/side-menu.html'
          },
          content: {
            templateUrl: 'partials/mystacks.html',
          }
        }
      }).
      state('favorites', {
        url:'/favorites',
        cache: false,
        views: {
          top: {
            templateUrl: 'partials/top-bar.html'
          },
          side: {
            templateUrl: 'partials/side-menu.html'
          },
          content: {
            templateUrl: 'partials/favorites.html'
          }
        }
      }).
      state('create', {
        url:'/create',
        views: {
          top: {
            templateUrl: 'partials/top-bar.html'
          },
          side: {
            templateUrl: 'partials/side-menu.html'
          },
          content: {
            templateUrl: 'partials/create.html'
          }
        }
      }).
      state('404', {
        url:'/404',
        views: {
          full: {
            templateUrl: 'partials/404.html'
          }
        }
      });
}])

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

.directive('autofocus', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
            link : function($scope, $element) {
                $timeout(function() {
                    $element[0].focus();
            });
        }
    };
}])

.directive('fav', function(){
    return {
        template: '<svg ng-click="toggle()" ng-class="{\'btn-off\':!isSelected, \'btn-on\':isSelected,}" class="star"  width="24px" height="24px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">'+
            '<g id="Stackfiles.io" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">'+
                '<g id="-star" sketch:type="MSArtboardGroup" fill="#f1f1f1">'+
                    '<g id="star" sketch:type="MSLayerGroup" transform="translate(4.000000, 4.000000)">' +
                        '<path d="M40,14.48 L25.62,13.24 L20,0 L14.38,13.26 L0,14.48 L10.92,23.94 L7.64,38 L20,30.54 L32.36,38 L29.1,23.94 L40,14.48 L40,14.48 Z M20,26.8 L12.48,31.34 L14.48,22.78 L7.84,17.02 L16.6,16.26 L20,8.2 L23.42,16.28 L32.18,17.04 L25.54,22.8 L27.54,31.36 L20,26.8 L20,26.8 Z" id="Shape" sketch:type="MSShapeGroup"></path>'+
                    '</g>'+
                '</g>' +
            '</g>' +
        '</svg>',
        restrict: 'E',
        scope: {
            fid: '@',
            isSelected: '=',
            onSelect: '&'
        },
        link: function(scope, element, attributes){
            scope.isSelected = false;
            scope.toggle = function () {
                scope.isSelected = !scope.isSelected;
                scope.onSelect()(scope.fid,scope.isSelected);
            };

        }
    };
});
