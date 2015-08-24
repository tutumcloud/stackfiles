class MainService {
  constructor($window){
    this.$window = $window;
  }

  signin(page){
    this.$window.location.href = ('/auth/github?redirect=' + page);
  }

  static factory($window){
    return new MainService($window);
  }
}

MainService.factory.$inject = ['$window'];

export { MainService };
