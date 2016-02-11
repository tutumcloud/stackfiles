angular.module('registry.services', [])

.factory('API', function($http, $window, $rootScope){
     var session = {
         logged: false,
         user: null
     };

     return {
         signin: function(page){
             $window.location.href = ('/auth/github?redirect=' + page);
         },

         logout: function(){
             return $http.get('/auth/logout', {
                 method: 'GET'
             });
         },

         redirectErr: function(){
             $window.location.href = ('/404');
         },

         saveFile: function(form){
             return $http.post('/api/v1/create', {
                 method: 'POST',
                 params: {
                     form : form
                }
             });
         },

         getRegistry: function(){
             return http.get('/registry');
         },

         favFile: function(id){
            return $http.get('/api/v1/files/fav/' +id,{
                method: 'GET'
            });
         },

         unFavFile: function(id){
            return $http.get('/api/v1/files/unfav/' +id,{
                method: 'GET'
            });
         },

         checkFav: function(){
             return $http.get('/api/v1/user/fav', {
                 method: 'GET'
             });
         },

         getFiles: function(page){
             return $http.get('/api/v1/files/',{
                 method: 'GET',
                 params: {
                     page: page,
                     limit: 5
                 }
             });
         },

         getFileWithId: function(id){
             return $http.get('/api/v1/files/' + id,{
                 method: 'GET'
             });
         },

         getUserFiles: function(){
             return $http.get('/api/v1/user/files',{
                 method: 'GET'
             });
         },

         getUserFavorites: function(){
             return $http.get('/api/v1/user/favorites',{
                 method: 'GET'
             });
         },

         deleteStackfile: function(id){
             return $http.delete('/api/v1/files/' + id,{
                 method:'DELETE'
             });
         },

        searchFile: function(term){
            return $http.get('/api/v1/search',{
                method: 'GET',
                params: {
                    term: term
                }
            });
        },

        getUser: function(){
            return $http.get('/api/v1/user', {
                method: 'GET'
            });
        },

        getUserRepos: function(name){
            return $http.get('/api/v1/user/repos', {
                method: 'GET',
                params:{
                    name: name
                }
            });
        },

        getUserOrgs: function(){
            return $http.get('/api/v1/user/orgs', {
                method: 'GET'
            });
        },

        getRepoBranches: function(orgname, repo){
            return $http.get('/api/v1/user/repos/branches', {
                method: 'GET',
                params: {
                    orgname: orgname,
                    repo: repo
                }
            });
        },

        getUserReposInfo: function(orgname, repo, branch, path){
            return $http.get('/api/v1/user/repos/new',{
                method: 'GET',
                params: {
                    orgname: orgname,
                    repo: repo,
                    branch: branch,
                    path: path
                }
            });
        },

        getYAMLFile: function(id, repo, path){
            return $http.get('/api/v1/user/repos/file',{
                method: 'GET',
                params: {
                    id : id,
                    repo: repo,
                    path: path
                }
            });
        }
     };
})

.factory('Loader', function(API) {
  var  Loader = function() {
    this.items = [];
    this.busy = false;
    this.after = 1;
  };

  Loader.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;
    var self = this;

    return API.getFiles(this.after).success(function(data, status, headers, config){
        var list = data;
        if(data.length === 0){
            self.busy = true;
            return;
        } else {
            for(var i = 0; i < list.length; i++){
                self.items.push(list[i]);
            }
            self.after = self.after + 1;
            self.busy = false;
        }

    }).error(function(data, status, headers, config){
        self.busy = false;
    });
  };
  return Loader;
});
