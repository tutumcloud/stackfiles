angular.module('registry.services', [])

.factory('API', function($http, $window){
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
        searchFile: function(term){
            return $http.get('/api/v1/search',{
                method: 'GET',
                params: {
                    term: term
                }
            });
        },
        getUserRepos: function(){
            return $http.get('/api/v1/user/repos', {
                method: 'GET'
            });
        },

        getYAMLFile: function(repo){
            return $http.post('/api/v1/user/repos/file',{
                method: 'POST',
                params: {
                    repo: repo
                }
            });
        }

     };
});
