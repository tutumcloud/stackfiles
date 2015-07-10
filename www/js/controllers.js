angular.module('registry.controllers', [])

.controller('MainController', function($scope, $location, Search){
    $scope.search = function(){
        if(this.data.search !== ""){
            Search.setValue(this.data.search);
            $location.path("/registry");
        }
    };
})

.controller('RegistryController', function($scope, $window, API, Search){
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

    $scope.checkSearch = function(){
        if(Search.getValue() !== ""){
            $scope.data = Search.getValue();
            $scope.searchFile(Search.getValue());
        }
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

.controller('CreateController', function($scope, $rootScope, $window, API){

    var orgs = [];

    API.getUser().success(function(data, status, headers, config){
         $rootScope.setUser(data.username);
    }).error(function(data, status, headers, config){
        console.log(data);
    });

    $scope.getRepos = function(){
        var repos = [];
        $scope.repos = [];
        var branches = [];
        $scope.branches = [];
        $scope.data.path = "";
        $scope.data.composefile = "";

        API.getUserRepos($scope.data.orgname).success(function(data, status, headers, config){
            angular.forEach(data, function(value, key){
                repos.push(value.name);
            });
            $scope.repos=repos;
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };

    $scope.getOrgs = function(){
        API.getUserOrgs().success(function(data, status, headers, config){
            angular.forEach(data, function(value, key){
                orgs.push(value.login);
            });
            orgs.push($rootScope.getUser());
            $scope.orgs=orgs;
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };

    $scope.getBranches = function(){
        var branches = [];
        $scope.branches = [];
        $scope.data.path = "";
        $scope.data.composefile = "";
        API.getRepoBranches($scope.data.orgname, $scope.data.reponame).success(function(data, status, headers, config){
            angular.forEach(data, function(value, key){
                branches.push(value);
            });
            $scope.branches=branches;
        }).error(function(data, status, headers, config){
            console.log(data);
        });
    };

    $scope.getComposeFile = function(orgname, name, branch, path){
        $scope.data.composefile = "";
        API.getUserReposInfo(orgname, name, branch, path).success(function(data, status, headers, config){
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
        var branch = this.data.branch;
        var path = this.data.path;
        var projectName = this.data.reponame;
        var organizationName = this.data.orgname;

        var form = {
            title: title.replace(/\(\(/g,'{{').replace(/\)\)/, '}}').replace(/'/g,'\''),
            stackfile: stackfile,
            branch: branch,
            path: path,
            name: projectName,
            orgname: organizationName
        };

        API.saveFile(form).success(function(data, status, headers, config){
            $window.location.href = ('/registry');
        }).error(function(data, status, header, config){
            console.log(data);
        });
    };
});
