class CommonService{
  constructor($http){
    this.$http = $http;
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
    return new CommonService($http);
  }
}

CommonService.factory.$inject = ['$http'];

export { CommonService };
