class MyStackService {
  constructor($http){
    this.$http = $http;
  }

  getUserFiles(){
    return this.$http.get('/api/v1/user/files', {
      method: 'GET',
    }).then(r => r.data);
  }

  searchFile(term){
    return this.$http.get('/api/v1/search', {
      method: 'GET',
      params: {
        term: term
      }
    }).then(r => r.data);
  }

  static factory($http){
    return new MyStackService($http);
  }

}

MyStackService.factory.$inject = ['$http'];

export { MyStackService };
