class RegistryService {
  constructor($http){
    this.$http = $http;
  }

  getFiles(page){
    return this.$http.get('/api/v1/files/',{
      method: 'GET',
      params: {
          page: page,
          limit: 5
      }
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
    return new RegistryService($http);
  }
}

RegistryService.factory.$inject = ['$http'];

export { RegistryService };
