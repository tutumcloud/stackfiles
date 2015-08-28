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
    this.sessionFactory.getUser().then(r => {
      console.log('USER REQUEST');
      console.log(r);
      this.$rootScope.logged = true;
      this.$rootScope.user = r.data.username;
      this.$scope.logged = true;
      this.$scope.user = r.data.username;
      this.$scope.photo = r.data._json.avatar_url;
    });
  }

  signin(page){
    this.sessionFactory.signin(page);
  }

  logout(){
    this.sessionFactory.logout().then((data, status, headers, config) => {
      this.$rootScope.logged = false;
      this.$scope.logged = false;
      this.$window.location.reload();
      this.$state.go('registry');
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
