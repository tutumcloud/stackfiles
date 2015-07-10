angular.module('registry.services', [])

.factory('API', function($http, $window, $rootScope){
    $rootScope.setUser = function (user) {
        return $window.localStorage['user'] = user;
    };

    $rootScope.getUser = function () {
        return $window.localStorage['user'];
    };

     return {
         signin: function(){
             $window.location.href = ('/auth/github');
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

         getFiles: function(){
             return $http.get('/api/v1/files',{
                 method: 'GET'
             });
         },
         getFileWithId: function(id){
             return $http.get('/api/v1/files/' + id,{
                 method: 'GET',
                 params: {
                     id: id
                 }
             });
         },
        //CHANGE NAME
         deleteUserFile: function(id){
             return $http.delete('/api/v1/userfiles/' + id,{
                 method:'DELETE',
                 params: {
                     id: id
                 }
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

        getUserReposInfo: function(orgname, repo, path){
            return $http.post('/api/v1/user/repos/new',{
                method: 'GET',
                params: {
                    orgname: orgname,
                    repo: repo,
                    path: path
                }
            });
        },

        getYAMLFile: function(id, repo, path){
            return $http.post('/api/v1/user/repos/file',{
                method: 'POST',
                params: {
                    id : id,
                    repo: repo,
                    path: path
                }
            });
        },
        getReadmeFile: function(id, repo){
            return $http.post('/api/v1/user/repos/readme',{
                method: 'POST',
                params: {
                    id: id,
                    repo: repo
                }
            });
        }

     };
});
