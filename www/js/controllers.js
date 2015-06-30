angular.module('registry.controllers', [])

.controller('MainController', function($scope, API){
    $scope.signin = function(){
        API.signin();
    }
})

.controller('RegistryDetailsController', function($scope){
})

.controller('RegistryController', function($scope){
})

.controller('CreateController', function($scope, $window, API){
    $scope.createNew = function(){
        var title = this.data.title;
        var composeFile = jsyaml.load(this.data.composefile);
        var readMe = this.data.readme;

        var form = {
            title: title.replace(/\(\(/g,'{{').replace(/\)\)/, '}}').replace(/'/g,'\''),
            compose: composeFile,
            readme: readMe,
            user: "Maxime Heckel",
            tags: ["hello", "world","stack"]
        }

        console.log(form)

        API.saveFile(form).success(function(data, status, headers, config){
            $window.location.href = ('/registry');
        }).error(function(data, status, header, config){
            console.log(data);
        })
    }
})
