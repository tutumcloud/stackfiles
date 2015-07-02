angular.module('registry.services', [])

.factory('API', function($http, $window){
     return {
         signin: function(){
             $window.location.href = ('/auth/github');
         },
         saveFile: function(form){
             return $http.post('/create', {
                 method: 'POST',
                 params: {
                     form : form
                }
             });
         },
         getFiles: function(){
             return $http.get('/files',{
                 method: 'GET'
             });
         },
         getFileWithId: function(id){
             return $http.get('/files/' + id,{
                 method: 'GET',
                 params: {
                     id: id
                 }
             });
         },
        searchFile: function(term){
            return $http.get('/search',{
                method: 'GET',
                params: {
                    term: term
                }
            });
        }
     };
});
