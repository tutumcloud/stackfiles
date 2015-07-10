angular.module('registry.controllers', [])

.controller('MainController', function($scope, API){

})

.controller('RegistryController', function($scope, API){
    $scope.signin = function(){
        API.signin();
    };

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

.controller('RegistryDetailsController', function($scope, $routeParams, API){
    API.getFileWithId($routeParams.registryId).success(function(data, status, headers, config){
        $scope.data = data;
        $scope.tags = data.tags;
        API.getYAMLFile(data._id, data.projectName, data.path).success(function(data, status, headers, config){
            $scope.composeFile = data;
        }).error(function(data, status, headers, config){
            $scope.composeFile = "Unable to fetch tutum.yml from Github repository";
        });
        API.getReadmeFile(data._id, data.projectName).success(function(data, status, headers, config){
            $scope.readme = data;
        }).error(function(data, status, headers, config){
            $scope.readme = "Unable to fetch Readme.md from Github repository";
        });
    }).error(function(data, status, headers, config){
        console.log(data);
    });
})

.controller('CreateController', function($scope, $window, API){
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

    $scope.getComposeFile = function(name, path){
        $scope.data.composefile = "";
        API.getUserReposInfo(name, path).success(function(data, status, headers, config){
            $scope.data.composefile = data;
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };

    $scope.getReadme = function(name){
        $scope.data.composefile = "";
        API.getReadmeFile(name).success(function(data, status, headers, config){
            $scope.data.composefile = data;
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };

    $scope.createNew = function(){
        var title = this.data.title;
        var stackfile = jsyaml.load(this.data.composefile);
        var path = this.data.path;
        var projectName = this.data.reponame;



        var form = {
            title: title.replace(/\(\(/g,'{{').replace(/\)\)/, '}}').replace(/'/g,'\''),
            stackfile: stackfile,
            path: path,
            name: projectName
        };

        API.saveFile(form).success(function(data, status, headers, config){
            $window.location.href = ('/registry');
        }).error(function(data, status, header, config){
            console.log(data);
        });
    };
});
