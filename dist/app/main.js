(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _landingLandingModule = require('./landing/landing.module');

var LandingModule = _interopRequireWildcard(_landingLandingModule);

var _sessionSessionModule = require('./session/session.module');

var SessionModule = _interopRequireWildcard(_sessionSessionModule);

var _favmoduleFavmoduleModuleJs = require('./favmodule/favmodule.module.js');

var FavModule = _interopRequireWildcard(_favmoduleFavmoduleModuleJs);

var _registryRegistryModule = require('./registry/registry.module');

var RegistryModule = _interopRequireWildcard(_registryRegistryModule);

angular.module('stackfiles', ['ui.router', 'infinite-scroll', 'localytics.directives', 'zeroclipboard']).factory('landingFactory', LandingModule.svc).controller('landingController', LandingModule.ctrl).factory('sessionFactory', SessionModule.svc).controller('sessionController', SessionModule.ctrl).factory('favFactory', FavModule.svc).controller('favController', FavModule.ctrl).factory('registryLoader', RegistryModule.loader).factory('registryFactory', RegistryModule.svc).controller('registryController', RegistryModule.ctrl).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

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

},{"./favmodule/favmodule.module.js":3,"./landing/landing.module":6,"./registry/registry.module":10,"./session/session.module":13}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FavController = (function () {
  function FavController($scope, $rootScope, favFactory) {
    _classCallCheck(this, FavController);

    this.favFactory = favFactory;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.init();
    this.$scope.favoriteList = [];
  }

  _createClass(FavController, [{
    key: 'init',
    value: function init() {
      var _this = this;

      if (this.$rootScope.logged) {
        this.$scope.user = this.$rootScope.user;
        this.$scope.logged = this.$rootScope.logged;
        this.favFactory.checkFav().then(function (favorites) {
          _this.$scope.favoriteList = favorites.data;
        });
      }
    }
  }, {
    key: 'increment',
    value: function increment(file) {
      if (this.$rootScope.logged) {
        file.stars = file.stars + 1;
      }
    }
  }, {
    key: 'toggleStatus',
    value: function toggleStatus(file) {
      var _this2 = this;

      this.favFactory.favFile(file._id).then(function () {
        if (_this2.$rootScope.logged) {
          _this2.$scope.favoriteList.push(file._id);
        }
      });
    }
  }, {
    key: 'unToggleStatus',
    value: function unToggleStatus(file) {
      var _this3 = this;

      this.favFactory(file._id).then(function () {
        if (_this3.$scope.logged) {
          var index = _this3.$scope.favoriteList.indexOf(file._id);
          _this3.$scope.favoriteList.splice(index, 1);
        }
      });
    }
  }, {
    key: 'isSelected',
    value: function isSelected(file) {
      return this.$scope.favoriteList.indexOf(file._id) > -1;
    }
  }]);

  return FavController;
})();

FavController.$inject = ['$scope', '$rootScope', 'favFactory'];

exports.FavController = FavController;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _favmoduleCtrl = require('./favmodule.ctrl');

var _favmoduleSvc = require('./favmodule.svc');

var ctrl = _favmoduleCtrl.FavController;
var svc = _favmoduleSvc.FavService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./favmodule.ctrl":2,"./favmodule.svc":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FavService = (function () {
  function FavService($http) {
    _classCallCheck(this, FavService);

    this.$http = $http;
  }

  _createClass(FavService, [{
    key: 'checkFav',
    value: function checkFav() {
      return this.$http.get('/api/v1/user/fav', {
        method: 'GET'
      });
    }
  }, {
    key: 'favFile',
    value: function favFile(id) {
      return this.$http.get('/api/v1/files/fav/' + id, {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }, {
    key: 'unFavFile',
    value: function unFavFile(id) {
      return this.$http.get('/api/v1/files/unfav/' + id, {
        method: 'GET'
      }).then(function (r) {
        return r.data;
      });
    }
  }], [{
    key: 'factory',
    value: function factory($http) {
      return new FavService($http);
    }
  }]);

  return FavService;
})();

FavService.factory.$inject = ['$http'];

exports.FavService = FavService;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"./landing.ctrl":5,"./landing.svc":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"./registry-loader":8,"./registry.ctrl":9,"./registry.svc":11}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"./session.ctrl":12,"./session.svc":14}],14:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9hcHAuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZtb2R1bGUvZmF2bW9kdWxlLmN0cmwuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZtb2R1bGUvZmF2bW9kdWxlLm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2Zhdm1vZHVsZS9mYXZtb2R1bGUuc3ZjLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbGFuZGluZy9sYW5kaW5nLmN0cmwuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9sYW5kaW5nL2xhbmRpbmcubW9kdWxlLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbGFuZGluZy9sYW5kaW5nLnN2Yy5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3JlZ2lzdHJ5L3JlZ2lzdHJ5LWxvYWRlci5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3JlZ2lzdHJ5L3JlZ2lzdHJ5LmN0cmwuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9yZWdpc3RyeS9yZWdpc3RyeS5tb2R1bGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9yZWdpc3RyeS9yZWdpc3RyeS5zdmMuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9zZXNzaW9uL3Nlc3Npb24uY3RybC5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3Nlc3Npb24vc2Vzc2lvbi5tb2R1bGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9zZXNzaW9uL3Nlc3Npb24uc3ZjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztvQ0NBK0IsMEJBQTBCOztJQUE3QyxhQUFhOztvQ0FDTSwwQkFBMEI7O0lBQTdDLGFBQWE7OzBDQUNFLGlDQUFpQzs7SUFBaEQsU0FBUzs7c0NBQ1csNEJBQTRCOztJQUFoRCxjQUFjOztBQUUxQixPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBQyxlQUFlLENBQUMsQ0FBQyxDQUVwRyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUM1QyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUVuRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUM1QyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUVuRCxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxH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QUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2VBQUksQ0FBQyxDQUFDLElBQUk7T0FBQSxDQUFDLENBQUM7S0FDdEI7OztXQUVLLGtCQUFFO0FBQ04sYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7QUFDcEMsY0FBTSxFQUFFLEtBQUs7T0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztlQUFJLENBQUMsQ0FBQyxJQUFJO09BQUEsQ0FBQyxDQUFDO0tBQ3RCOzs7V0FFYSxpQkFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDO0FBQzVCLGFBQU8sSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNDOzs7U0F4QkcsY0FBYzs7O0FBNEJwQixjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzs7UUFFN0MsY0FBYyxHQUFkLGNBQWMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgTGFuZGluZ01vZHVsZSBmcm9tICcuL2xhbmRpbmcvbGFuZGluZy5tb2R1bGUnO1xuaW1wb3J0ICogYXMgU2Vzc2lvbk1vZHVsZSBmcm9tICcuL3Nlc3Npb24vc2Vzc2lvbi5tb2R1bGUnO1xuaW1wb3J0ICogYXMgRmF2TW9kdWxlIGZyb20gJy4vZmF2bW9kdWxlL2Zhdm1vZHVsZS5tb2R1bGUuanMnO1xuaW1wb3J0ICogYXMgUmVnaXN0cnlNb2R1bGUgZnJvbSAnLi9yZWdpc3RyeS9yZWdpc3RyeS5tb2R1bGUnO1xuXG5hbmd1bGFyLm1vZHVsZSgnc3RhY2tmaWxlcycsIFsndWkucm91dGVyJywnaW5maW5pdGUtc2Nyb2xsJywnbG9jYWx5dGljcy5kaXJlY3RpdmVzJywnemVyb2NsaXBib2FyZCddKVxuXG4uZmFjdG9yeSgnbGFuZGluZ0ZhY3RvcnknLCBMYW5kaW5nTW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdsYW5kaW5nQ29udHJvbGxlcicsIExhbmRpbmdNb2R1bGUuY3RybClcblxuLmZhY3RvcnkoJ3Nlc3Npb25GYWN0b3J5JywgU2Vzc2lvbk1vZHVsZS5zdmMpXG4uY29udHJvbGxlcignc2Vzc2lvbkNvbnRyb2xsZXInLCBTZXNzaW9uTW9kdWxlLmN0cmwpXG5cbi5mYWN0b3J5KCdmYXZGYWN0b3J5JywgRmF2TW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdmYXZDb250cm9sbGVyJywgRmF2TW9kdWxlLmN0cmwpXG5cbi5mYWN0b3J5KCdyZWdpc3RyeUxvYWRlcicsIFJlZ2lzdHJ5TW9kdWxlLmxvYWRlcilcbi5mYWN0b3J5KCdyZWdpc3RyeUZhY3RvcnknLCBSZWdpc3RyeU1vZHVsZS5zdmMpXG4uY29udHJvbGxlcigncmVnaXN0cnlDb250cm9sbGVyJywgUmVnaXN0cnlNb2R1bGUuY3RybClcblxuLmNvbmZpZyhbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiLCAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oJycsICcvJyk7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi80MDRcIik7XG5cbiAgICAkc3RhdGVQcm92aWRlci5cbiAgICAgIHN0YXRlKCdsYW5kaW5nJywge1xuICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICBmdWxsOiB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbGFuZGluZ3BhZ2UuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsYW5kaW5nQ29udHJvbGxlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9KS5cbiAgICAgIHN0YXRlKCdyZWdpc3RyeScsIHtcbiAgICAgICAgdXJsOiAnL3JlZ2lzdHJ5JyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICB0b3A6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvdG9wLWJhci5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2lkZToge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9zaWRlLW1lbnUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvcmVnaXN0cnkuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLlxuICAgICAgc3RhdGUoJzQwNCcsIHtcbiAgICAgICAgdXJsOicvNDA0JyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICBmdWxsOiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzLzQwNC5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG59XSlcblxuLmRpcmVjdGl2ZSgnbmdFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBlbGVtZW50LmJpbmQoXCJrZXlkb3duIGtleXByZXNzXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0VudGVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufSlcblxuLmRpcmVjdGl2ZSgnbW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwibW9kYWwgZmFkZVwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj4nICtcbiAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L2J1dHRvbj4nICtcbiAgICAgICAgJzxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+e3sgdGl0bGUgfX08L2g0PicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiIG5nLXRyYW5zY2x1ZGU+PC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgICAgcmVwbGFjZTp0cnVlLFxuICAgICAgICBzY29wZTp0cnVlLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBzY29wZS50aXRsZSA9IGF0dHJzLnRpdGxlO1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLnZpc2libGUsIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5tb2RhbCgnc2hvdycpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5tb2RhbCgnaGlkZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRwYXJlbnRbYXR0cnMudmlzaWJsZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudFthdHRycy52aXNpYmxlXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufSlcblxuLmRpcmVjdGl2ZSgnYXV0b2ZvY3VzJywgWyckdGltZW91dCcsIGZ1bmN0aW9uKCR0aW1lb3V0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIGxpbmsgOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50WzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XSlcblxuLmRpcmVjdGl2ZSgnZmF2JywgZnVuY3Rpb24oKXtcbiAgICByZXR1cm4ge1xuICAgICAgICB0ZW1wbGF0ZTogJzxzdmcgbmctY2xpY2s9XCJ0b2dnbGUoKVwiIG5nLWNsYXNzPVwie1xcJ2J0bi1vZmZcXCc6IWlzU2VsZWN0ZWQsIFxcJ2J0bi1vblxcJzppc1NlbGVjdGVkLH1cIiBjbGFzcz1cInN0YXJcIiAgd2lkdGg9XCIyNHB4XCIgaGVpZ2h0PVwiMjRweFwiIHZpZXdCb3g9XCIwIDAgNDggNDhcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbG5zOnNrZXRjaD1cImh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9uc1wiPicrXG4gICAgICAgICAgICAnPGcgaWQ9XCJTdGFja2ZpbGVzLmlvXCIgc3Ryb2tlPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjFcIiBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBza2V0Y2g6dHlwZT1cIk1TUGFnZVwiPicrXG4gICAgICAgICAgICAgICAgJzxnIGlkPVwiLXN0YXJcIiBza2V0Y2g6dHlwZT1cIk1TQXJ0Ym9hcmRHcm91cFwiIGZpbGw9XCIjZjFmMWYxXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxnIGlkPVwic3RhclwiIHNrZXRjaDp0eXBlPVwiTVNMYXllckdyb3VwXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMClcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8cGF0aCBkPVwiTTQwLDE0LjQ4IEwyNS42MiwxMy4yNCBMMjAsMCBMMTQuMzgsMTMuMjYgTDAsMTQuNDggTDEwLjkyLDIzLjk0IEw3LjY0LDM4IEwyMCwzMC41NCBMMzIuMzYsMzggTDI5LjEsMjMuOTQgTDQwLDE0LjQ4IEw0MCwxNC40OCBaIE0yMCwyNi44IEwxMi40OCwzMS4zNCBMMTQuNDgsMjIuNzggTDcuODQsMTcuMDIgTDE2LjYsMTYuMjYgTDIwLDguMiBMMjMuNDIsMTYuMjggTDMyLjE4LDE3LjA0IEwyNS41NCwyMi44IEwyNy41NCwzMS4zNiBMMjAsMjYuOCBMMjAsMjYuOCBaXCIgaWQ9XCJTaGFwZVwiIHNrZXRjaDp0eXBlPVwiTVNTaGFwZUdyb3VwXCI+PC9wYXRoPicrXG4gICAgICAgICAgICAgICAgICAgICc8L2c+JytcbiAgICAgICAgICAgICAgICAnPC9nPicgK1xuICAgICAgICAgICAgJzwvZz4nICtcbiAgICAgICAgJzwvc3ZnPicsXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBmaWQ6ICdAJyxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6ICc9JyxcbiAgICAgICAgICAgIG9uU2VsZWN0OiAnJidcbiAgICAgICAgfSxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZXMpe1xuICAgICAgICAgICAgc2NvcGUuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgc2NvcGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmlzU2VsZWN0ZWQgPSAhc2NvcGUuaXNTZWxlY3RlZDtcbiAgICAgICAgICAgICAgICBzY29wZS5vblNlbGVjdCgpKHNjb3BlLmZpZCxzY29wZS5pc1NlbGVjdGVkKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfVxuICAgIH07XG59KTtcbiIsImNsYXNzIEZhdkNvbnRyb2xsZXJ7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHJvb3RTY29wZSwgZmF2RmFjdG9yeSl7XG4gICAgdGhpcy5mYXZGYWN0b3J5ID0gZmF2RmFjdG9yeTtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuJHNjb3BlLmZhdm9yaXRlTGlzdCA9IFtdO1xuXG4gIH1cblxuICBpbml0KCl7XG4gICAgaWYodGhpcy4kcm9vdFNjb3BlLmxvZ2dlZCl7XG4gICAgICB0aGlzLiRzY29wZS51c2VyID0gdGhpcy4kcm9vdFNjb3BlLnVzZXI7XG4gICAgICB0aGlzLiRzY29wZS5sb2dnZWQgPSB0aGlzLiRyb290U2NvcGUubG9nZ2VkO1xuICAgICAgdGhpcy5mYXZGYWN0b3J5LmNoZWNrRmF2KCkudGhlbihmYXZvcml0ZXMgPT4ge1xuICAgICAgICB0aGlzLiRzY29wZS5mYXZvcml0ZUxpc3QgPSBmYXZvcml0ZXMuZGF0YTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluY3JlbWVudChmaWxlKXtcbiAgICBpZih0aGlzLiRyb290U2NvcGUubG9nZ2VkKXtcbiAgICAgIGZpbGUuc3RhcnMgPSBmaWxlLnN0YXJzICsgMTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVTdGF0dXMoZmlsZSl7XG4gICAgdGhpcy5mYXZGYWN0b3J5LmZhdkZpbGUoZmlsZS5faWQpLnRoZW4oKCkgPT4ge1xuICAgICAgaWYodGhpcy4kcm9vdFNjb3BlLmxvZ2dlZCl7XG4gICAgICAgIHRoaXMuJHNjb3BlLmZhdm9yaXRlTGlzdC5wdXNoKGZpbGUuX2lkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVuVG9nZ2xlU3RhdHVzKGZpbGUpe1xuICAgIHRoaXMuZmF2RmFjdG9yeShmaWxlLl9pZCkudGhlbigoKSA9PiB7XG4gICAgICBpZih0aGlzLiRzY29wZS5sb2dnZWQpe1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLiRzY29wZS5mYXZvcml0ZUxpc3QuaW5kZXhPZihmaWxlLl9pZCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmZhdm9yaXRlTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaXNTZWxlY3RlZChmaWxlKXtcbiAgICByZXR1cm4gdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0LmluZGV4T2YoZmlsZS5faWQpID4gLTE7XG4gIH1cbn1cblxuRmF2Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICdmYXZGYWN0b3J5J107XG5cbmV4cG9ydCB7IEZhdkNvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IEZhdkNvbnRyb2xsZXIgfSBmcm9tICcuL2Zhdm1vZHVsZS5jdHJsJztcbmltcG9ydCB7IEZhdlNlcnZpY2UgfSBmcm9tICcuL2Zhdm1vZHVsZS5zdmMnO1xuXG5sZXQgY3RybCA9IEZhdkNvbnRyb2xsZXI7XG5sZXQgc3ZjID0gRmF2U2VydmljZS5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbiIsImNsYXNzIEZhdlNlcnZpY2V7XG4gIGNvbnN0cnVjdG9yKCRodHRwKXtcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gIH1cblxuICBjaGVja0Zhdigpe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS91c2VyL2ZhdicsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KTtcbiAgfVxuICBcbiAgZmF2RmlsZShpZCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL2ZpbGVzL2Zhdi8nICsgaWQsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIHVuRmF2RmlsZShpZCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL2ZpbGVzL3VuZmF2LycgKyBpZCwge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJGh0dHApe1xuICAgIHJldHVybiBuZXcgRmF2U2VydmljZSgkaHR0cCk7XG4gIH1cbn1cblxuRmF2U2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJ107XG5cbmV4cG9ydCB7IEZhdlNlcnZpY2UgfTtcbiIsImNsYXNzIE1haW5Db250cm9sbGVye1xuICBjb25zdHJ1Y3RvcihsYW5kaW5nRmFjdG9yeSkge1xuICAgIHRoaXMubGFuZGluZ0ZhY3RvcnkgPSBsYW5kaW5nRmFjdG9yeTtcbiAgfVxuICBzaWduaW4ocGFnZSl7XG4gICAgdGhpcy5sYW5kaW5nRmFjdG9yeS5zaWduaW4ocGFnZSk7XG4gIH1cbn1cblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnbGFuZGluZ0ZhY3RvcnknXTtcblxuZXhwb3J0IHsgTWFpbkNvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IE1haW5Db250cm9sbGVyIH0gZnJvbSAnLi9sYW5kaW5nLmN0cmwnO1xuaW1wb3J0IHsgTWFpblNlcnZpY2UgfSBmcm9tICcuL2xhbmRpbmcuc3ZjJztcblxubGV0IGN0cmwgPSBNYWluQ29udHJvbGxlcjtcbmxldCBzdmMgPSBNYWluU2VydmljZS5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbiIsImNsYXNzIE1haW5TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoJHdpbmRvdyl7XG4gICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgfVxuXG4gIHNpZ25pbihwYWdlKXtcbiAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICgnL2F1dGgvZ2l0aHViP3JlZGlyZWN0PScgKyBwYWdlKTtcbiAgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KCR3aW5kb3cpe1xuICAgIHJldHVybiBuZXcgTWFpblNlcnZpY2UoJHdpbmRvdyk7XG4gIH1cbn1cblxuTWFpblNlcnZpY2UuZmFjdG9yeS4kaW5qZWN0ID0gWyckd2luZG93J107XG5cbmV4cG9ydCB7IE1haW5TZXJ2aWNlIH07XG4iLCJjbGFzcyBMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihyZWdpc3RyeUZhY3RvcnkpIHtcbiAgICB0aGlzLnJlZ2lzdHJ5RmFjdG9yeSA9IHJlZ2lzdHJ5RmFjdG9yeTtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgdGhpcy5hZnRlciA9IDE7XG4gIH1cblxuICBuZXh0UGFnZSgpIHtcbiAgICBpZiAodGhpcy5idXN5KSByZXR1cm47XG4gICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeUZhY3RvcnkuZ2V0RmlsZXModGhpcy5hZnRlcikudGhlbihmaWxlcyA9PiB7XG4gICAgICB2YXIgbGlzdCA9IGZpbGVzO1xuICAgICAgaWYobGlzdC5sZW5ndGggPT09IDApe1xuICAgICAgICBzZWxmLmJ1c3kgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBzZWxmLml0ZW1zLnB1c2gobGlzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5hZnRlciA9IHNlbGYuYWZ0ZXIgKyAxO1xuICAgICAgICBzZWxmLmJ1c3kgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KHJlZ2lzdHJ5RmFjdG9yeSl7XG4gICAgcmV0dXJuIG5ldyBMb2FkZXIocmVnaXN0cnlGYWN0b3J5KTtcbiAgfVxufVxuXG5Mb2FkZXIuJGluamVjdCA9IFsncmVnaXN0cnlGYWN0b3J5J107XG5cbmV4cG9ydCB7IExvYWRlciB9O1xuIiwiY2xhc3MgUmVnaXN0cnlDb250cm9sbGVye1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRyb290U2NvcGUsICR3aW5kb3csIHJlZ2lzdHJ5RmFjdG9yeSwgcmVnaXN0cnlMb2FkZXIpe1xuICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5ID0gcmVnaXN0cnlGYWN0b3J5O1xuICAgIHRoaXMucmVnaXN0cnlMb2FkZXIgPSByZWdpc3RyeUxvYWRlcjtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCl7XG4gICAgdGhpcy5maWxlcyA9IHRoaXMucmVnaXN0cnlMb2FkZXI7XG4gICAgdGhpcy4kc2NvcGUubG9hZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHRvZ2dsZU1vZGFsKCl7XG4gICAgdGhpcy4kc2NvcGUuY29weVRleHQgPSB7c3RhdHVzOiAnbm90Q2xpY2tlZCd9O1xuICAgIHRoaXMuJHNjb3BlLnNob3dNb2RhbCA9ICF0aGlzLiRzY29wZS5zaG93TW9kYWw7XG4gIH1cblxuICBnZW5lcmF0ZUVtYmVkKGlkKXtcbiAgICB0aGlzLiRzY29wZS5lbWJlZFNjcmlwdCA9ICc8c2NyaXB0IHNyYz1cIicrd2luZG93LmxvY2F0aW9uLnByb3RvY29sKycvLycrd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKycvZW1iZWQvZmlsZS8nK2lkKycuanNcIj48L3NjcmlwdD4nO1xuICB9XG5cbiAgZGVwbG95KGlkKXtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICgnL2FwaS92MS9kZXBsb3kvJytpZCk7XG4gIH1cblxuICBzZWFyY2hGaWxlKCl7XG4gICAgdmFyIHRlcm0gPSB0aGlzLmRhdGEuc2VhcmNoO1xuICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5LnNlYXJjaEZpbGUodGVybSkudGhlbihyZXN1bHRzID0+IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NlYXJjaCgpe1xuICAgIGlmKHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2VhcmNoICE9PSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy4kc2NvcGUuZGF0YSA9IHtzZWFyY2g6IHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2VhcmNofTtcbiAgICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5LnNlYXJjaEZpbGUodGhpcy4kd2luZG93LmxvY2FsU3RvcmFnZS5zZWFyY2gpLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxufVxuXG5SZWdpc3RyeUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJHdpbmRvdycsJ3JlZ2lzdHJ5RmFjdG9yeScsICdyZWdpc3RyeUxvYWRlciddO1xuXG5leHBvcnQgeyBSZWdpc3RyeUNvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IFJlZ2lzdHJ5Q29udHJvbGxlciB9IGZyb20gJy4vcmVnaXN0cnkuY3RybCc7XG5pbXBvcnQgeyBSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL3JlZ2lzdHJ5LnN2Yyc7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tICcuL3JlZ2lzdHJ5LWxvYWRlcic7XG5cbmxldCBjdHJsID0gUmVnaXN0cnlDb250cm9sbGVyO1xubGV0IHN2YyA9IFJlZ2lzdHJ5U2VydmljZS5mYWN0b3J5O1xubGV0IGxvYWRlciA9IExvYWRlci5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbmV4cG9ydCB7IGxvYWRlciB9O1xuIiwiY2xhc3MgUmVnaXN0cnlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoJGh0dHApe1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgfVxuXG4gIGdldEZpbGVzKHBhZ2Upe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS9maWxlcy8nLHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgIGxpbWl0OiA1XG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzZWFyY2hGaWxlKHRlcm0pe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS9zZWFyY2gnLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIHRlcm06IHRlcm1cbiAgICAgIH1cbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KCRodHRwKXtcbiAgICByZXR1cm4gbmV3IFJlZ2lzdHJ5U2VydmljZSgkaHR0cCk7XG4gIH1cbn1cblxuUmVnaXN0cnlTZXJ2aWNlLmZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnXTtcblxuZXhwb3J0IHsgUmVnaXN0cnlTZXJ2aWNlIH07XG4iLCJjbGFzcyBTZXNzaW9uQ29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCAkc3RhdGUsICRsb2NhdGlvbiwgJHdpbmRvdywgc2Vzc2lvbkZhY3Rvcnkpe1xuICAgIHRoaXMuc2Vzc2lvbkZhY3RvcnkgPSBzZXNzaW9uRmFjdG9yeTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMuJHN0YXRlID0gJHN0YXRlO1xuICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gIH1cblxuICBpbml0KCl7XG4gICAgdGhpcy5zZXNzaW9uRmFjdG9yeS5nZXRVc2VyKCkudGhlbigoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpID0+IHtcbiAgICAgIHRoaXMuJHJvb3RTY29wZS5sb2dnZWQgPSB0cnVlO1xuICAgICAgdGhpcy4kcm9vdFNjb3BlLnVzZXIgPSBkYXRhLnVzZXJuYW1lO1xuICAgICAgdGhpcy4kc2NvcGUubG9nZ2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuJHNjb3BlLnVzZXIgPSBkYXRhLnVzZXJuYW1lO1xuICAgICAgdGhpcy4kc2NvcGUucGhvdG8gPSBkYXRhLl9qc29uLmF2YXRhcl91cmw7XG4gICAgfSk7XG4gIH1cblxuICBzaWduaW4ocGFnZSl7XG4gICAgdGhpcy5zZXNzaW9uRmFjdG9yeS5zaWduaW4ocGFnZSk7XG4gIH1cblxuICBsb2dvdXQoKXtcbiAgICB0aGlzLnNlc3Npb25GYWN0b3J5LmxvZ291dCgpLnRoZW4oKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSA9PiB7XG4gICAgICB0aGlzLiRzdGF0ZS50cmFuc2l0aW9uVG8odGhpcy4kc3RhdGUuY3VycmVudCwge30sIHtcbiAgICAgICAgICByZWxvYWQ6IHRydWUsXG4gICAgICAgICAgaW5oZXJpdDogZmFsc2UsXG4gICAgICAgICAgbm90aWZ5OiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzKHBhdGgpe1xuICAgIGlmICh0aGlzLiRsb2NhdGlvbi5wYXRoKCkuc3Vic3RyKDAsIHBhdGgubGVuZ3RoKSA9PSBwYXRoKSB7XG4gICAgICByZXR1cm4gXCJzZWxlY3RlZFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gIH1cbn1cblxuU2Vzc2lvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJHN0YXRlJywgJyRsb2NhdGlvbicsICckd2luZG93JywgJ3Nlc3Npb25GYWN0b3J5J107XG5cbmV4cG9ydCB7IFNlc3Npb25Db250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBTZXNzaW9uQ29udHJvbGxlciB9IGZyb20gJy4vc2Vzc2lvbi5jdHJsJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXNzaW9uLnN2Yyc7XG5cbmxldCBjdHJsID0gU2Vzc2lvbkNvbnRyb2xsZXI7XG5sZXQgc3ZjID0gU2Vzc2lvblNlcnZpY2UuZmFjdG9yeTtcblxuZXhwb3J0IHsgY3RybCB9O1xuZXhwb3J0IHsgc3ZjIH07XG4iLCJjbGFzcyBTZXNzaW9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCRodHRwLCAkd2luZG93KXtcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgfVxuXG4gIHNpZ25pbihwYWdlKXtcbiAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICgnL2F1dGgvZ2l0aHViP3JlZGlyZWN0PScgKyBwYWdlKTtcbiAgfVxuXG4gIGdldFVzZXIoKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvdXNlcicsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIGxvZ291dCgpe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2F1dGgvbG9nb3V0Jywge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJGh0dHAsICR3aW5kb3cpe1xuICAgIHJldHVybiBuZXcgU2Vzc2lvblNlcnZpY2UoJGh0dHAsICR3aW5kb3cpO1xuICB9XG5cbn1cblxuU2Vzc2lvblNlcnZpY2UuZmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckd2luZG93J107XG5cbmV4cG9ydCB7IFNlc3Npb25TZXJ2aWNlIH07XG4iXX0=
