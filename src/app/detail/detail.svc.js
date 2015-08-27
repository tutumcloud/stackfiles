class DetailService{
  constructor($http){
    this.$http = $http;
  }

  getFileWithId(id){
    return this.$http.get('/api/v1/files/' + id, {
      method: 'GET',
      params: {
        id: id
      }
    }).then(r => r.data);
  }

  getYAMLFile(id, repo, path){
    return this.$http.post('/api/v1/user/repos/file', {
      method: 'POST',
      params: {
        id: id,
        repo: repo,
        path: path
      }
    }).then(r => r.data);
  }

  deleteStackfile(id){
    return this.$http.delete('/api/v1/files/' + id, {
      method: 'DELETE',
      params: {
        id: id
      }
    }).then(r => r.data);
  }

  static factory($http){
    return new DetailService($http);
  }
}

DetailService.factory.$inject = ['$http'];

export { DetailService };
