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
         userFiles: function(){
             return $http.get('/api/v1/userfiles',{
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
         userFileWithId: function(id){
             return $http.get('/api/v1/userfiles/' + id,{
                 method: 'GET',
                 params: {
                     id: id
                 }
             });
         },
         updateUserFile: function(id, form){
             return $http.post('/api/v1/userfiles/update',{
                method: 'POST',
                params: {
                    id: id,
                    form: form
                }
             });
         },
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
        getUserRepos: function(){
            return $http.get('/api/v1/user/repos', {
                method: 'GET'
            });
        },

        getYAMLFile: function(repo, path){
            return $http.post('/api/v1/user/repos/file',{
                method: 'POST',
                params: {
                    repo: repo,
                    path: path
                }
            });
        },
        getReadmeFile: function(repo){
            return $http.post('/api/v1/user/repos/readme',{
                method: 'POST',
                params: {
                    repo: repo
                }
            });
        }

     };
});
