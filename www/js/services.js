angular.module('registry.services', [])

.factory('API', function($http, $window){
     return {
         signin: function(){
             $window.location.href = ('/auth/github');
         },
     }
})
