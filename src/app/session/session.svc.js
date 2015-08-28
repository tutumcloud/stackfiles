class SessionService {
  constructor($http, $window){
    this.$http = $http;
    this.$window = $window;
  }

  signin(page){
    this.$window.location.href = ('/auth/github?redirect=' + page);
  }

  getUser(){
    return this.$http.get('/api/v1/user', {
      method: 'GET'
    }).then(r => r);
  }

  logout(){
    return this.$http.get('/auth/logout', {
      method: 'GET'
    }).then(r => r.data);
  }

  static factory($http, $window){
    return new SessionService($http, $window);
  }

}

SessionService.factory.$inject = ['$http', '$window'];

export { SessionService };
