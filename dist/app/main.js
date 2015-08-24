(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _landingLandingModule = require('./landing/landing.module');

var LandingModule = _interopRequireWildcard(_landingLandingModule);

angular.module('stackfiles', ['ui.router']).factory('landingFactory', LandingModule.svc).controller('landingController', LandingModule.ctrl).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise("/404");

    $stateProvider.state('landing', {
        url: '/',
        views: {
            full: {
                templateUrl: 'partials/landingpage.html',
                controller: 'landingController'
            }
        }
    }).state('registry', {
        url: '/registry',
        views: {
            top: {
                templateUrl: 'partials/top-bar.html'
            },
            side: {
                templateUrl: 'partials/side-menu.html'
            },
            content: {
                templateUrl: 'partials/registry.html',
                controller: 'RegistryController'
            }
        }
    });
}]).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
}).directive('modal', function () {
    return {
        template: '<div class="modal fade">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + '<h4 class="modal-title">{{ title }}</h4>' + '</div>' + '<div class="modal-body" ng-transclude></div>' + '</div>' + '</div>' + '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;
            scope.$watch(attrs.visible, function (value) {
                if (value === true) $(element).modal('show');else $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
}).directive('autofocus', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function link($scope, $element) {
            $timeout(function () {
                $element[0].focus();
            });
        }
    };
}]).directive('fav', function () {
    return {
        template: '<svg ng-click="toggle()" ng-class="{\'btn-off\':!isSelected, \'btn-on\':isSelected,}" class="star"  width="24px" height="24px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">' + '<g id="Stackfiles.io" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">' + '<g id="-star" sketch:type="MSArtboardGroup" fill="#f1f1f1">' + '<g id="star" sketch:type="MSLayerGroup" transform="translate(4.000000, 4.000000)">' + '<path d="M40,14.48 L25.62,13.24 L20,0 L14.38,13.26 L0,14.48 L10.92,23.94 L7.64,38 L20,30.54 L32.36,38 L29.1,23.94 L40,14.48 L40,14.48 Z M20,26.8 L12.48,31.34 L14.48,22.78 L7.84,17.02 L16.6,16.26 L20,8.2 L23.42,16.28 L32.18,17.04 L25.54,22.8 L27.54,31.36 L20,26.8 L20,26.8 Z" id="Shape" sketch:type="MSShapeGroup"></path>' + '</g>' + '</g>' + '</g>' + '</svg>',
        restrict: 'E',
        scope: {
            fid: '@',
            isSelected: '=',
            onSelect: '&'
        },
        link: function link(scope, element, attributes) {
            scope.isSelected = false;
            scope.toggle = function () {
                scope.isSelected = !scope.isSelected;
                scope.onSelect()(scope.fid, scope.isSelected);
            };
        }
    };
});

},{"./landing/landing.module":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MainController = (function () {
  function MainController(landingFactory) {
    _classCallCheck(this, MainController);

    this.landingFactory = landingFactory;
  }

  _createClass(MainController, [{
    key: 'signin',
    value: function signin(page) {
      this.landingFactory.signin(page);
    }
  }]);

  return MainController;
})();

MainController.$inject = ['landingFactory'];

exports.MainController = MainController;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _landingCtrl = require('./landing.ctrl');

var _landingSvc = require('./landing.svc');

var ctrl = _landingCtrl.MainController;
var svc = _landingSvc.MainService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./landing.ctrl":2,"./landing.svc":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MainService = (function () {
  function MainService($window) {
    _classCallCheck(this, MainService);

    this.$window = $window;
  }

  _createClass(MainService, [{
    key: 'signin',
    value: function signin(page) {
      return this.$window.location.href = '/auth/github?redirect=' + page;
    }
  }], [{
    key: 'factory',
    value: function factory($window) {
      return new MainService($window);
    }
  }]);

  return MainService;
})();

;

MainService.factory.$inject = ['$window'];

exports.MainService = MainService;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9hcHAuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9sYW5kaW5nL2xhbmRpbmcuY3RybC5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2xhbmRpbmcvbGFuZGluZy5tb2R1bGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9sYW5kaW5nL2xhbmRpbmcuc3ZjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztvQ0NBK0IsMEJBQTBCOztJQUE3QyxhQUFhOztBQUV6QixPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBRTFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQzVDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBRW5ELE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLFVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFLOztBQUVyRixzQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLHNCQUFrQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFckMsa0JBQWMsQ0FDWixLQUFLLENBQUMsU0FBUyxFQUFFO0FBQ2IsV0FBRyxFQUFFLEdBQUc7QUFDUixhQUFLLEVBQUU7QUFDTCxnQkFBSSxFQUFFO0FB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QUVuQyxjQUFjLEdBQWQsY0FBYzs7Ozs7Ozs7OzJCQ1hRLGdCQUFnQjs7MEJBQ25CLGVBQWU7O0FBRTNDLElBQUksSUFBSSw4QkFBaUIsQ0FBQztBQUMxQixJQUFJLEdBQUcsR0FBRyx3QkFBWSxPQUFPLENBQUM7O1FBRXJCLElBQUksR0FBSixJQUFJO1FBQ0osR0FBRyxHQUFILEdBQUc7Ozs7Ozs7Ozs7Ozs7SUNQTixXQUFXO0FBQ0osV0FEUCxXQUFXLENBQ0gsT0FBTyxFQUFDOzBCQURoQixXQUFXOztBQUViLFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0dBQ3hCOztlQUhHLFdBQVc7O1dBS1QsZ0JBQUMsSUFBSSxFQUFDO0FBQ1YsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUksd0JBQXdCLEdBQUcsSUFBSSxBQUFDLENBQUM7S0FDdkU7OztXQUVhLGlCQUFDLE9BQU8sRUFBQztBQUNyQixhQUFPLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pDOzs7U0FYRyxXQUFXOzs7QUFZaEIsQ0FBQzs7QUFFRixXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUVqQyxXQUFXLEdBQVgsV0FBVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBMYW5kaW5nTW9kdWxlIGZyb20gJy4vbGFuZGluZy9sYW5kaW5nLm1vZHVsZSc7XG5cbmFuZ3VsYXIubW9kdWxlKCdzdGFja2ZpbGVzJywgWyd1aS5yb3V0ZXInXSlcblxuLmZhY3RvcnkoJ2xhbmRpbmdGYWN0b3J5JywgTGFuZGluZ01vZHVsZS5zdmMpXG4uY29udHJvbGxlcignbGFuZGluZ0NvbnRyb2xsZXInLCBMYW5kaW5nTW9kdWxlLmN0cmwpXG5cbi5jb25maWcoW1wiJHN0YXRlUHJvdmlkZXJcIiwgXCIkdXJsUm91dGVyUHJvdmlkZXJcIiwgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci53aGVuKCcnLCAnLycpO1xuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvNDA0XCIpO1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuXG4gICAgICBzdGF0ZSgnbGFuZGluZycsIHtcbiAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgZnVsbDoge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2xhbmRpbmdwYWdlLmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbGFuZGluZ0NvbnRyb2xsZXInXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfSkuXG4gICAgICBzdGF0ZSgncmVnaXN0cnknLCB7XG4gICAgICAgIHVybDogJy9yZWdpc3RyeScsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgdG9wOiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3RvcC1iYXIuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNpZGU6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvc2lkZS1tZW51Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3JlZ2lzdHJ5Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdHJ5Q29udHJvbGxlcidcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xufV0pXG5cbi5kaXJlY3RpdmUoJ25nRW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgZWxlbWVudC5iaW5kKFwia2V5ZG93biBrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGV2YWwoYXR0cnMubmdFbnRlcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn0pXG5cbi5kaXJlY3RpdmUoJ21vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cIm1vZGFsIGZhZGVcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+JyArXG4gICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9idXR0b24+JyArXG4gICAgICAgICc8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiPnt7IHRpdGxlIH19PC9oND4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIiBuZy10cmFuc2NsdWRlPjwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgIHJlcGxhY2U6dHJ1ZSxcbiAgICAgICAgc2NvcGU6dHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIHBvc3RMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgc2NvcGUudGl0bGUgPSBhdHRycy50aXRsZTtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy52aXNpYmxlLCBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50W2F0dHJzLnZpc2libGVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRwYXJlbnRbYXR0cnMudmlzaWJsZV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0pXG5cbi5kaXJlY3RpdmUoJ2F1dG9mb2N1cycsIFsnJHRpbWVvdXQnLCBmdW5jdGlvbigkdGltZW91dCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgICAgICBsaW5rIDogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudFswXS5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufV0pXG5cbi5kaXJlY3RpdmUoJ2ZhdicsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8c3ZnIG5nLWNsaWNrPVwidG9nZ2xlKClcIiBuZy1jbGFzcz1cIntcXCdidG4tb2ZmXFwnOiFpc1NlbGVjdGVkLCBcXCdidG4tb25cXCc6aXNTZWxlY3RlZCx9XCIgY2xhc3M9XCJzdGFyXCIgIHdpZHRoPVwiMjRweFwiIGhlaWdodD1cIjI0cHhcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWxuczpza2V0Y2g9XCJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnNcIj4nK1xuICAgICAgICAgICAgJzxnIGlkPVwiU3RhY2tmaWxlcy5pb1wiIHN0cm9rZT1cIm5vbmVcIiBzdHJva2Utd2lkdGg9XCIxXCIgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc2tldGNoOnR5cGU9XCJNU1BhZ2VcIj4nK1xuICAgICAgICAgICAgICAgICc8ZyBpZD1cIi1zdGFyXCIgc2tldGNoOnR5cGU9XCJNU0FydGJvYXJkR3JvdXBcIiBmaWxsPVwiI2YxZjFmMVwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZyBpZD1cInN0YXJcIiBza2V0Y2g6dHlwZT1cIk1TTGF5ZXJHcm91cFwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg0LjAwMDAwMCwgNC4wMDAwMDApXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHBhdGggZD1cIk00MCwxNC40OCBMMjUuNjIsMTMuMjQgTDIwLDAgTDE0LjM4LDEzLjI2IEwwLDE0LjQ4IEwxMC45MiwyMy45NCBMNy42NCwzOCBMMjAsMzAuNTQgTDMyLjM2LDM4IEwyOS4xLDIzLjk0IEw0MCwxNC40OCBMNDAsMTQuNDggWiBNMjAsMjYuOCBMMTIuNDgsMzEuMzQgTDE0LjQ4LDIyLjc4IEw3Ljg0LDE3LjAyIEwxNi42LDE2LjI2IEwyMCw4LjIgTDIzLjQyLDE2LjI4IEwzMi4xOCwxNy4wNCBMMjUuNTQsMjIuOCBMMjcuNTQsMzEuMzYgTDIwLDI2LjggTDIwLDI2LjggWlwiIGlkPVwiU2hhcGVcIiBza2V0Y2g6dHlwZT1cIk1TU2hhcGVHcm91cFwiPjwvcGF0aD4nK1xuICAgICAgICAgICAgICAgICAgICAnPC9nPicrXG4gICAgICAgICAgICAgICAgJzwvZz4nICtcbiAgICAgICAgICAgICc8L2c+JyArXG4gICAgICAgICc8L3N2Zz4nLFxuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgZmlkOiAnQCcsXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiAnPScsXG4gICAgICAgICAgICBvblNlbGVjdDogJyYnXG4gICAgICAgIH0sXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGVzKXtcbiAgICAgICAgICAgIHNjb3BlLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNjb3BlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5pc1NlbGVjdGVkID0gIXNjb3BlLmlzU2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgc2NvcGUub25TZWxlY3QoKShzY29wZS5maWQsc2NvcGUuaXNTZWxlY3RlZCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iLCJjbGFzcyBNYWluQ29udHJvbGxlcntcbiAgY29uc3RydWN0b3IobGFuZGluZ0ZhY3RvcnkpIHtcbiAgICB0aGlzLmxhbmRpbmdGYWN0b3J5ID0gbGFuZGluZ0ZhY3Rvcnk7XG4gIH1cbiAgc2lnbmluKHBhZ2Upe1xuICAgIHRoaXMubGFuZGluZ0ZhY3Rvcnkuc2lnbmluKHBhZ2UpO1xuICB9XG59XG5cbk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJ2xhbmRpbmdGYWN0b3J5J107XG5cbmV4cG9ydCB7IE1haW5Db250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBNYWluQ29udHJvbGxlciB9IGZyb20gJy4vbGFuZGluZy5jdHJsJztcbmltcG9ydCB7IE1haW5TZXJ2aWNlIH0gZnJvbSAnLi9sYW5kaW5nLnN2Yyc7XG5cbmxldCBjdHJsID0gTWFpbkNvbnRyb2xsZXI7XG5sZXQgc3ZjID0gTWFpblNlcnZpY2UuZmFjdG9yeTtcblxuZXhwb3J0IHsgY3RybCB9O1xuZXhwb3J0IHsgc3ZjIH07XG4iLCJjbGFzcyBNYWluU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCR3aW5kb3cpe1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gIH1cblxuICBzaWduaW4ocGFnZSl7XG4gICAgcmV0dXJuIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gKCcvYXV0aC9naXRodWI/cmVkaXJlY3Q9JyArIHBhZ2UpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJHdpbmRvdyl7XG4gICAgcmV0dXJuIG5ldyBNYWluU2VydmljZSgkd2luZG93KTtcbiAgfVxufTtcblxuTWFpblNlcnZpY2UuZmFjdG9yeS4kaW5qZWN0ID0gWyckd2luZG93J107XG5cbmV4cG9ydCB7IE1haW5TZXJ2aWNlIH07XG4iXX0=
