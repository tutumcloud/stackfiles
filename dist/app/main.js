(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _landingLandingModule = require('./landing/landing.module');

var LandingModule = _interopRequireWildcard(_landingLandingModule);

var _sessionSessionModule = require('./session/session.module');

var SessionModule = _interopRequireWildcard(_sessionSessionModule);

var _registryRegistryModule = require('./registry/registry.module');

var RegistryModule = _interopRequireWildcard(_registryRegistryModule);

angular.module('stackfiles', ['ui.router', 'infinite-scroll', 'hc.marked', 'localytics.directives', 'zeroclipboard']).factory('landingFactory', LandingModule.svc).controller('landingController', LandingModule.ctrl).factory('sessionFactory', SessionModule.svc).controller('sessionController', SessionModule.ctrl).factory('registryLoader', RegistryModule.loader).factory('registryFactory', RegistryModule.svc).controller('registryController', RegistryModule.ctrl).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

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
                templateUrl: 'partials/registry.html'
            }
        }
    }).state('404', {
        url: '/404',
        views: {
            full: {
                templateUrl: 'partials/404.html'
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

},{"./landing/landing.module":3,"./registry/registry.module":7,"./session/session.module":10}],2:[function(require,module,exports){
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
      this.$window.location.href = '/auth/github?redirect=' + page;
    }
  }], [{
    key: 'factory',
    value: function factory($window) {
      return new MainService($window);
    }
  }]);

  return MainService;
})();

MainService.factory.$inject = ['$window'];

exports.MainService = MainService;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Loader = (function () {
  function Loader(registryFactory) {
    _classCallCheck(this, Loader);

    this.registryFactory = registryFactory;
    this.items = [];
    this.busy = false;
    this.after = 1;
  }

  _createClass(Loader, [{
    key: 'nextPage',
    value: function nextPage() {
      if (this.busy) return;
      this.busy = true;
      var self = this;

      return this.registryFactory.getFiles(this.after).then(function (files) {
        var list = files;
        if (list.length === 0) {
          self.busy = true;
          return;
        } else {
          for (var i = 0; i < list.length; i++) {
            self.items.push(list[i]);
          }
          self.after = self.after + 1;
          self.busy = false;
        }
      });
    }
  }], [{
    key: 'factory',
    value: function factory(registryFactory) {
      return new Loader(registryFactory);
    }
  }]);

  return Loader;
})();

Loader.$inject = ['registryFactory'];

exports.Loader = Loader;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RegistryController = (function () {
  function RegistryController($scope, $rootScope, $window, registryFactory, registryLoader) {
    _classCallCheck(this, RegistryController);

    this.registryFactory = registryFactory;
    this.registryLoader = registryLoader;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.init();
  }

  _createClass(RegistryController, [{
    key: 'init',
    value: function init() {
      this.files = this.registryLoader;
      this.$scope.loaded = true;
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal() {
      this.$scope.copyText = { status: 'notClicked' };
      this.$scope.showModal = !this.$scope.showModal;
    }
  }, {
    key: 'generateEmbed',
    value: function generateEmbed(id) {
      this.$scope.embedScript = '<script src="' + window.location.protocol + '//' + window.location.hostname + '/embed/file/' + id + '.js"></script>';
    }
  }, {
    key: 'deploy',
    value: function deploy(id) {
      window.location.href = '/api/v1/deploy/' + id;
    }
  }, {
    key: 'searchFile',
    value: function searchFile() {
      var _this = this;

      var term = this.data.search;
      this.registryFactory.searchFile(term).then(function (results) {
        _this.results = results;
      });
    }
  }, {
    key: 'checkSearch',
    value: function checkSearch() {
      var _this2 = this;

      if (this.$window.localStorage.search !== undefined) {
        this.$scope.data = { search: this.$window.localStorage.search };
        this.registryFactory.searchFile(this.$window.localStorage.search).then(function (results) {
          _this2.results = results;
        });
        this.$window.localStorage.clear();
      }
    }
  }]);

  return RegistryController;
})();

RegistryController.$inject = ['$scope', '$rootScope', '$window', 'registryFactory', 'registryLoader'];

exports.RegistryController = RegistryController;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _registryCtrl = require('./registry.ctrl');

var _registrySvc = require('./registry.svc');

var _registryLoader = require('./registry-loader');

var ctrl = _registryCtrl.RegistryController;
var svc = _registrySvc.RegistryService.factory;
var loader = _registryLoader.Loader.factory;

exports.ctrl = ctrl;
exports.svc = svc;
exports.loader = loader;

},{"./registry-loader":5,"./registry.ctrl":6,"./registry.svc":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RegistryService = (function () {
  function RegistryService($http) {
    _classCallCheck(this, RegistryService);

    this.$http = $http;
  }

  _createClass(RegistryService, [{
    key: 'getFiles',
    value: function getFiles(page) {
      return this.$http.get('/api/v1/files/', {
        method: 'GET',
        params: {
          page: page,
          limit: 5
        }
      }).then(function (r) {
        return r.data;
      });
    }
  }, {
    key: 'searchFile',
    value: function searchFile(term) {
      return this.$http.get('/api/v1/search', {
        method: 'GET',
        params: {
          term: term
        }
      }).then(function (r) {
        return r.data;
      });
    }
  }], [{
    key: 'factory',
    value: function factory($http) {
      return new RegistryService($http);
    }
  }]);

  return RegistryService;
})();

RegistryService.factory.$inject = ['$http'];

exports.RegistryService = RegistryService;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionController = (function () {
  function SessionController($scope, $rootScope, $state, $location, $window, sessionFactory) {
    _classCallCheck(this, SessionController);

    this.sessionFactory = sessionFactory;
    this.init();
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$location = $location;
    this.$window = $window;
  }

  _createClass(SessionController, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.sessionFactory.getUser().then(function (data, status, headers, config) {
        _this.$rootScope.logged = true;
        _this.$rootScope.user = data.username;
        _this.$scope.logged = true;
        _this.$scope.user = data.username;
        _this.$scope.photo = data._json.avatar_url;
      });
    }
  }, {
    key: "signin",
    value: function signin(page) {
      this.sessionFactory.signin(page);
    }
  }, {
    key: "logout",
    value: function logout() {
      var _this2 = this;

      this.sessionFactory.logout().then(function (data, status, headers, config) {
        _this2.$state.transitionTo(_this2.$state.current, {}, {
          reload: true,
          inherit: false,
          notify: true
        });
        _this2.$window.location.reload();
      });
    }
  }, {
    key: "getClass",
    value: function getClass(path) {
      if (this.$location.path().substr(0, path.length) == path) {
        return "selected";
      } else {
        return "";
      }
    }
  }]);

  return SessionController;
})();

SessionController.$inject = ['$scope', '$rootScope', '$state', '$location', '$window', 'sessionFactory'];

exports.SessionController = SessionController;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _sessionCtrl = require('./session.ctrl');

var _sessionSvc = require('./session.svc');

var ctrl = _sessionCtrl.SessionController;
var svc = _sessionSvc.SessionService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./session.ctrl":9,"./session.svc":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SessionService = (function () {
  function SessionService($http, $window) {
    _classCallCheck(this, SessionService);

    this.$http = $http;
    this.$window = $window;
  }

  _createClass(SessionService, [{
    key: 'signin',
    value: function signin(page) {
      this.$window.location.href = '/auth/github?redirect=' + page;
    }
  }, {
    key: 'getUser',
    value: function getUser() {
      return this.$http.get('/api/v1/user', {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      return this.$http.get('/auth/logout', {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }], [{
    key: 'factory',
    value: function factory($http, $window) {
      return new SessionService($http, $window);
    }
  }]);

  return SessionService;
})();

SessionService.factory.$inject = ['$http', '$window'];

exports.SessionService = SessionService;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9hcHAuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9sYW5kaW5nL2xhbmRpbmcuY3RybC5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2xhbmRpbmcvbGFuZGluZy5tb2R1bGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9sYW5kaW5nL2xhbmRpbmcuc3ZjLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvcmVnaXN0cnkvcmVnaXN0cnktbG9hZGVyLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvcmVnaXN0cnkvcmVnaXN0cnkuY3RybC5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3JlZ2lzdHJ5L3JlZ2lzdHJ5Lm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3JlZ2lzdHJ5L3JlZ2lzdHJ5LnN2Yy5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3Nlc3Npb24vc2Vzc2lvbi5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3Nlc3Npb24vc2Vzc2lvbi5zdmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O29DQ0ErQiwwQkFBMEI7O0lBQTdDLGFBQWE7O29DQUNNLDBCQUEwQjs7SUFBN0MsYUFBYTs7c0NBQ08sNEJBQTRCOztJQUFoRCxjQUFjOztBQUUxQixPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBQyxpQkFBaUIsRUFBQyxXQUFXLEVBQUMsdUJBQXVCLEVBQUMsZUFBZSxDQUFDLENBQUMsQ0FFaEgsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FDNUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FFbkQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FDNUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FFbkQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FDaEQsT0FBTyxDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FDOUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FFckQsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsVUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUs7O0FBRXJGLHNCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakMsc0JBQWtCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVyQyxrQkFBYyxDQUNaLEtB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QUFDTixhQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtBQUNwQyxjQUFNLEVBQUUsS0FBSztPQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2VBQUksQ0FBQyxDQUFDLElBQUk7T0FBQSxDQUFDLENBQUM7S0FDdEI7OztXQUVhLGlCQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7QUFDNUIsYUFBTyxJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDM0M7OztTQXhCRyxjQUFjOzs7QUE0QnBCLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztRQUU3QyxjQUFjLEdBQWQsY0FBYyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBMYW5kaW5nTW9kdWxlIGZyb20gJy4vbGFuZGluZy9sYW5kaW5nLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyBTZXNzaW9uTW9kdWxlIGZyb20gJy4vc2Vzc2lvbi9zZXNzaW9uLm1vZHVsZSc7XG5pbXBvcnQgKiBhcyBSZWdpc3RyeU1vZHVsZSBmcm9tICcuL3JlZ2lzdHJ5L3JlZ2lzdHJ5Lm1vZHVsZSc7XG5cbmFuZ3VsYXIubW9kdWxlKCdzdGFja2ZpbGVzJywgWyd1aS5yb3V0ZXInLCdpbmZpbml0ZS1zY3JvbGwnLCdoYy5tYXJrZWQnLCdsb2NhbHl0aWNzLmRpcmVjdGl2ZXMnLCd6ZXJvY2xpcGJvYXJkJ10pXG5cbi5mYWN0b3J5KCdsYW5kaW5nRmFjdG9yeScsIExhbmRpbmdNb2R1bGUuc3ZjKVxuLmNvbnRyb2xsZXIoJ2xhbmRpbmdDb250cm9sbGVyJywgTGFuZGluZ01vZHVsZS5jdHJsKVxuXG4uZmFjdG9yeSgnc2Vzc2lvbkZhY3RvcnknLCBTZXNzaW9uTW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdzZXNzaW9uQ29udHJvbGxlcicsIFNlc3Npb25Nb2R1bGUuY3RybClcblxuLmZhY3RvcnkoJ3JlZ2lzdHJ5TG9hZGVyJywgUmVnaXN0cnlNb2R1bGUubG9hZGVyKVxuLmZhY3RvcnkoJ3JlZ2lzdHJ5RmFjdG9yeScsIFJlZ2lzdHJ5TW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdyZWdpc3RyeUNvbnRyb2xsZXInLCBSZWdpc3RyeU1vZHVsZS5jdHJsKVxuXG4uY29uZmlnKFtcIiRzdGF0ZVByb3ZpZGVyXCIsIFwiJHVybFJvdXRlclByb3ZpZGVyXCIsICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIud2hlbignJywgJy8nKTtcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiLzQwNFwiKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyLlxuICAgICAgc3RhdGUoJ2xhbmRpbmcnLCB7XG4gICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgIGZ1bGw6IHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9sYW5kaW5ncGFnZS5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xhbmRpbmdDb250cm9sbGVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH0pLlxuICAgICAgc3RhdGUoJ3JlZ2lzdHJ5Jywge1xuICAgICAgICB1cmw6ICcvcmVnaXN0cnknLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIHRvcDoge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy90b3AtYmFyLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzaWRlOiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3NpZGUtbWVudS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9yZWdpc3RyeS5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkuXG4gICAgICBzdGF0ZSgnNDA0Jywge1xuICAgICAgICB1cmw6Jy80MDQnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIGZ1bGw6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvNDA0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbn1dKVxuXG4uZGlyZWN0aXZlKCduZ0VudGVyJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuYmluZChcImtleWRvd24ga2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZihldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nRW50ZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59KVxuXG4uZGlyZWN0aXZlKCdtb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPicgK1xuICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvYnV0dG9uPicgK1xuICAgICAgICAnPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj57eyB0aXRsZSB9fTwvaDQ+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICByZXBsYWNlOnRydWUsXG4gICAgICAgIHNjb3BlOnRydWUsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHNjb3BlLnRpdGxlID0gYXR0cnMudGl0bGU7XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMudmlzaWJsZSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudFthdHRycy52aXNpYmxlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50W2F0dHJzLnZpc2libGVdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KVxuXG4uZGlyZWN0aXZlKCdhdXRvZm9jdXMnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgbGluayA6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnRbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1dKVxuXG4uZGlyZWN0aXZlKCdmYXYnLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHN2ZyBuZy1jbGljaz1cInRvZ2dsZSgpXCIgbmctY2xhc3M9XCJ7XFwnYnRuLW9mZlxcJzohaXNTZWxlY3RlZCwgXFwnYnRuLW9uXFwnOmlzU2VsZWN0ZWQsfVwiIGNsYXNzPVwic3RhclwiICB3aWR0aD1cIjI0cHhcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCA0OCA0OFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sbnM6c2tldGNoPVwiaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zXCI+JytcbiAgICAgICAgICAgICc8ZyBpZD1cIlN0YWNrZmlsZXMuaW9cIiBzdHJva2U9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHNrZXRjaDp0eXBlPVwiTVNQYWdlXCI+JytcbiAgICAgICAgICAgICAgICAnPGcgaWQ9XCItc3RhclwiIHNrZXRjaDp0eXBlPVwiTVNBcnRib2FyZEdyb3VwXCIgZmlsbD1cIiNmMWYxZjFcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGcgaWQ9XCJzdGFyXCIgc2tldGNoOnR5cGU9XCJNU0xheWVyR3JvdXBcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNC4wMDAwMDAsIDQuMDAwMDAwKVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxwYXRoIGQ9XCJNNDAsMTQuNDggTDI1LjYyLDEzLjI0IEwyMCwwIEwxNC4zOCwxMy4yNiBMMCwxNC40OCBMMTAuOTIsMjMuOTQgTDcuNjQsMzggTDIwLDMwLjU0IEwzMi4zNiwzOCBMMjkuMSwyMy45NCBMNDAsMTQuNDggTDQwLDE0LjQ4IFogTTIwLDI2LjggTDEyLjQ4LDMxLjM0IEwxNC40OCwyMi43OCBMNy44NCwxNy4wMiBMMTYuNiwxNi4yNiBMMjAsOC4yIEwyMy40MiwxNi4yOCBMMzIuMTgsMTcuMDQgTDI1LjU0LDIyLjggTDI3LjU0LDMxLjM2IEwyMCwyNi44IEwyMCwyNi44IFpcIiBpZD1cIlNoYXBlXCIgc2tldGNoOnR5cGU9XCJNU1NoYXBlR3JvdXBcIj48L3BhdGg+JytcbiAgICAgICAgICAgICAgICAgICAgJzwvZz4nK1xuICAgICAgICAgICAgICAgICc8L2c+JyArXG4gICAgICAgICAgICAnPC9nPicgK1xuICAgICAgICAnPC9zdmc+JyxcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGZpZDogJ0AnLFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogJz0nLFxuICAgICAgICAgICAgb25TZWxlY3Q6ICcmJ1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcyl7XG4gICAgICAgICAgICBzY29wZS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNTZWxlY3RlZCA9ICFzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIHNjb3BlLm9uU2VsZWN0KCkoc2NvcGUuZmlkLHNjb3BlLmlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIiwiY2xhc3MgTWFpbkNvbnRyb2xsZXJ7XG4gIGNvbnN0cnVjdG9yKGxhbmRpbmdGYWN0b3J5KSB7XG4gICAgdGhpcy5sYW5kaW5nRmFjdG9yeSA9IGxhbmRpbmdGYWN0b3J5O1xuICB9XG4gIHNpZ25pbihwYWdlKXtcbiAgICB0aGlzLmxhbmRpbmdGYWN0b3J5LnNpZ25pbihwYWdlKTtcbiAgfVxufVxuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWydsYW5kaW5nRmFjdG9yeSddO1xuXG5leHBvcnQgeyBNYWluQ29udHJvbGxlciB9O1xuIiwiaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tICcuL2xhbmRpbmcuY3RybCc7XG5pbXBvcnQgeyBNYWluU2VydmljZSB9IGZyb20gJy4vbGFuZGluZy5zdmMnO1xuXG5sZXQgY3RybCA9IE1haW5Db250cm9sbGVyO1xubGV0IHN2YyA9IE1haW5TZXJ2aWNlLmZhY3Rvcnk7XG5cbmV4cG9ydCB7IGN0cmwgfTtcbmV4cG9ydCB7IHN2YyB9O1xuIiwiY2xhc3MgTWFpblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcigkd2luZG93KXtcbiAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICB9XG5cbiAgc2lnbmluKHBhZ2Upe1xuICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gKCcvYXV0aC9naXRodWI/cmVkaXJlY3Q9JyArIHBhZ2UpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJHdpbmRvdyl7XG4gICAgcmV0dXJuIG5ldyBNYWluU2VydmljZSgkd2luZG93KTtcbiAgfVxufVxuXG5NYWluU2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyR3aW5kb3cnXTtcblxuZXhwb3J0IHsgTWFpblNlcnZpY2UgfTtcbiIsImNsYXNzIExvYWRlciB7XG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJ5RmFjdG9yeSkge1xuICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5ID0gcmVnaXN0cnlGYWN0b3J5O1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICB0aGlzLmFmdGVyID0gMTtcbiAgfVxuXG4gIG5leHRQYWdlKCkge1xuICAgIGlmICh0aGlzLmJ1c3kpIHJldHVybjtcbiAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5RmFjdG9yeS5nZXRGaWxlcyh0aGlzLmFmdGVyKS50aGVuKGZpbGVzID0+IHtcbiAgICAgIHZhciBsaXN0ID0gZmlsZXM7XG4gICAgICBpZihsaXN0Lmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIHNlbGYuYnVzeSA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHNlbGYuaXRlbXMucHVzaChsaXN0W2ldKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmFmdGVyID0gc2VsZi5hZnRlciArIDE7XG4gICAgICAgIHNlbGYuYnVzeSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkocmVnaXN0cnlGYWN0b3J5KXtcbiAgICByZXR1cm4gbmV3IExvYWRlcihyZWdpc3RyeUZhY3RvcnkpO1xuICB9XG59XG5cbkxvYWRlci4kaW5qZWN0ID0gWydyZWdpc3RyeUZhY3RvcnknXTtcblxuZXhwb3J0IHsgTG9hZGVyIH07XG4iLCJjbGFzcyBSZWdpc3RyeUNvbnRyb2xsZXJ7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHJvb3RTY29wZSwgJHdpbmRvdywgcmVnaXN0cnlGYWN0b3J5LCByZWdpc3RyeUxvYWRlcikge1xuICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5ID0gcmVnaXN0cnlGYWN0b3J5O1xuICAgIHRoaXMucmVnaXN0cnlMb2FkZXIgPSByZWdpc3RyeUxvYWRlcjtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZmlsZXMgPSB0aGlzLnJlZ2lzdHJ5TG9hZGVyO1xuICAgIHRoaXMuJHNjb3BlLmxvYWRlZCA9IHRydWU7XG4gIH1cblxuICB0b2dnbGVNb2RhbCgpe1xuICAgIHRoaXMuJHNjb3BlLmNvcHlUZXh0ID0ge3N0YXR1czogJ25vdENsaWNrZWQnfTtcbiAgICB0aGlzLiRzY29wZS5zaG93TW9kYWwgPSAhdGhpcy4kc2NvcGUuc2hvd01vZGFsO1xuICB9XG5cbiAgZ2VuZXJhdGVFbWJlZChpZCl7XG4gICAgdGhpcy4kc2NvcGUuZW1iZWRTY3JpcHQgPSAnPHNjcmlwdCBzcmM9XCInK3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCsnLy8nK3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSsnL2VtYmVkL2ZpbGUvJytpZCsnLmpzXCI+PC9zY3JpcHQ+JztcbiAgfVxuXG4gIGRlcGxveShpZCl7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAoJy9hcGkvdjEvZGVwbG95LycraWQpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSgpe1xuICAgIHZhciB0ZXJtID0gdGhpcy5kYXRhLnNlYXJjaDtcbiAgICB0aGlzLnJlZ2lzdHJ5RmFjdG9yeS5zZWFyY2hGaWxlKHRlcm0pLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tTZWFyY2goKXtcbiAgICBpZih0aGlzLiR3aW5kb3cubG9jYWxTdG9yYWdlLnNlYXJjaCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHRoaXMuJHNjb3BlLmRhdGEgPSB7c2VhcmNoOiB0aGlzLiR3aW5kb3cubG9jYWxTdG9yYWdlLnNlYXJjaH07XG4gICAgICB0aGlzLnJlZ2lzdHJ5RmFjdG9yeS5zZWFyY2hGaWxlKHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2VhcmNoKS50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgfSk7XG4gICAgICB0aGlzLiR3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbn1cblxuUmVnaXN0cnlDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyR3aW5kb3cnLCdyZWdpc3RyeUZhY3RvcnknLCAncmVnaXN0cnlMb2FkZXInXTtcblxuZXhwb3J0IHsgUmVnaXN0cnlDb250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBSZWdpc3RyeUNvbnRyb2xsZXIgfSBmcm9tICcuL3JlZ2lzdHJ5LmN0cmwnO1xuaW1wb3J0IHsgUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi9yZWdpc3RyeS5zdmMnO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnLi9yZWdpc3RyeS1sb2FkZXInO1xuXG5sZXQgY3RybCA9IFJlZ2lzdHJ5Q29udHJvbGxlcjtcbmxldCBzdmMgPSBSZWdpc3RyeVNlcnZpY2UuZmFjdG9yeTtcbmxldCBsb2FkZXIgPSBMb2FkZXIuZmFjdG9yeTtcblxuZXhwb3J0IHsgY3RybCB9O1xuZXhwb3J0IHsgc3ZjIH07XG5leHBvcnQgeyBsb2FkZXIgfTtcbiIsImNsYXNzIFJlZ2lzdHJ5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCRodHRwKXtcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gIH1cblxuICBnZXRGaWxlcyhwYWdlKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvZmlsZXMvJyx7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcGFnZTogcGFnZSxcbiAgICAgICAgICBsaW1pdDogNVxuICAgICAgfVxuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSh0ZXJtKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvc2VhcmNoJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICB0ZXJtOiB0ZXJtXG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzdGF0aWMgZmFjdG9yeSgkaHR0cCl7XG4gICAgcmV0dXJuIG5ldyBSZWdpc3RyeVNlcnZpY2UoJGh0dHApO1xuICB9XG59XG5cblJlZ2lzdHJ5U2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJ107XG5cbmV4cG9ydCB7IFJlZ2lzdHJ5U2VydmljZSB9O1xuIiwiY2xhc3MgU2Vzc2lvbkNvbnRyb2xsZXJ7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHJvb3RTY29wZSwgJHN0YXRlLCAkbG9jYXRpb24sICR3aW5kb3csIHNlc3Npb25GYWN0b3J5KXtcbiAgICB0aGlzLnNlc3Npb25GYWN0b3J5ID0gc2Vzc2lvbkZhY3Rvcnk7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICB0aGlzLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICB9XG5cbiAgaW5pdCgpe1xuICAgIHRoaXMuc2Vzc2lvbkZhY3RvcnkuZ2V0VXNlcigpLnRoZW4oKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSA9PiB7XG4gICAgICB0aGlzLiRyb290U2NvcGUubG9nZ2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuJHJvb3RTY29wZS51c2VyID0gZGF0YS51c2VybmFtZTtcbiAgICAgIHRoaXMuJHNjb3BlLmxvZ2dlZCA9IHRydWU7XG4gICAgICB0aGlzLiRzY29wZS51c2VyID0gZGF0YS51c2VybmFtZTtcbiAgICAgIHRoaXMuJHNjb3BlLnBob3RvID0gZGF0YS5fanNvbi5hdmF0YXJfdXJsO1xuICAgIH0pO1xuICB9XG5cbiAgc2lnbmluKHBhZ2Upe1xuICAgIHRoaXMuc2Vzc2lvbkZhY3Rvcnkuc2lnbmluKHBhZ2UpO1xuICB9XG5cbiAgbG9nb3V0KCl7XG4gICAgdGhpcy5zZXNzaW9uRmFjdG9yeS5sb2dvdXQoKS50aGVuKChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykgPT4ge1xuICAgICAgdGhpcy4kc3RhdGUudHJhbnNpdGlvblRvKHRoaXMuJHN0YXRlLmN1cnJlbnQsIHt9LCB7XG4gICAgICAgICAgcmVsb2FkOiB0cnVlLFxuICAgICAgICAgIGluaGVyaXQ6IGZhbHNlLFxuICAgICAgICAgIG5vdGlmeTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDbGFzcyhwYXRoKXtcbiAgICBpZiAodGhpcy4kbG9jYXRpb24ucGF0aCgpLnN1YnN0cigwLCBwYXRoLmxlbmd0aCkgPT0gcGF0aCkge1xuICAgICAgcmV0dXJuIFwic2VsZWN0ZWRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICB9XG59XG5cblNlc3Npb25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRzdGF0ZScsICckbG9jYXRpb24nLCAnJHdpbmRvdycsICdzZXNzaW9uRmFjdG9yeSddO1xuXG5leHBvcnQgeyBTZXNzaW9uQ29udHJvbGxlciB9O1xuIiwiaW1wb3J0IHsgU2Vzc2lvbkNvbnRyb2xsZXIgfSBmcm9tICcuL3Nlc3Npb24uY3RybCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4vc2Vzc2lvbi5zdmMnO1xuXG5sZXQgY3RybCA9IFNlc3Npb25Db250cm9sbGVyO1xubGV0IHN2YyA9IFNlc3Npb25TZXJ2aWNlLmZhY3Rvcnk7XG5cbmV4cG9ydCB7IGN0cmwgfTtcbmV4cG9ydCB7IHN2YyB9O1xuIiwiY2xhc3MgU2Vzc2lvblNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigkaHR0cCwgJHdpbmRvdyl7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gIH1cblxuICBzaWduaW4ocGFnZSl7XG4gICAgdGhpcy4kd2luZG93LmxvY2F0aW9uLmhyZWYgPSAoJy9hdXRoL2dpdGh1Yj9yZWRpcmVjdD0nICsgcGFnZSk7XG4gIH1cblxuICBnZXRVc2VyKCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL3VzZXInLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBsb2dvdXQoKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hdXRoL2xvZ291dCcsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KCRodHRwLCAkd2luZG93KXtcbiAgICByZXR1cm4gbmV3IFNlc3Npb25TZXJ2aWNlKCRodHRwLCAkd2luZG93KTtcbiAgfVxuXG59XG5cblNlc3Npb25TZXJ2aWNlLmZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnJHdpbmRvdyddO1xuXG5leHBvcnQgeyBTZXNzaW9uU2VydmljZSB9O1xuIl19
