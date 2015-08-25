class SessionController{
  constructor($scope, $rootScope, $state, $location, $window, sessionFactory){
    this.sessionFactory = sessionFactory;
    this.init();
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$location = $location;
    this.$window = $window;
  }

  init(){
    this.sessionFactory.getUser().then((data, status, headers, config) => {
      this.$rootScope.logged = true;
      this.$rootScope.user = data.username;
      this.$scope.logged = true;
      this.$scope.user = data.username;
      this.$scope.photo = data._json.avatar_url;
    });
  }

  signin(page){
    this.sessionFactory.signin(page);
  }

  logout(){
    this.sessionFactory.logout().then((data, status, headers, config) => {
      this.$state.transitionTo(this.$state.current, {}, {
          reload: true,
          inherit: false,
          notify: true
      });
      this.$window.location.reload();
    });
  }

  getClass(path){
    if (this.$location.path().substr(0, path.length) == path) {
      return "selected";
    } else {
      return "";
    }
  }
}

SessionController.$inject = ['$scope', '$rootScope', '$state', '$location', '$window', 'sessionFactory'];

export { SessionController };
