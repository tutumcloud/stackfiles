angular.module('registry.controllers', [])

.controller('MainController', function($scope, $location, Search, API){
    $scope.search = function(){
        if(this.data.search !== ""){
            Search.setValue(this.data.search);
            $location.path("/registry");
        }
    };

    $scope.signin = function(page){
        API.signin(page);
    };
})

.controller('MyStackController', function($scope, $rootScope, API, Search){
    $scope.user = $rootScope.getUser();

     API.getUserFiles().success(function(data, status, headers, config){
         $scope.files = data;
         $scope.loaded = true;
     }).error(function(data, status, headers, config){
         $scope.err = true;
         $scope.loaded = true;
     });

    $scope.searchFile = function(){
        var term = this.data.search;
        API.searchFile(term).success(function(data, status, headers, config){
            $scope.results = data;
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };
})


.controller('FavoriteController', function($scope, $rootScope, API, Search){

})

.controller('RegistryController', function($scope, $rootScope, $window, API, Search){
    $scope.loaded = false;
    $scope.user = $rootScope.getUser();

    $scope.signin = function(page){
        API.signin(page);
    };

    $scope.deploy = function(id){
        window.location.href = ('/api/v1/deploy/'+id);
    };

    $scope.favorite = function(id){
        if($scope.user !== undefined){
            API.favFile(id).success(function(data, status, headers, config){

            }).error(function(data, status, headers, config){
                $scope.err = true;
            });
        }
    };

    API.getFiles().success(function(data, status, headers, config){
        $scope.files = data;
        $scope.loaded = true;
    }).error(function(data, status, headers, config){
        $scope.err = true;
    });

    API.checkFav().success(function(data, status, header, config){

    }).error(function(data, status, headers, config){
        console.log(data);
    });

    $scope.searchFile = function(){
        var term = this.data.search;
        API.searchFile(term).success(function(data, status, headers, config){
            $scope.results = data;
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };

    $scope.checkSearch = function(){
        if(Search.getValue().search !== null){
            $scope.data = Search.getValue();
            $scope.searchFile(Search.getValue());
        }
    };
})

.controller('RegistryDetailsController', function($scope, $rootScope, $window, $routeParams, API){

    $scope.user = $rootScope.getUser();
    API.getFileWithId($routeParams.registryId).success(function(data, status, headers, config){
        $scope.data = data;
        API.getYAMLFile(data._id, data.projectName, data.path).success(function(yamlData, status, headers, config){
            $scope.composeFile = yamlData;
            $scope.loaded = true;
        }).error(function(data, status, headers, config){
            $scope.composeFile = "Unable to fetch tutum.yml from Github repository. Please select a repository that contains a tutum.yml or a docker-compose.yml file";
            $scope.loaded = true;
        });
    }).error(function(data, status, headers, config){
        window.location.href = ("/404");
    });

    $scope.deploy = function(id){
        window.location.href = ('/api/v1/deploy/'+id);
    };

    $scope.deleteStackfile = function(id){
        API.deleteStackfile(id).success(function(data, status, headers, config){
            $window.location.href = ("/registry");
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };

})

.controller('CreateController', function($scope, $rootScope, $window, API){

    var orgs = [];

    API.getUser().success(function(data, status, headers, config){
         $rootScope.setUser(data.username);
         $scope.user = $rootScope.getUser();
    }).error(function(data, status, headers, config){
        $scope.err = true;
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
            $scope.err = true;
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
            $scope.err = true;
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
            $scope.err = true;
        });
    };

    $scope.getComposeFile = function(orgname, name, branch, path){
        $scope.stackfile = "";
        API.getUserReposInfo(orgname, name, branch, path).success(function(data, status, headers, config){
            if(data === "File not found"){
                $scope.stackfile = "Unable to fetch tutum.yml from Github repository. Please select a repository that contains a tutum.yml or a docker-compose.yml file";
            } else {
                $scope.stackfile = data;
            }
        }).error(function(data, status, headers, config){
            console.log(data);
            $scope.err = true;
        });
    };

    $scope.createNew = function(){
        var title = this.data.title;
        var stackfile = jsyaml.load($scope.stackfile);
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
            window.location.href = ("/404");
        });
    };
});
