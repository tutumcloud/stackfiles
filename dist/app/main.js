(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _landingLandingModule = require('./landing/landing.module');

var LandingModule = _interopRequireWildcard(_landingLandingModule);

var _sessionSessionModule = require('./session/session.module');

var SessionModule = _interopRequireWildcard(_sessionSessionModule);

var _favmoduleFavmoduleModule = require('./favmodule/favmodule.module');

var FavModule = _interopRequireWildcard(_favmoduleFavmoduleModule);

var _registryRegistryModule = require('./registry/registry.module');

var RegistryModule = _interopRequireWildcard(_registryRegistryModule);

var _mystacksMystacksModule = require('./mystacks/mystacks.module');

var MyStacksModule = _interopRequireWildcard(_mystacksMystacksModule);

angular.module('stackfiles', ['ui.router', 'infinite-scroll', 'localytics.directives', 'zeroclipboard']).factory('landingFactory', LandingModule.svc).controller('landingController', LandingModule.ctrl).factory('sessionFactory', SessionModule.svc).controller('sessionController', SessionModule.ctrl).factory('favFactory', FavModule.svc).controller('favController', FavModule.ctrl).factory('registryLoader', RegistryModule.loader).factory('registryFactory', RegistryModule.svc).controller('registryController', RegistryModule.ctrl).factory('mystacksFactory', MyStacksModule.svc).controller('mystacksController', MyStacksModule.ctrl).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

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
    }).state('mystacks', {
        url: '/mystacks',
        views: {
            top: {
                templateUrl: 'partials/top-bar.html'
            },
            side: {
                templateUrl: 'partials/side-menu.html'
            },
            content: {
                templateUrl: 'partials/mystacks.html'
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

},{"./favmodule/favmodule.module":3,"./landing/landing.module":6,"./mystacks/mystacks.module":9,"./registry/registry.module":13,"./session/session.module":16}],2:[function(require,module,exports){
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

var MyStackController = (function () {
  function MyStackController($scope, mystacksFactory) {
    _classCallCheck(this, MyStackController);

    this.mystacksFactory = mystacksFactory;
    this.$scope = $scope;
    this.init();
  }

  _createClass(MyStackController, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.mystacksFactory.getUserFiles().then(function (data) {
        _this.files = data;
        _this.$scope.loaded = true;
      });
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
    value: function searchFile(term) {
      var _this2 = this;

      var term = this.data.search;
      this.mystacksFactory.searchFile(term).then(function (results) {
        _this2.results = results;
      });
    }
  }]);

  return MyStackController;
})();

MyStackController.$inject = ['$scope', 'mystacksFactory'];

exports.MyStackController = MyStackController;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mystacksCtrl = require('./mystacks.ctrl');

var _mystacksSvc = require('./mystacks.svc');

var ctrl = _mystacksCtrl.MyStackController;
var svc = _mystacksSvc.MyStackService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./mystacks.ctrl":8,"./mystacks.svc":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MyStackService = (function () {
  function MyStackService($http) {
    _classCallCheck(this, MyStackService);

    this.$http = $http;
  }

  _createClass(MyStackService, [{
    key: 'getUserFiles',
    value: function getUserFiles() {
      return this.$http.get('/api/v1/user/files', {
        method: 'GET'
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
      return new MyStackService($http);
    }
  }]);

  return MyStackService;
})();

MyStackService.factory.$inject = ['$http'];

exports.MyStackService = MyStackService;

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"./registry-loader":11,"./registry.ctrl":12,"./registry.svc":14}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./session.ctrl":15,"./session.svc":17}],17:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9hcHAuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZtb2R1bGUvZmF2bW9kdWxlLmN0cmwuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZtb2R1bGUvZmF2bW9kdWxlLm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2Zhdm1vZHVsZS9mYXZtb2R1bGUuc3ZjLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbGFuZGluZy9sYW5kaW5nLmN0cmwuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9sYW5kaW5nL2xhbmRpbmcubW9kdWxlLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbGFuZGluZy9sYW5kaW5nLnN2Yy5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL215c3RhY2tzL215c3RhY2tzLmN0cmwuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9teXN0YWNrcy9teXN0YWNrcy5tb2R1bGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9teXN0YWNrcy9teXN0YWNrcy5zdmMuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9yZWdpc3RyeS9yZWdpc3RyeS1sb2FkZXIuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9yZWdpc3RyeS9yZWdpc3RyeS5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvcmVnaXN0cnkvcmVnaXN0cnkubW9kdWxlLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvcmVnaXN0cnkvcmVnaXN0cnkuc3ZjLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLmN0cmwuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9zZXNzaW9uL3Nlc3Npb24ubW9kdWxlLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLnN2Yy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7b0NDQStCLDBCQUEwQjs7SUFBN0MsYUFBYTs7b0NBQ00sMEJBQTBCOztJQUE3QyxhQUFhOzt3Q0FDRSw4QkFBOEI7O0lBQTdDLFNBQVM7O3NDQUNXLDRCQUE0Qjs7SUFBaEQsY0FBYzs7c0NBQ00sNEJBQTRCOztJQUFoRCxjQUFjOztBQUUxQixPQUFPLENBQUMsTUFB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ZUFBSSxDQUFDLENBQUMsSUFBSTtPQUFBLENBQUMsQ0FBQztLQUN0Qjs7O1dBRWEsaUJBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQztBQUM1QixhQUFPLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMzQzs7O1NBeEJHLGNBQWM7OztBQTRCcEIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7O1FBRTdDLGNBQWMsR0FBZCxjQUFjIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIExhbmRpbmdNb2R1bGUgZnJvbSAnLi9sYW5kaW5nL2xhbmRpbmcubW9kdWxlJztcbmltcG9ydCAqIGFzIFNlc3Npb25Nb2R1bGUgZnJvbSAnLi9zZXNzaW9uL3Nlc3Npb24ubW9kdWxlJztcbmltcG9ydCAqIGFzIEZhdk1vZHVsZSBmcm9tICcuL2Zhdm1vZHVsZS9mYXZtb2R1bGUubW9kdWxlJztcbmltcG9ydCAqIGFzIFJlZ2lzdHJ5TW9kdWxlIGZyb20gJy4vcmVnaXN0cnkvcmVnaXN0cnkubW9kdWxlJztcbmltcG9ydCAqIGFzIE15U3RhY2tzTW9kdWxlIGZyb20gJy4vbXlzdGFja3MvbXlzdGFja3MubW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUoJ3N0YWNrZmlsZXMnLCBbJ3VpLnJvdXRlcicsJ2luZmluaXRlLXNjcm9sbCcsJ2xvY2FseXRpY3MuZGlyZWN0aXZlcycsJ3plcm9jbGlwYm9hcmQnXSlcblxuLmZhY3RvcnkoJ2xhbmRpbmdGYWN0b3J5JywgTGFuZGluZ01vZHVsZS5zdmMpXG4uY29udHJvbGxlcignbGFuZGluZ0NvbnRyb2xsZXInLCBMYW5kaW5nTW9kdWxlLmN0cmwpXG5cbi5mYWN0b3J5KCdzZXNzaW9uRmFjdG9yeScsIFNlc3Npb25Nb2R1bGUuc3ZjKVxuLmNvbnRyb2xsZXIoJ3Nlc3Npb25Db250cm9sbGVyJywgU2Vzc2lvbk1vZHVsZS5jdHJsKVxuXG4uZmFjdG9yeSgnZmF2RmFjdG9yeScsIEZhdk1vZHVsZS5zdmMpXG4uY29udHJvbGxlcignZmF2Q29udHJvbGxlcicsIEZhdk1vZHVsZS5jdHJsKVxuXG4uZmFjdG9yeSgncmVnaXN0cnlMb2FkZXInLCBSZWdpc3RyeU1vZHVsZS5sb2FkZXIpXG4uZmFjdG9yeSgncmVnaXN0cnlGYWN0b3J5JywgUmVnaXN0cnlNb2R1bGUuc3ZjKVxuLmNvbnRyb2xsZXIoJ3JlZ2lzdHJ5Q29udHJvbGxlcicsIFJlZ2lzdHJ5TW9kdWxlLmN0cmwpXG5cbi5mYWN0b3J5KCdteXN0YWNrc0ZhY3RvcnknLCBNeVN0YWNrc01vZHVsZS5zdmMpXG4uY29udHJvbGxlcignbXlzdGFja3NDb250cm9sbGVyJywgTXlTdGFja3NNb2R1bGUuY3RybClcblxuLmNvbmZpZyhbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiLCAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oJycsICcvJyk7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi80MDRcIik7XG5cbiAgICAkc3RhdGVQcm92aWRlci5cbiAgICAgIHN0YXRlKCdsYW5kaW5nJywge1xuICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICBmdWxsOiB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbGFuZGluZ3BhZ2UuaHRtbCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsYW5kaW5nQ29udHJvbGxlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9KS5cbiAgICAgIHN0YXRlKCdyZWdpc3RyeScsIHtcbiAgICAgICAgdXJsOiAnL3JlZ2lzdHJ5JyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICB0b3A6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvdG9wLWJhci5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2lkZToge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9zaWRlLW1lbnUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvcmVnaXN0cnkuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLlxuICAgICAgc3RhdGUoJ215c3RhY2tzJywge1xuICAgICAgICB1cmw6Jy9teXN0YWNrcycsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgdG9wOiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3RvcC1iYXIuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNpZGU6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvc2lkZS1tZW51Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL215c3RhY2tzLmh0bWwnLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkuXG4gICAgICBzdGF0ZSgnNDA0Jywge1xuICAgICAgICB1cmw6Jy80MDQnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIGZ1bGw6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvNDA0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbn1dKVxuXG4uZGlyZWN0aXZlKCduZ0VudGVyJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuYmluZChcImtleWRvd24ga2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZihldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nRW50ZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59KVxuXG4uZGlyZWN0aXZlKCdtb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPicgK1xuICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvYnV0dG9uPicgK1xuICAgICAgICAnPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj57eyB0aXRsZSB9fTwvaDQ+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICByZXBsYWNlOnRydWUsXG4gICAgICAgIHNjb3BlOnRydWUsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHNjb3BlLnRpdGxlID0gYXR0cnMudGl0bGU7XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMudmlzaWJsZSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudFthdHRycy52aXNpYmxlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50W2F0dHJzLnZpc2libGVdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KVxuXG4uZGlyZWN0aXZlKCdhdXRvZm9jdXMnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgbGluayA6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnRbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1dKVxuXG4uZGlyZWN0aXZlKCdmYXYnLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHN2ZyBuZy1jbGljaz1cInRvZ2dsZSgpXCIgbmctY2xhc3M9XCJ7XFwnYnRuLW9mZlxcJzohaXNTZWxlY3RlZCwgXFwnYnRuLW9uXFwnOmlzU2VsZWN0ZWQsfVwiIGNsYXNzPVwic3RhclwiICB3aWR0aD1cIjI0cHhcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCA0OCA0OFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sbnM6c2tldGNoPVwiaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zXCI+JytcbiAgICAgICAgICAgICc8ZyBpZD1cIlN0YWNrZmlsZXMuaW9cIiBzdHJva2U9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHNrZXRjaDp0eXBlPVwiTVNQYWdlXCI+JytcbiAgICAgICAgICAgICAgICAnPGcgaWQ9XCItc3RhclwiIHNrZXRjaDp0eXBlPVwiTVNBcnRib2FyZEdyb3VwXCIgZmlsbD1cIiNmMWYxZjFcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGcgaWQ9XCJzdGFyXCIgc2tldGNoOnR5cGU9XCJNU0xheWVyR3JvdXBcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNC4wMDAwMDAsIDQuMDAwMDAwKVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxwYXRoIGQ9XCJNNDAsMTQuNDggTDI1LjYyLDEzLjI0IEwyMCwwIEwxNC4zOCwxMy4yNiBMMCwxNC40OCBMMTAuOTIsMjMuOTQgTDcuNjQsMzggTDIwLDMwLjU0IEwzMi4zNiwzOCBMMjkuMSwyMy45NCBMNDAsMTQuNDggTDQwLDE0LjQ4IFogTTIwLDI2LjggTDEyLjQ4LDMxLjM0IEwxNC40OCwyMi43OCBMNy44NCwxNy4wMiBMMTYuNiwxNi4yNiBMMjAsOC4yIEwyMy40MiwxNi4yOCBMMzIuMTgsMTcuMDQgTDI1LjU0LDIyLjggTDI3LjU0LDMxLjM2IEwyMCwyNi44IEwyMCwyNi44IFpcIiBpZD1cIlNoYXBlXCIgc2tldGNoOnR5cGU9XCJNU1NoYXBlR3JvdXBcIj48L3BhdGg+JytcbiAgICAgICAgICAgICAgICAgICAgJzwvZz4nK1xuICAgICAgICAgICAgICAgICc8L2c+JyArXG4gICAgICAgICAgICAnPC9nPicgK1xuICAgICAgICAnPC9zdmc+JyxcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGZpZDogJ0AnLFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogJz0nLFxuICAgICAgICAgICAgb25TZWxlY3Q6ICcmJ1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcyl7XG4gICAgICAgICAgICBzY29wZS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNTZWxlY3RlZCA9ICFzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIHNjb3BlLm9uU2VsZWN0KCkoc2NvcGUuZmlkLHNjb3BlLmlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIiwiY2xhc3MgRmF2Q29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCBmYXZGYWN0b3J5KXtcbiAgICB0aGlzLmZhdkZhY3RvcnkgPSBmYXZGYWN0b3J5O1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0ID0gW107XG5cbiAgfVxuXG4gIGluaXQoKXtcbiAgICBpZih0aGlzLiRyb290U2NvcGUubG9nZ2VkKXtcbiAgICAgIHRoaXMuJHNjb3BlLnVzZXIgPSB0aGlzLiRyb290U2NvcGUudXNlcjtcbiAgICAgIHRoaXMuJHNjb3BlLmxvZ2dlZCA9IHRoaXMuJHJvb3RTY29wZS5sb2dnZWQ7XG4gICAgICB0aGlzLmZhdkZhY3RvcnkuY2hlY2tGYXYoKS50aGVuKGZhdm9yaXRlcyA9PiB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmZhdm9yaXRlTGlzdCA9IGZhdm9yaXRlcy5kYXRhO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5jcmVtZW50KGZpbGUpe1xuICAgIGlmKHRoaXMuJHJvb3RTY29wZS5sb2dnZWQpe1xuICAgICAgZmlsZS5zdGFycyA9IGZpbGUuc3RhcnMgKyAxO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVN0YXR1cyhmaWxlKXtcbiAgICB0aGlzLmZhdkZhY3RvcnkuZmF2RmlsZShmaWxlLl9pZCkudGhlbigoKSA9PiB7XG4gICAgICBpZih0aGlzLiRyb290U2NvcGUubG9nZ2VkKXtcbiAgICAgICAgdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0LnB1c2goZmlsZS5faWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdW5Ub2dnbGVTdGF0dXMoZmlsZSl7XG4gICAgdGhpcy5mYXZGYWN0b3J5KGZpbGUuX2lkKS50aGVuKCgpID0+IHtcbiAgICAgIGlmKHRoaXMuJHNjb3BlLmxvZ2dlZCl7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuJHNjb3BlLmZhdm9yaXRlTGlzdC5pbmRleE9mKGZpbGUuX2lkKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpc1NlbGVjdGVkKGZpbGUpe1xuICAgIHJldHVybiB0aGlzLiRzY29wZS5mYXZvcml0ZUxpc3QuaW5kZXhPZihmaWxlLl9pZCkgPiAtMTtcbiAgfVxufVxuXG5GYXZDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJ2ZhdkZhY3RvcnknXTtcblxuZXhwb3J0IHsgRmF2Q29udHJvbGxlciB9O1xuIiwiaW1wb3J0IHsgRmF2Q29udHJvbGxlciB9IGZyb20gJy4vZmF2bW9kdWxlLmN0cmwnO1xuaW1wb3J0IHsgRmF2U2VydmljZSB9IGZyb20gJy4vZmF2bW9kdWxlLnN2Yyc7XG5cbmxldCBjdHJsID0gRmF2Q29udHJvbGxlcjtcbmxldCBzdmMgPSBGYXZTZXJ2aWNlLmZhY3Rvcnk7XG5cbmV4cG9ydCB7IGN0cmwgfTtcbmV4cG9ydCB7IHN2YyB9O1xuIiwiY2xhc3MgRmF2U2VydmljZXtcbiAgY29uc3RydWN0b3IoJGh0dHApe1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgfVxuXG4gIGNoZWNrRmF2KCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL3VzZXIvZmF2Jywge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pO1xuICB9XG4gIFxuICBmYXZGaWxlKGlkKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvZmlsZXMvZmF2LycgKyBpZCwge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgdW5GYXZGaWxlKGlkKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvZmlsZXMvdW5mYXYvJyArIGlkLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzdGF0aWMgZmFjdG9yeSgkaHR0cCl7XG4gICAgcmV0dXJuIG5ldyBGYXZTZXJ2aWNlKCRodHRwKTtcbiAgfVxufVxuXG5GYXZTZXJ2aWNlLmZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnXTtcblxuZXhwb3J0IHsgRmF2U2VydmljZSB9O1xuIiwiY2xhc3MgTWFpbkNvbnRyb2xsZXJ7XG4gIGNvbnN0cnVjdG9yKGxhbmRpbmdGYWN0b3J5KSB7XG4gICAgdGhpcy5sYW5kaW5nRmFjdG9yeSA9IGxhbmRpbmdGYWN0b3J5O1xuICB9XG4gIHNpZ25pbihwYWdlKXtcbiAgICB0aGlzLmxhbmRpbmdGYWN0b3J5LnNpZ25pbihwYWdlKTtcbiAgfVxufVxuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWydsYW5kaW5nRmFjdG9yeSddO1xuXG5leHBvcnQgeyBNYWluQ29udHJvbGxlciB9O1xuIiwiaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tICcuL2xhbmRpbmcuY3RybCc7XG5pbXBvcnQgeyBNYWluU2VydmljZSB9IGZyb20gJy4vbGFuZGluZy5zdmMnO1xuXG5sZXQgY3RybCA9IE1haW5Db250cm9sbGVyO1xubGV0IHN2YyA9IE1haW5TZXJ2aWNlLmZhY3Rvcnk7XG5cbmV4cG9ydCB7IGN0cmwgfTtcbmV4cG9ydCB7IHN2YyB9O1xuIiwiY2xhc3MgTWFpblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcigkd2luZG93KXtcbiAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICB9XG5cbiAgc2lnbmluKHBhZ2Upe1xuICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gKCcvYXV0aC9naXRodWI/cmVkaXJlY3Q9JyArIHBhZ2UpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJHdpbmRvdyl7XG4gICAgcmV0dXJuIG5ldyBNYWluU2VydmljZSgkd2luZG93KTtcbiAgfVxufVxuXG5NYWluU2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyR3aW5kb3cnXTtcblxuZXhwb3J0IHsgTWFpblNlcnZpY2UgfTtcbiIsImNsYXNzIE15U3RhY2tDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCBteXN0YWNrc0ZhY3Rvcnkpe1xuICAgIHRoaXMubXlzdGFja3NGYWN0b3J5ID0gbXlzdGFja3NGYWN0b3J5O1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpe1xuICAgIHRoaXMubXlzdGFja3NGYWN0b3J5LmdldFVzZXJGaWxlcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICB0aGlzLmZpbGVzID0gZGF0YTtcbiAgICAgIHRoaXMuJHNjb3BlLmxvYWRlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVNb2RhbCgpe1xuICAgIHRoaXMuJHNjb3BlLmNvcHlUZXh0ID0ge3N0YXR1czogJ25vdENsaWNrZWQnfTtcbiAgICB0aGlzLiRzY29wZS5zaG93TW9kYWwgPSAhdGhpcy4kc2NvcGUuc2hvd01vZGFsO1xuICB9XG5cbiAgZ2VuZXJhdGVFbWJlZChpZCl7XG4gICAgdGhpcy4kc2NvcGUuZW1iZWRTY3JpcHQgPSAnPHNjcmlwdCBzcmM9XCInK3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCsnLy8nK3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSsnL2VtYmVkL2ZpbGUvJytpZCsnLmpzXCI+PC9zY3JpcHQ+JztcbiAgfVxuXG4gIGRlcGxveShpZCl7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAoJy9hcGkvdjEvZGVwbG95LycraWQpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSh0ZXJtKXtcbiAgICB2YXIgdGVybSA9IHRoaXMuZGF0YS5zZWFyY2g7XG4gICAgdGhpcy5teXN0YWNrc0ZhY3Rvcnkuc2VhcmNoRmlsZSh0ZXJtKS50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cztcbiAgICB9KTtcbiAgfVxufVxuXG5NeVN0YWNrQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnbXlzdGFja3NGYWN0b3J5J107XG5cbmV4cG9ydCB7IE15U3RhY2tDb250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBNeVN0YWNrQ29udHJvbGxlciB9IGZyb20gJy4vbXlzdGFja3MuY3RybCc7XG5pbXBvcnQgeyBNeVN0YWNrU2VydmljZSB9IGZyb20gJy4vbXlzdGFja3Muc3ZjJztcblxubGV0IGN0cmwgPSBNeVN0YWNrQ29udHJvbGxlcjtcbmxldCBzdmMgPSBNeVN0YWNrU2VydmljZS5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbiIsImNsYXNzIE15U3RhY2tTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoJGh0dHApe1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgfVxuXG4gIGdldFVzZXJGaWxlcygpe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS91c2VyL2ZpbGVzJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIHNlYXJjaEZpbGUodGVybSl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL3NlYXJjaCcsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgdGVybTogdGVybVxuICAgICAgfVxuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJGh0dHApe1xuICAgIHJldHVybiBuZXcgTXlTdGFja1NlcnZpY2UoJGh0dHApO1xuICB9XG5cbn1cblxuTXlTdGFja1NlcnZpY2UuZmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCddO1xuXG5leHBvcnQgeyBNeVN0YWNrU2VydmljZSB9O1xuIiwiY2xhc3MgTG9hZGVyIHtcbiAgY29uc3RydWN0b3IocmVnaXN0cnlGYWN0b3J5KSB7XG4gICAgdGhpcy5yZWdpc3RyeUZhY3RvcnkgPSByZWdpc3RyeUZhY3Rvcnk7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgIHRoaXMuYWZ0ZXIgPSAxO1xuICB9XG5cbiAgbmV4dFBhZ2UoKSB7XG4gICAgaWYgKHRoaXMuYnVzeSkgcmV0dXJuO1xuICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnlGYWN0b3J5LmdldEZpbGVzKHRoaXMuYWZ0ZXIpLnRoZW4oZmlsZXMgPT4ge1xuICAgICAgdmFyIGxpc3QgPSBmaWxlcztcbiAgICAgIGlmKGxpc3QubGVuZ3RoID09PSAwKXtcbiAgICAgICAgc2VsZi5idXN5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgc2VsZi5pdGVtcy5wdXNoKGxpc3RbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuYWZ0ZXIgPSBzZWxmLmFmdGVyICsgMTtcbiAgICAgICAgc2VsZi5idXN5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZmFjdG9yeShyZWdpc3RyeUZhY3Rvcnkpe1xuICAgIHJldHVybiBuZXcgTG9hZGVyKHJlZ2lzdHJ5RmFjdG9yeSk7XG4gIH1cbn1cblxuTG9hZGVyLiRpbmplY3QgPSBbJ3JlZ2lzdHJ5RmFjdG9yeSddO1xuXG5leHBvcnQgeyBMb2FkZXIgfTtcbiIsImNsYXNzIFJlZ2lzdHJ5Q29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCAkd2luZG93LCByZWdpc3RyeUZhY3RvcnksIHJlZ2lzdHJ5TG9hZGVyKXtcbiAgICB0aGlzLnJlZ2lzdHJ5RmFjdG9yeSA9IHJlZ2lzdHJ5RmFjdG9yeTtcbiAgICB0aGlzLnJlZ2lzdHJ5TG9hZGVyID0gcmVnaXN0cnlMb2FkZXI7XG4gICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpe1xuICAgIHRoaXMuZmlsZXMgPSB0aGlzLnJlZ2lzdHJ5TG9hZGVyO1xuICAgIHRoaXMuJHNjb3BlLmxvYWRlZCA9IHRydWU7XG4gIH1cblxuICB0b2dnbGVNb2RhbCgpe1xuICAgIHRoaXMuJHNjb3BlLmNvcHlUZXh0ID0ge3N0YXR1czogJ25vdENsaWNrZWQnfTtcbiAgICB0aGlzLiRzY29wZS5zaG93TW9kYWwgPSAhdGhpcy4kc2NvcGUuc2hvd01vZGFsO1xuICB9XG5cbiAgZ2VuZXJhdGVFbWJlZChpZCl7XG4gICAgdGhpcy4kc2NvcGUuZW1iZWRTY3JpcHQgPSAnPHNjcmlwdCBzcmM9XCInK3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCsnLy8nK3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSsnL2VtYmVkL2ZpbGUvJytpZCsnLmpzXCI+PC9zY3JpcHQ+JztcbiAgfVxuXG4gIGRlcGxveShpZCl7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAoJy9hcGkvdjEvZGVwbG95LycraWQpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSgpe1xuICAgIHZhciB0ZXJtID0gdGhpcy5kYXRhLnNlYXJjaDtcbiAgICB0aGlzLnJlZ2lzdHJ5RmFjdG9yeS5zZWFyY2hGaWxlKHRlcm0pLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tTZWFyY2goKXtcbiAgICBpZih0aGlzLiR3aW5kb3cubG9jYWxTdG9yYWdlLnNlYXJjaCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHRoaXMuJHNjb3BlLmRhdGEgPSB7c2VhcmNoOiB0aGlzLiR3aW5kb3cubG9jYWxTdG9yYWdlLnNlYXJjaH07XG4gICAgICB0aGlzLnJlZ2lzdHJ5RmFjdG9yeS5zZWFyY2hGaWxlKHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2VhcmNoKS50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgfSk7XG4gICAgICB0aGlzLiR3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbn1cblxuUmVnaXN0cnlDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyR3aW5kb3cnLCdyZWdpc3RyeUZhY3RvcnknLCAncmVnaXN0cnlMb2FkZXInXTtcblxuZXhwb3J0IHsgUmVnaXN0cnlDb250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBSZWdpc3RyeUNvbnRyb2xsZXIgfSBmcm9tICcuL3JlZ2lzdHJ5LmN0cmwnO1xuaW1wb3J0IHsgUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi9yZWdpc3RyeS5zdmMnO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnLi9yZWdpc3RyeS1sb2FkZXInO1xuXG5sZXQgY3RybCA9IFJlZ2lzdHJ5Q29udHJvbGxlcjtcbmxldCBzdmMgPSBSZWdpc3RyeVNlcnZpY2UuZmFjdG9yeTtcbmxldCBsb2FkZXIgPSBMb2FkZXIuZmFjdG9yeTtcblxuZXhwb3J0IHsgY3RybCB9O1xuZXhwb3J0IHsgc3ZjIH07XG5leHBvcnQgeyBsb2FkZXIgfTtcbiIsImNsYXNzIFJlZ2lzdHJ5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCRodHRwKXtcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gIH1cblxuICBnZXRGaWxlcyhwYWdlKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvZmlsZXMvJyx7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcGFnZTogcGFnZSxcbiAgICAgICAgICBsaW1pdDogNVxuICAgICAgfVxuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSh0ZXJtKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvc2VhcmNoJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICB0ZXJtOiB0ZXJtXG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzdGF0aWMgZmFjdG9yeSgkaHR0cCl7XG4gICAgcmV0dXJuIG5ldyBSZWdpc3RyeVNlcnZpY2UoJGh0dHApO1xuICB9XG59XG5cblJlZ2lzdHJ5U2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJ107XG5cbmV4cG9ydCB7IFJlZ2lzdHJ5U2VydmljZSB9O1xuIiwiY2xhc3MgU2Vzc2lvbkNvbnRyb2xsZXJ7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHJvb3RTY29wZSwgJHN0YXRlLCAkbG9jYXRpb24sICR3aW5kb3csIHNlc3Npb25GYWN0b3J5KXtcbiAgICB0aGlzLnNlc3Npb25GYWN0b3J5ID0gc2Vzc2lvbkZhY3Rvcnk7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICB0aGlzLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICB9XG5cbiAgaW5pdCgpe1xuICAgIHRoaXMuc2Vzc2lvbkZhY3RvcnkuZ2V0VXNlcigpLnRoZW4oKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSA9PiB7XG4gICAgICB0aGlzLiRyb290U2NvcGUubG9nZ2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuJHJvb3RTY29wZS51c2VyID0gZGF0YS51c2VybmFtZTtcbiAgICAgIHRoaXMuJHNjb3BlLmxvZ2dlZCA9IHRydWU7XG4gICAgICB0aGlzLiRzY29wZS51c2VyID0gZGF0YS51c2VybmFtZTtcbiAgICAgIHRoaXMuJHNjb3BlLnBob3RvID0gZGF0YS5fanNvbi5hdmF0YXJfdXJsO1xuICAgIH0pO1xuICB9XG5cbiAgc2lnbmluKHBhZ2Upe1xuICAgIHRoaXMuc2Vzc2lvbkZhY3Rvcnkuc2lnbmluKHBhZ2UpO1xuICB9XG5cbiAgbG9nb3V0KCl7XG4gICAgdGhpcy5zZXNzaW9uRmFjdG9yeS5sb2dvdXQoKS50aGVuKChkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykgPT4ge1xuICAgICAgdGhpcy4kc3RhdGUudHJhbnNpdGlvblRvKHRoaXMuJHN0YXRlLmN1cnJlbnQsIHt9LCB7XG4gICAgICAgICAgcmVsb2FkOiB0cnVlLFxuICAgICAgICAgIGluaGVyaXQ6IGZhbHNlLFxuICAgICAgICAgIG5vdGlmeTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDbGFzcyhwYXRoKXtcbiAgICBpZiAodGhpcy4kbG9jYXRpb24ucGF0aCgpLnN1YnN0cigwLCBwYXRoLmxlbmd0aCkgPT0gcGF0aCkge1xuICAgICAgcmV0dXJuIFwic2VsZWN0ZWRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICB9XG59XG5cblNlc3Npb25Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRzdGF0ZScsICckbG9jYXRpb24nLCAnJHdpbmRvdycsICdzZXNzaW9uRmFjdG9yeSddO1xuXG5leHBvcnQgeyBTZXNzaW9uQ29udHJvbGxlciB9O1xuIiwiaW1wb3J0IHsgU2Vzc2lvbkNvbnRyb2xsZXIgfSBmcm9tICcuL3Nlc3Npb24uY3RybCc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4vc2Vzc2lvbi5zdmMnO1xuXG5sZXQgY3RybCA9IFNlc3Npb25Db250cm9sbGVyO1xubGV0IHN2YyA9IFNlc3Npb25TZXJ2aWNlLmZhY3Rvcnk7XG5cbmV4cG9ydCB7IGN0cmwgfTtcbmV4cG9ydCB7IHN2YyB9O1xuIiwiY2xhc3MgU2Vzc2lvblNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigkaHR0cCwgJHdpbmRvdyl7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gIH1cblxuICBzaWduaW4ocGFnZSl7XG4gICAgdGhpcy4kd2luZG93LmxvY2F0aW9uLmhyZWYgPSAoJy9hdXRoL2dpdGh1Yj9yZWRpcmVjdD0nICsgcGFnZSk7XG4gIH1cblxuICBnZXRVc2VyKCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL3VzZXInLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBsb2dvdXQoKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hdXRoL2xvZ291dCcsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KCRodHRwLCAkd2luZG93KXtcbiAgICByZXR1cm4gbmV3IFNlc3Npb25TZXJ2aWNlKCRodHRwLCAkd2luZG93KTtcbiAgfVxuXG59XG5cblNlc3Npb25TZXJ2aWNlLmZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnJHdpbmRvdyddO1xuXG5leHBvcnQgeyBTZXNzaW9uU2VydmljZSB9O1xuIl19
