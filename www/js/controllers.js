angular.module('registry.controllers', [])

.controller('MainController', function($scope, API){
    $scope.signin = function(){
        API.signin();
    };
})

.controller('RegistryDetailsController', function($scope, $routeParams, API){
    API.getFileWithId($routeParams.registryId).success(function(data, status, headers, config){
        $scope.data = data;
        $scope.composeFile = jsyaml.dump(data.compose);
        $scope.tags = data.tags;
    });
})

.controller('RegistryController', function($scope, API){
    API.getFiles().success(function(data, status, headers, config){
        $scope.files = data;
    }).error(function(data, status, headers, config){
        console.log(data);
    });

    $scope.searchFile = function(){
        var term = this.data.search;
        API.searchFile(term).success(function(data, status, headers, config){
            $scope.results = data;
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };
})

.controller('CreateController', function($scope, $window, API){
    function buildValueArray(array){
        var newArray = [];
        angular.forEach(array, function(value, key){
            newArray.push(value.text);
        });
        return newArray;
    }

    $scope.selectedValue = null;
    var repos = [];

    $scope.getRepos = function(){
        API.getUserRepos().success(function(data, status, headers, config){
            angular.forEach(data, function(value, key){
                repos.push(value.name);
            });
            $scope.repos=repos;
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };

    $scope.getComposeFile = function(name){
        API.getYAMLFile(name).success(function(data, status, headers, config){
            $scope.data.composefile = data;
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };

    $scope.createNew = function(){
        var title = this.data.title;
        var composeFile = jsyaml.load(this.data.composefile);
        var readMe = this.data.readme;
        var tags = this.data.tags;
        var projectName = this.data.selectedValue;

        console.log(projectName);

        var tagArray = buildValueArray(tags);

        var form = {
            title: title.replace(/\(\(/g,'{{').replace(/\)\)/, '}}').replace(/'/g,'\''),
            compose: composeFile,
            readme: readMe,
            tags: tagArray,
            name: projectName

        };
        API.saveFile(form).success(function(data, status, headers, config){
            $window.location.href = ('/registry');
        }).error(function(data, status, header, config){
            console.log(data);
        });
    };
});
