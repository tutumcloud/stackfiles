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

var _favoritesFavoritesModule = require('./favorites/favorites.module');

var FavoritesModule = _interopRequireWildcard(_favoritesFavoritesModule);

angular.module('stackfiles', ['ui.router', 'infinite-scroll', 'localytics.directives', 'zeroclipboard']).factory('landingFactory', LandingModule.svc).controller('landingController', LandingModule.ctrl).factory('sessionFactory', SessionModule.svc).controller('sessionController', SessionModule.ctrl).factory('favFactory', FavModule.svc).controller('favController', FavModule.ctrl).factory('registryLoader', RegistryModule.loader).factory('registryFactory', RegistryModule.svc).controller('registryController', RegistryModule.ctrl).factory('mystacksFactory', MyStacksModule.svc).controller('mystacksController', MyStacksModule.ctrl).factory('favoritesFactory', FavoritesModule.svc).controller('favoritesController', FavoritesModule.ctrl).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

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
    }).state('favorites', {
        url: '/favorites',
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

},{"./favmodule/favmodule.module":3,"./favorites/favorites.module":6,"./landing/landing.module":9,"./mystacks/mystacks.module":12,"./registry/registry.module":16,"./session/session.module":19}],2:[function(require,module,exports){
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

      this.favFactory.unFavFile(file._id).then(function () {
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

var FavoriteController = (function () {
  function FavoriteController($scope, $rootScope, favoritesFactory) {
    _classCallCheck(this, FavoriteController);

    this.favoritesFactory = favoritesFactory;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.init();
  }

  _createClass(FavoriteController, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.favoritesFactory.getUserFavorites().then(function (data) {
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
    key: 'removeRow',
    value: function removeRow(file) {
      var index = -1;
      for (var i = 0; i < this.files.length; i++) {
        if (this.files[i]._id === file._id) {
          index = i;
          break;
        }
      }
      this.files.splice(index, 1);
    }
  }, {
    key: 'searchFile',
    value: function searchFile() {
      var _this2 = this;

      var term = this.data.search;
      this.favoritesFactory.searchFile(term).then(function (results) {
        _this2.results = results;
      });
    }
  }]);

  return FavoriteController;
})();

FavoriteController.$inject = ['$scope', '$rootScope', 'favoritesFactory'];

exports.FavoriteController = FavoriteController;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _favoritesCtrl = require('./favorites.ctrl');

var _favoritesSvc = require('./favorites.svc');

var ctrl = _favoritesCtrl.FavoriteController;
var svc = _favoritesSvc.FavoriteService.factory;

exports.ctrl = ctrl;
exports.svc = svc;

},{"./favorites.ctrl":5,"./favorites.svc":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FavoriteService = (function () {
  function FavoriteService($http) {
    _classCallCheck(this, FavoriteService);

    this.$http = $http;
  }

  _createClass(FavoriteService, [{
    key: 'getUserFavorites',
    value: function getUserFavorites() {
      return this.$http.get('/api/v1/user/favorites', {
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
      return new FavoriteService($http);
    }
  }]);

  return FavoriteService;
})();

FavoriteService.factory.$inject = ['$http'];

exports.FavoriteService = FavoriteService;

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./landing.ctrl":8,"./landing.svc":10}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
    value: function searchFile() {
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

},{}],12:[function(require,module,exports){
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

},{"./mystacks.ctrl":11,"./mystacks.svc":13}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./registry-loader":14,"./registry.ctrl":15,"./registry.svc":17}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./session.ctrl":18,"./session.svc":20}],20:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9hcHAuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZtb2R1bGUvZmF2bW9kdWxlLmN0cmwuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZtb2R1bGUvZmF2bW9kdWxlLm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2Zhdm1vZHVsZS9mYXZtb2R1bGUuc3ZjLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvZmF2b3JpdGVzL2Zhdm9yaXRlcy5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvZmF2b3JpdGVzL2Zhdm9yaXRlcy5tb2R1bGUuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9mYXZvcml0ZXMvZmF2b3JpdGVzLnN2Yy5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2xhbmRpbmcvbGFuZGluZy5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbGFuZGluZy9sYW5kaW5nLm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL2xhbmRpbmcvbGFuZGluZy5zdmMuanMiLCIvVXNlcnMvbWF4aW1laGVja2VsL0RvY3VtZW50cy9Qcm9qZWN0cy9Db21wb3NlUmVnaXN0cnkvc3JjL2FwcC9teXN0YWNrcy9teXN0YWNrcy5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbXlzdGFja3MvbXlzdGFja3MubW9kdWxlLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvbXlzdGFja3MvbXlzdGFja3Muc3ZjLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvcmVnaXN0cnkvcmVnaXN0cnktbG9hZGVyLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvcmVnaXN0cnkvcmVnaXN0cnkuY3RybC5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3JlZ2lzdHJ5L3JlZ2lzdHJ5Lm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3JlZ2lzdHJ5L3JlZ2lzdHJ5LnN2Yy5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3Nlc3Npb24vc2Vzc2lvbi5jdHJsLmpzIiwiL1VzZXJzL21heGltZWhlY2tlbC9Eb2N1bWVudHMvUHJvamVjdHMvQ29tcG9zZVJlZ2lzdHJ5L3NyYy9hcHAvc2Vzc2lvbi9zZXNzaW9uLm1vZHVsZS5qcyIsIi9Vc2Vycy9tYXhpbWVoZWNrZWwvRG9jdW1lbnRzL1Byb2plY3RzL0NvbXBvc2VSZWdpc3RyeS9zcmMvYXBwL3Nlc3Npb24vc2Vzc2lvbi5zdmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O29DQ0ErQiwwQkFBMEI7O0lBQTdDLGFBQWE7O29DQUNNLDBCQUEwQjs7SUFBN0MsYUFBYTs7d0NBQ0UsOEJBQThCOztJQUE3QyxTQUFTOztzQ0FDVyw0QkFBNEI7O0lBQWhELGNBQWM7O3NDQUNNLDRCQUE0Qjs7SUFBaEQsY0FBYzs7d0NBQ08sOEJBQThCOztJQUFuRCxlQUFlOztBQUUzQixPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBQyxlQUFlLENBQUMsQ0FBQyxDQUVwRyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUM1QyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUVuRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUM1QyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUVuRCxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FDcEMsVUFBVSxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBRTNDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQ2hELE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQzlDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBRXJELE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQzlDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFD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RTtBQUNwQyxjQUFNLEVBQUUsS0FBSztPQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDO2VBQUksQ0FBQyxDQUFDLElBQUk7T0FBQSxDQUFDLENBQUM7S0FDdEI7OztXQUVLLGtCQUFFO0FBQ04sYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7QUFDcEMsY0FBTSxFQUFFLEtBQUs7T0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztlQUFJLENBQUMsQ0FBQyxJQUFJO09BQUEsQ0FBQyxDQUFDO0tBQ3RCOzs7V0FFYSxpQkFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDO0FBQzVCLGFBQU8sSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNDOzs7U0F4QkcsY0FBYzs7O0FBNEJwQixjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzs7UUFFN0MsY0FBYyxHQUFkLGNBQWMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgTGFuZGluZ01vZHVsZSBmcm9tICcuL2xhbmRpbmcvbGFuZGluZy5tb2R1bGUnO1xuaW1wb3J0ICogYXMgU2Vzc2lvbk1vZHVsZSBmcm9tICcuL3Nlc3Npb24vc2Vzc2lvbi5tb2R1bGUnO1xuaW1wb3J0ICogYXMgRmF2TW9kdWxlIGZyb20gJy4vZmF2bW9kdWxlL2Zhdm1vZHVsZS5tb2R1bGUnO1xuaW1wb3J0ICogYXMgUmVnaXN0cnlNb2R1bGUgZnJvbSAnLi9yZWdpc3RyeS9yZWdpc3RyeS5tb2R1bGUnO1xuaW1wb3J0ICogYXMgTXlTdGFja3NNb2R1bGUgZnJvbSAnLi9teXN0YWNrcy9teXN0YWNrcy5tb2R1bGUnO1xuaW1wb3J0ICogYXMgRmF2b3JpdGVzTW9kdWxlIGZyb20gJy4vZmF2b3JpdGVzL2Zhdm9yaXRlcy5tb2R1bGUnO1xuXG5hbmd1bGFyLm1vZHVsZSgnc3RhY2tmaWxlcycsIFsndWkucm91dGVyJywnaW5maW5pdGUtc2Nyb2xsJywnbG9jYWx5dGljcy5kaXJlY3RpdmVzJywnemVyb2NsaXBib2FyZCddKVxuXG4uZmFjdG9yeSgnbGFuZGluZ0ZhY3RvcnknLCBMYW5kaW5nTW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdsYW5kaW5nQ29udHJvbGxlcicsIExhbmRpbmdNb2R1bGUuY3RybClcblxuLmZhY3RvcnkoJ3Nlc3Npb25GYWN0b3J5JywgU2Vzc2lvbk1vZHVsZS5zdmMpXG4uY29udHJvbGxlcignc2Vzc2lvbkNvbnRyb2xsZXInLCBTZXNzaW9uTW9kdWxlLmN0cmwpXG5cbi5mYWN0b3J5KCdmYXZGYWN0b3J5JywgRmF2TW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdmYXZDb250cm9sbGVyJywgRmF2TW9kdWxlLmN0cmwpXG5cbi5mYWN0b3J5KCdyZWdpc3RyeUxvYWRlcicsIFJlZ2lzdHJ5TW9kdWxlLmxvYWRlcilcbi5mYWN0b3J5KCdyZWdpc3RyeUZhY3RvcnknLCBSZWdpc3RyeU1vZHVsZS5zdmMpXG4uY29udHJvbGxlcigncmVnaXN0cnlDb250cm9sbGVyJywgUmVnaXN0cnlNb2R1bGUuY3RybClcblxuLmZhY3RvcnkoJ215c3RhY2tzRmFjdG9yeScsIE15U3RhY2tzTW9kdWxlLnN2Yylcbi5jb250cm9sbGVyKCdteXN0YWNrc0NvbnRyb2xsZXInLCBNeVN0YWNrc01vZHVsZS5jdHJsKVxuXG4uZmFjdG9yeSgnZmF2b3JpdGVzRmFjdG9yeScsIEZhdm9yaXRlc01vZHVsZS5zdmMpXG4uY29udHJvbGxlcignZmF2b3JpdGVzQ29udHJvbGxlcicsIEZhdm9yaXRlc01vZHVsZS5jdHJsKVxuXG4uY29uZmlnKFtcIiRzdGF0ZVByb3ZpZGVyXCIsIFwiJHVybFJvdXRlclByb3ZpZGVyXCIsICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIud2hlbignJywgJy8nKTtcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiLzQwNFwiKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyLlxuICAgICAgc3RhdGUoJ2xhbmRpbmcnLCB7XG4gICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgIGZ1bGw6IHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9sYW5kaW5ncGFnZS5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xhbmRpbmdDb250cm9sbGVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH0pLlxuICAgICAgc3RhdGUoJ3JlZ2lzdHJ5Jywge1xuICAgICAgICB1cmw6ICcvcmVnaXN0cnknLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIHRvcDoge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy90b3AtYmFyLmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzaWRlOiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3NpZGUtbWVudS5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9yZWdpc3RyeS5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkuXG4gICAgICBzdGF0ZSgnbXlzdGFja3MnLCB7XG4gICAgICAgIHVybDonL215c3RhY2tzJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICB0b3A6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvdG9wLWJhci5odG1sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2lkZToge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9zaWRlLW1lbnUuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbXlzdGFja3MuaHRtbCcsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KS5cbiAgICAgIHN0YXRlKCdmYXZvcml0ZXMnLCB7XG4gICAgICAgIHVybDonL2Zhdm9yaXRlcycsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgdG9wOiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3RvcC1iYXIuaHRtbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNpZGU6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvc2lkZS1tZW51Lmh0bWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2Zhdm9yaXRlcy5odG1sJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkuXG4gICAgICBzdGF0ZSgnNDA0Jywge1xuICAgICAgICB1cmw6Jy80MDQnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIGZ1bGw6IHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvNDA0Lmh0bWwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbn1dKVxuXG4uZGlyZWN0aXZlKCduZ0VudGVyJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIGVsZW1lbnQuYmluZChcImtleWRvd24ga2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZihldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRldmFsKGF0dHJzLm5nRW50ZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59KVxuXG4uZGlyZWN0aXZlKCdtb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPicgK1xuICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvYnV0dG9uPicgK1xuICAgICAgICAnPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj57eyB0aXRsZSB9fTwvaDQ+JyArXG4gICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICByZXBsYWNlOnRydWUsXG4gICAgICAgIHNjb3BlOnRydWUsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiBwb3N0TGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIHNjb3BlLnRpdGxlID0gYXR0cnMudGl0bGU7XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goYXR0cnMudmlzaWJsZSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudFthdHRycy52aXNpYmxlXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50W2F0dHJzLnZpc2libGVdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KVxuXG4uZGlyZWN0aXZlKCdhdXRvZm9jdXMnLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICAgICAgbGluayA6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnRbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1dKVxuXG4uZGlyZWN0aXZlKCdmYXYnLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlbXBsYXRlOiAnPHN2ZyBuZy1jbGljaz1cInRvZ2dsZSgpXCIgbmctY2xhc3M9XCJ7XFwnYnRuLW9mZlxcJzohaXNTZWxlY3RlZCwgXFwnYnRuLW9uXFwnOmlzU2VsZWN0ZWQsfVwiIGNsYXNzPVwic3RhclwiICB3aWR0aD1cIjI0cHhcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCA0OCA0OFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sbnM6c2tldGNoPVwiaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zXCI+JytcbiAgICAgICAgICAgICc8ZyBpZD1cIlN0YWNrZmlsZXMuaW9cIiBzdHJva2U9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHNrZXRjaDp0eXBlPVwiTVNQYWdlXCI+JytcbiAgICAgICAgICAgICAgICAnPGcgaWQ9XCItc3RhclwiIHNrZXRjaDp0eXBlPVwiTVNBcnRib2FyZEdyb3VwXCIgZmlsbD1cIiNmMWYxZjFcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGcgaWQ9XCJzdGFyXCIgc2tldGNoOnR5cGU9XCJNU0xheWVyR3JvdXBcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNC4wMDAwMDAsIDQuMDAwMDAwKVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxwYXRoIGQ9XCJNNDAsMTQuNDggTDI1LjYyLDEzLjI0IEwyMCwwIEwxNC4zOCwxMy4yNiBMMCwxNC40OCBMMTAuOTIsMjMuOTQgTDcuNjQsMzggTDIwLDMwLjU0IEwzMi4zNiwzOCBMMjkuMSwyMy45NCBMNDAsMTQuNDggTDQwLDE0LjQ4IFogTTIwLDI2LjggTDEyLjQ4LDMxLjM0IEwxNC40OCwyMi43OCBMNy44NCwxNy4wMiBMMTYuNiwxNi4yNiBMMjAsOC4yIEwyMy40MiwxNi4yOCBMMzIuMTgsMTcuMDQgTDI1LjU0LDIyLjggTDI3LjU0LDMxLjM2IEwyMCwyNi44IEwyMCwyNi44IFpcIiBpZD1cIlNoYXBlXCIgc2tldGNoOnR5cGU9XCJNU1NoYXBlR3JvdXBcIj48L3BhdGg+JytcbiAgICAgICAgICAgICAgICAgICAgJzwvZz4nK1xuICAgICAgICAgICAgICAgICc8L2c+JyArXG4gICAgICAgICAgICAnPC9nPicgK1xuICAgICAgICAnPC9zdmc+JyxcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGZpZDogJ0AnLFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogJz0nLFxuICAgICAgICAgICAgb25TZWxlY3Q6ICcmJ1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcyl7XG4gICAgICAgICAgICBzY29wZS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuaXNTZWxlY3RlZCA9ICFzY29wZS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgICAgIHNjb3BlLm9uU2VsZWN0KCkoc2NvcGUuZmlkLHNjb3BlLmlzU2VsZWN0ZWQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIiwiY2xhc3MgRmF2Q29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCBmYXZGYWN0b3J5KXtcbiAgICB0aGlzLmZhdkZhY3RvcnkgPSBmYXZGYWN0b3J5O1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0ID0gW107XG5cbiAgfVxuXG4gIGluaXQoKXtcbiAgICBpZih0aGlzLiRyb290U2NvcGUubG9nZ2VkKXtcbiAgICAgIHRoaXMuJHNjb3BlLnVzZXIgPSB0aGlzLiRyb290U2NvcGUudXNlcjtcbiAgICAgIHRoaXMuJHNjb3BlLmxvZ2dlZCA9IHRoaXMuJHJvb3RTY29wZS5sb2dnZWQ7XG4gICAgICB0aGlzLmZhdkZhY3RvcnkuY2hlY2tGYXYoKS50aGVuKGZhdm9yaXRlcyA9PiB7XG4gICAgICAgIHRoaXMuJHNjb3BlLmZhdm9yaXRlTGlzdCA9IGZhdm9yaXRlcy5kYXRhO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5jcmVtZW50KGZpbGUpe1xuICAgIGlmKHRoaXMuJHJvb3RTY29wZS5sb2dnZWQpe1xuICAgICAgZmlsZS5zdGFycyA9IGZpbGUuc3RhcnMgKyAxO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVN0YXR1cyhmaWxlKXtcbiAgICB0aGlzLmZhdkZhY3RvcnkuZmF2RmlsZShmaWxlLl9pZCkudGhlbigoKSA9PiB7XG4gICAgICBpZih0aGlzLiRyb290U2NvcGUubG9nZ2VkKXtcbiAgICAgICAgdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0LnB1c2goZmlsZS5faWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdW5Ub2dnbGVTdGF0dXMoZmlsZSl7XG4gICAgdGhpcy5mYXZGYWN0b3J5LnVuRmF2RmlsZShmaWxlLl9pZCkudGhlbigoKSA9PiB7XG4gICAgICBpZih0aGlzLiRzY29wZS5sb2dnZWQpe1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLiRzY29wZS5mYXZvcml0ZUxpc3QuaW5kZXhPZihmaWxlLl9pZCk7XG4gICAgICAgIHRoaXMuJHNjb3BlLmZhdm9yaXRlTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaXNTZWxlY3RlZChmaWxlKXtcbiAgICByZXR1cm4gdGhpcy4kc2NvcGUuZmF2b3JpdGVMaXN0LmluZGV4T2YoZmlsZS5faWQpID4gLTE7XG4gIH1cbn1cblxuRmF2Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICdmYXZGYWN0b3J5J107XG5cbmV4cG9ydCB7IEZhdkNvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IEZhdkNvbnRyb2xsZXIgfSBmcm9tICcuL2Zhdm1vZHVsZS5jdHJsJztcbmltcG9ydCB7IEZhdlNlcnZpY2UgfSBmcm9tICcuL2Zhdm1vZHVsZS5zdmMnO1xuXG5sZXQgY3RybCA9IEZhdkNvbnRyb2xsZXI7XG5sZXQgc3ZjID0gRmF2U2VydmljZS5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbiIsImNsYXNzIEZhdlNlcnZpY2V7XG4gIGNvbnN0cnVjdG9yKCRodHRwKXtcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gIH1cblxuICBjaGVja0Zhdigpe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS91c2VyL2ZhdicsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KTtcbiAgfVxuICBcbiAgZmF2RmlsZShpZCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL2ZpbGVzL2Zhdi8nICsgaWQsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIHVuRmF2RmlsZShpZCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL2ZpbGVzL3VuZmF2LycgKyBpZCwge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJGh0dHApe1xuICAgIHJldHVybiBuZXcgRmF2U2VydmljZSgkaHR0cCk7XG4gIH1cbn1cblxuRmF2U2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJ107XG5cbmV4cG9ydCB7IEZhdlNlcnZpY2UgfTtcbiIsImNsYXNzIEZhdm9yaXRlQ29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCBmYXZvcml0ZXNGYWN0b3J5KXtcbiAgICB0aGlzLmZhdm9yaXRlc0ZhY3RvcnkgPSBmYXZvcml0ZXNGYWN0b3J5O1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCl7XG4gICAgdGhpcy5mYXZvcml0ZXNGYWN0b3J5LmdldFVzZXJGYXZvcml0ZXMoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgdGhpcy5maWxlcyA9IGRhdGE7XG4gICAgICB0aGlzLiRzY29wZS5sb2FkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlTW9kYWwoKXtcbiAgICB0aGlzLiRzY29wZS5jb3B5VGV4dCA9IHtzdGF0dXM6ICdub3RDbGlja2VkJ307XG4gICAgdGhpcy4kc2NvcGUuc2hvd01vZGFsID0gIXRoaXMuJHNjb3BlLnNob3dNb2RhbDtcbiAgfVxuXG4gIGdlbmVyYXRlRW1iZWQoaWQpe1xuICAgIHRoaXMuJHNjb3BlLmVtYmVkU2NyaXB0ID0gJzxzY3JpcHQgc3JjPVwiJyt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wrJy8vJyt3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUrJy9lbWJlZC9maWxlLycraWQrJy5qc1wiPjwvc2NyaXB0Pic7XG4gIH1cblxuICBkZXBsb3koaWQpe1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gKCcvYXBpL3YxL2RlcGxveS8nK2lkKTtcbiAgfVxuXG4gIHJlbW92ZVJvdyhmaWxlKXtcbiAgICB2YXIgaW5kZXggPSAtMTtcblx0XHRmb3IoIHZhciBpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRpZiggdGhpcy5maWxlc1tpXS5faWQgPT09IGZpbGUuX2lkICkge1xuXHRcdFx0XHRpbmRleCA9IGk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmZpbGVzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxuXG4gIHNlYXJjaEZpbGUoKXtcbiAgICB2YXIgdGVybSA9IHRoaXMuZGF0YS5zZWFyY2g7XG4gICAgdGhpcy5mYXZvcml0ZXNGYWN0b3J5LnNlYXJjaEZpbGUodGVybSkudGhlbihyZXN1bHRzID0+IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgfSk7XG4gIH1cbn1cblxuRmF2b3JpdGVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJ2Zhdm9yaXRlc0ZhY3RvcnknXTtcblxuZXhwb3J0IHsgRmF2b3JpdGVDb250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBGYXZvcml0ZUNvbnRyb2xsZXIgfSBmcm9tICcuL2Zhdm9yaXRlcy5jdHJsJztcbmltcG9ydCB7IEZhdm9yaXRlU2VydmljZSB9IGZyb20gJy4vZmF2b3JpdGVzLnN2Yyc7XG5cbmxldCBjdHJsID0gRmF2b3JpdGVDb250cm9sbGVyO1xubGV0IHN2YyA9IEZhdm9yaXRlU2VydmljZS5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbiIsImNsYXNzIEZhdm9yaXRlU2VydmljZXtcbiAgY29uc3RydWN0b3IoJGh0dHApe1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgfVxuXG4gIGdldFVzZXJGYXZvcml0ZXMoKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvdXNlci9mYXZvcml0ZXMnLHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSh0ZXJtKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvc2VhcmNoJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICB0ZXJtOiB0ZXJtXG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzdGF0aWMgZmFjdG9yeSgkaHR0cCl7XG4gICAgcmV0dXJuIG5ldyBGYXZvcml0ZVNlcnZpY2UoJGh0dHApO1xuICB9XG59XG5cbkZhdm9yaXRlU2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJ107XG5cbmV4cG9ydCB7IEZhdm9yaXRlU2VydmljZSB9O1xuIiwiY2xhc3MgTWFpbkNvbnRyb2xsZXJ7XG4gIGNvbnN0cnVjdG9yKGxhbmRpbmdGYWN0b3J5KSB7XG4gICAgdGhpcy5sYW5kaW5nRmFjdG9yeSA9IGxhbmRpbmdGYWN0b3J5O1xuICB9XG4gIHNpZ25pbihwYWdlKXtcbiAgICB0aGlzLmxhbmRpbmdGYWN0b3J5LnNpZ25pbihwYWdlKTtcbiAgfVxufVxuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWydsYW5kaW5nRmFjdG9yeSddO1xuXG5leHBvcnQgeyBNYWluQ29udHJvbGxlciB9O1xuIiwiaW1wb3J0IHsgTWFpbkNvbnRyb2xsZXIgfSBmcm9tICcuL2xhbmRpbmcuY3RybCc7XG5pbXBvcnQgeyBNYWluU2VydmljZSB9IGZyb20gJy4vbGFuZGluZy5zdmMnO1xuXG5sZXQgY3RybCA9IE1haW5Db250cm9sbGVyO1xubGV0IHN2YyA9IE1haW5TZXJ2aWNlLmZhY3Rvcnk7XG5cbmV4cG9ydCB7IGN0cmwgfTtcbmV4cG9ydCB7IHN2YyB9O1xuIiwiY2xhc3MgTWFpblNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcigkd2luZG93KXtcbiAgICB0aGlzLiR3aW5kb3cgPSAkd2luZG93O1xuICB9XG5cbiAgc2lnbmluKHBhZ2Upe1xuICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gKCcvYXV0aC9naXRodWI/cmVkaXJlY3Q9JyArIHBhZ2UpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJHdpbmRvdyl7XG4gICAgcmV0dXJuIG5ldyBNYWluU2VydmljZSgkd2luZG93KTtcbiAgfVxufVxuXG5NYWluU2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyR3aW5kb3cnXTtcblxuZXhwb3J0IHsgTWFpblNlcnZpY2UgfTtcbiIsImNsYXNzIE15U3RhY2tDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCBteXN0YWNrc0ZhY3Rvcnkpe1xuICAgIHRoaXMubXlzdGFja3NGYWN0b3J5ID0gbXlzdGFja3NGYWN0b3J5O1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpe1xuICAgIHRoaXMubXlzdGFja3NGYWN0b3J5LmdldFVzZXJGaWxlcygpLnRoZW4oZGF0YSA9PiB7XG4gICAgICB0aGlzLmZpbGVzID0gZGF0YTtcbiAgICAgIHRoaXMuJHNjb3BlLmxvYWRlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVNb2RhbCgpe1xuICAgIHRoaXMuJHNjb3BlLmNvcHlUZXh0ID0ge3N0YXR1czogJ25vdENsaWNrZWQnfTtcbiAgICB0aGlzLiRzY29wZS5zaG93TW9kYWwgPSAhdGhpcy4kc2NvcGUuc2hvd01vZGFsO1xuICB9XG5cbiAgZ2VuZXJhdGVFbWJlZChpZCl7XG4gICAgdGhpcy4kc2NvcGUuZW1iZWRTY3JpcHQgPSAnPHNjcmlwdCBzcmM9XCInK3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCsnLy8nK3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSsnL2VtYmVkL2ZpbGUvJytpZCsnLmpzXCI+PC9zY3JpcHQ+JztcbiAgfVxuXG4gIGRlcGxveShpZCl7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAoJy9hcGkvdjEvZGVwbG95LycraWQpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSgpe1xuICAgIHZhciB0ZXJtID0gdGhpcy5kYXRhLnNlYXJjaDtcbiAgICB0aGlzLm15c3RhY2tzRmFjdG9yeS5zZWFyY2hGaWxlKHRlcm0pLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgIH0pO1xuICB9XG59XG5cbk15U3RhY2tDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICdteXN0YWNrc0ZhY3RvcnknXTtcblxuZXhwb3J0IHsgTXlTdGFja0NvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IE15U3RhY2tDb250cm9sbGVyIH0gZnJvbSAnLi9teXN0YWNrcy5jdHJsJztcbmltcG9ydCB7IE15U3RhY2tTZXJ2aWNlIH0gZnJvbSAnLi9teXN0YWNrcy5zdmMnO1xuXG5sZXQgY3RybCA9IE15U3RhY2tDb250cm9sbGVyO1xubGV0IHN2YyA9IE15U3RhY2tTZXJ2aWNlLmZhY3Rvcnk7XG5cbmV4cG9ydCB7IGN0cmwgfTtcbmV4cG9ydCB7IHN2YyB9O1xuIiwiY2xhc3MgTXlTdGFja1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigkaHR0cCl7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICB9XG5cbiAgZ2V0VXNlckZpbGVzKCl7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KCcvYXBpL3YxL3VzZXIvZmlsZXMnLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc2VhcmNoRmlsZSh0ZXJtKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvc2VhcmNoJywge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICB0ZXJtOiB0ZXJtXG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzdGF0aWMgZmFjdG9yeSgkaHR0cCl7XG4gICAgcmV0dXJuIG5ldyBNeVN0YWNrU2VydmljZSgkaHR0cCk7XG4gIH1cblxufVxuXG5NeVN0YWNrU2VydmljZS5mYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJ107XG5cbmV4cG9ydCB7IE15U3RhY2tTZXJ2aWNlIH07XG4iLCJjbGFzcyBMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihyZWdpc3RyeUZhY3RvcnkpIHtcbiAgICB0aGlzLnJlZ2lzdHJ5RmFjdG9yeSA9IHJlZ2lzdHJ5RmFjdG9yeTtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgdGhpcy5hZnRlciA9IDE7XG4gIH1cblxuICBuZXh0UGFnZSgpIHtcbiAgICBpZiAodGhpcy5idXN5KSByZXR1cm47XG4gICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeUZhY3RvcnkuZ2V0RmlsZXModGhpcy5hZnRlcikudGhlbihmaWxlcyA9PiB7XG4gICAgICB2YXIgbGlzdCA9IGZpbGVzO1xuICAgICAgaWYobGlzdC5sZW5ndGggPT09IDApe1xuICAgICAgICBzZWxmLmJ1c3kgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBzZWxmLml0ZW1zLnB1c2gobGlzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5hZnRlciA9IHNlbGYuYWZ0ZXIgKyAxO1xuICAgICAgICBzZWxmLmJ1c3kgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KHJlZ2lzdHJ5RmFjdG9yeSl7XG4gICAgcmV0dXJuIG5ldyBMb2FkZXIocmVnaXN0cnlGYWN0b3J5KTtcbiAgfVxufVxuXG5Mb2FkZXIuJGluamVjdCA9IFsncmVnaXN0cnlGYWN0b3J5J107XG5cbmV4cG9ydCB7IExvYWRlciB9O1xuIiwiY2xhc3MgUmVnaXN0cnlDb250cm9sbGVye1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRyb290U2NvcGUsICR3aW5kb3csIHJlZ2lzdHJ5RmFjdG9yeSwgcmVnaXN0cnlMb2FkZXIpe1xuICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5ID0gcmVnaXN0cnlGYWN0b3J5O1xuICAgIHRoaXMucmVnaXN0cnlMb2FkZXIgPSByZWdpc3RyeUxvYWRlcjtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCl7XG4gICAgdGhpcy5maWxlcyA9IHRoaXMucmVnaXN0cnlMb2FkZXI7XG4gICAgdGhpcy4kc2NvcGUubG9hZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHRvZ2dsZU1vZGFsKCl7XG4gICAgdGhpcy4kc2NvcGUuY29weVRleHQgPSB7c3RhdHVzOiAnbm90Q2xpY2tlZCd9O1xuICAgIHRoaXMuJHNjb3BlLnNob3dNb2RhbCA9ICF0aGlzLiRzY29wZS5zaG93TW9kYWw7XG4gIH1cblxuICBnZW5lcmF0ZUVtYmVkKGlkKXtcbiAgICB0aGlzLiRzY29wZS5lbWJlZFNjcmlwdCA9ICc8c2NyaXB0IHNyYz1cIicrd2luZG93LmxvY2F0aW9uLnByb3RvY29sKycvLycrd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKycvZW1iZWQvZmlsZS8nK2lkKycuanNcIj48L3NjcmlwdD4nO1xuICB9XG5cbiAgZGVwbG95KGlkKXtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICgnL2FwaS92MS9kZXBsb3kvJytpZCk7XG4gIH1cblxuICBzZWFyY2hGaWxlKCl7XG4gICAgdmFyIHRlcm0gPSB0aGlzLmRhdGEuc2VhcmNoO1xuICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5LnNlYXJjaEZpbGUodGVybSkudGhlbihyZXN1bHRzID0+IHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NlYXJjaCgpe1xuICAgIGlmKHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2VhcmNoICE9PSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy4kc2NvcGUuZGF0YSA9IHtzZWFyY2g6IHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2VhcmNofTtcbiAgICAgIHRoaXMucmVnaXN0cnlGYWN0b3J5LnNlYXJjaEZpbGUodGhpcy4kd2luZG93LmxvY2FsU3RvcmFnZS5zZWFyY2gpLnRoZW4ocmVzdWx0cyA9PiB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuJHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxufVxuXG5SZWdpc3RyeUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJHdpbmRvdycsJ3JlZ2lzdHJ5RmFjdG9yeScsICdyZWdpc3RyeUxvYWRlciddO1xuXG5leHBvcnQgeyBSZWdpc3RyeUNvbnRyb2xsZXIgfTtcbiIsImltcG9ydCB7IFJlZ2lzdHJ5Q29udHJvbGxlciB9IGZyb20gJy4vcmVnaXN0cnkuY3RybCc7XG5pbXBvcnQgeyBSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL3JlZ2lzdHJ5LnN2Yyc7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tICcuL3JlZ2lzdHJ5LWxvYWRlcic7XG5cbmxldCBjdHJsID0gUmVnaXN0cnlDb250cm9sbGVyO1xubGV0IHN2YyA9IFJlZ2lzdHJ5U2VydmljZS5mYWN0b3J5O1xubGV0IGxvYWRlciA9IExvYWRlci5mYWN0b3J5O1xuXG5leHBvcnQgeyBjdHJsIH07XG5leHBvcnQgeyBzdmMgfTtcbmV4cG9ydCB7IGxvYWRlciB9O1xuIiwiY2xhc3MgUmVnaXN0cnlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoJGh0dHApe1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgfVxuXG4gIGdldEZpbGVzKHBhZ2Upe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS9maWxlcy8nLHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgIGxpbWl0OiA1XG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHIuZGF0YSk7XG4gIH1cblxuICBzZWFyY2hGaWxlKHRlcm0pe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2FwaS92MS9zZWFyY2gnLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIHRlcm06IHRlcm1cbiAgICAgIH1cbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KCRodHRwKXtcbiAgICByZXR1cm4gbmV3IFJlZ2lzdHJ5U2VydmljZSgkaHR0cCk7XG4gIH1cbn1cblxuUmVnaXN0cnlTZXJ2aWNlLmZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnXTtcblxuZXhwb3J0IHsgUmVnaXN0cnlTZXJ2aWNlIH07XG4iLCJjbGFzcyBTZXNzaW9uQ29udHJvbGxlcntcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkcm9vdFNjb3BlLCAkc3RhdGUsICRsb2NhdGlvbiwgJHdpbmRvdywgc2Vzc2lvbkZhY3Rvcnkpe1xuICAgIHRoaXMuc2Vzc2lvbkZhY3RvcnkgPSBzZXNzaW9uRmFjdG9yeTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMuJHN0YXRlID0gJHN0YXRlO1xuICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgIHRoaXMuJHdpbmRvdyA9ICR3aW5kb3c7XG4gIH1cblxuICBpbml0KCl7XG4gICAgdGhpcy5zZXNzaW9uRmFjdG9yeS5nZXRVc2VyKCkudGhlbigoZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpID0+IHtcbiAgICAgIHRoaXMuJHJvb3RTY29wZS5sb2dnZWQgPSB0cnVlO1xuICAgICAgdGhpcy4kcm9vdFNjb3BlLnVzZXIgPSBkYXRhLnVzZXJuYW1lO1xuICAgICAgdGhpcy4kc2NvcGUubG9nZ2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuJHNjb3BlLnVzZXIgPSBkYXRhLnVzZXJuYW1lO1xuICAgICAgdGhpcy4kc2NvcGUucGhvdG8gPSBkYXRhLl9qc29uLmF2YXRhcl91cmw7XG4gICAgfSk7XG4gIH1cblxuICBzaWduaW4ocGFnZSl7XG4gICAgdGhpcy5zZXNzaW9uRmFjdG9yeS5zaWduaW4ocGFnZSk7XG4gIH1cblxuICBsb2dvdXQoKXtcbiAgICB0aGlzLnNlc3Npb25GYWN0b3J5LmxvZ291dCgpLnRoZW4oKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSA9PiB7XG4gICAgICB0aGlzLiRzdGF0ZS50cmFuc2l0aW9uVG8odGhpcy4kc3RhdGUuY3VycmVudCwge30sIHtcbiAgICAgICAgICByZWxvYWQ6IHRydWUsXG4gICAgICAgICAgaW5oZXJpdDogZmFsc2UsXG4gICAgICAgICAgbm90aWZ5OiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENsYXNzKHBhdGgpe1xuICAgIGlmICh0aGlzLiRsb2NhdGlvbi5wYXRoKCkuc3Vic3RyKDAsIHBhdGgubGVuZ3RoKSA9PSBwYXRoKSB7XG4gICAgICByZXR1cm4gXCJzZWxlY3RlZFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gIH1cbn1cblxuU2Vzc2lvbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJHN0YXRlJywgJyRsb2NhdGlvbicsICckd2luZG93JywgJ3Nlc3Npb25GYWN0b3J5J107XG5cbmV4cG9ydCB7IFNlc3Npb25Db250cm9sbGVyIH07XG4iLCJpbXBvcnQgeyBTZXNzaW9uQ29udHJvbGxlciB9IGZyb20gJy4vc2Vzc2lvbi5jdHJsJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXNzaW9uLnN2Yyc7XG5cbmxldCBjdHJsID0gU2Vzc2lvbkNvbnRyb2xsZXI7XG5sZXQgc3ZjID0gU2Vzc2lvblNlcnZpY2UuZmFjdG9yeTtcblxuZXhwb3J0IHsgY3RybCB9O1xuZXhwb3J0IHsgc3ZjIH07XG4iLCJjbGFzcyBTZXNzaW9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCRodHRwLCAkd2luZG93KXtcbiAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgdGhpcy4kd2luZG93ID0gJHdpbmRvdztcbiAgfVxuXG4gIHNpZ25pbihwYWdlKXtcbiAgICB0aGlzLiR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICgnL2F1dGgvZ2l0aHViP3JlZGlyZWN0PScgKyBwYWdlKTtcbiAgfVxuXG4gIGdldFVzZXIoKXtcbiAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQoJy9hcGkvdjEvdXNlcicsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKHIgPT4gci5kYXRhKTtcbiAgfVxuXG4gIGxvZ291dCgpe1xuICAgIHJldHVybiB0aGlzLiRodHRwLmdldCgnL2F1dGgvbG9nb3V0Jywge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4ociA9PiByLmRhdGEpO1xuICB9XG5cbiAgc3RhdGljIGZhY3RvcnkoJGh0dHAsICR3aW5kb3cpe1xuICAgIHJldHVybiBuZXcgU2Vzc2lvblNlcnZpY2UoJGh0dHAsICR3aW5kb3cpO1xuICB9XG5cbn1cblxuU2Vzc2lvblNlcnZpY2UuZmFjdG9yeS4kaW5qZWN0ID0gWyckaHR0cCcsICckd2luZG93J107XG5cbmV4cG9ydCB7IFNlc3Npb25TZXJ2aWNlIH07XG4iXX0=
