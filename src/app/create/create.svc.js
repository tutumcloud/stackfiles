class CreateService{
  constructor($http){
    this.$http = $http;
  }

  getUserRepos(name){
    return this.$http.get('/api/v1/user/repos', {
      method: 'GET',
      params: {
        name: name
      }
    }).then(r => r.data);
  }

  getUserOrgs(){
    return this.$http.get('/api/v1/user/orgs', {
      method: 'GET'
    }).then(r => r.data);
  }

  getRepobranches(orgname, repo){
    return this.$http.get('/api/v1/user/repos/branches', {
      method: 'GET',
      params: {
        orgname: orgname,
        repo: repo
      }
    }).then(r => r.data);
  }

  getUserRepoInfo(orgname, repo, branch, path){
    return this.$http.post('/api/v1/user/repos/new', {
      method: 'POST',
      params: {
          orgname: orgname,
          repo: repo,
          branch: branch,
          path: path
      }
    }).then(r => r.data);
  }

  saveFile(form){
    return this.$http.post('/api/v1/create', {
      method: 'POST',
      params: {
          form : form
     }
   });
  }

  static factory($http){
    return new CreateService($http);
  }
}

CreateService.factory.$inject = ['$http'];

export { CreateService };
