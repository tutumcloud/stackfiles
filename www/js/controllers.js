angular.module('registry.controllers', [])

.controller('SessionController', function($scope, $rootScope, $location, API){
    $scope.logged = false;
    API.getUser().success(function(data, status, headers, config){
         $rootScope.logged = true;
         $rootScope.user = data.username;
         $scope.logged = true;
         $scope.user = data.username;
         $scope.photo = data._json.avatar_url;
    }).error(function(data, status, headers, config){
        $scope.err = true;
    });

    $scope.signin = function(page){
        API.signin(page);
    };

    $scope.logout = function(){
        API.logout().success(function(data, status, headers, config){
            window.location.href = ('/registry');
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };

    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
          return "selected";
        } else {
          return "";
        }
    };
})

.controller('FavController', function($scope, $rootScope, API){
    $scope.favoriteList = [];

    if($rootScope.logged){
        $scope.user = $rootScope.user;
        $scope.logged = $rootScope.logged;
        API.checkFav().success(function(data, status, header, config){
            $scope.favoriteList = data;
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    }

    $scope.increment = function(file){
      if($rootScope.logged){
        file.stars = file.stars +1;
      }
    };

    $scope.toggleStatus = function(file) {
        API.favFile(file._id).success(function(data, status, headers, config){
            if($scope.logged){
                $scope.favoriteList.push(file._id);
            }
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };

    $scope.unToggleStatus = function(file) {
        API.unFavFile(file._id).success(function(data, status, headers, config){
          var index = $scope.favoriteList.indexOf(file._id);
          $scope.favoriteList.splice(index, 1);
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };

    $scope.isSelected = function(file) {
        return $scope.favoriteList.indexOf(file._id) > -1;
    };
})

.controller('MainController', function($scope, $window, API){
    $scope.search = function(){
        if(this.data.search !== ""){
            $window.localStorage.search = this.data.search;
            window.location.href = ("/registry");
        }
    };

    $scope.goTo = function(page){
        window.location.href = ("/registry");
    };

    $scope.signin = function(page){
        API.signin(page);
    };
})

.controller('MyStackController', function($scope, API){

     $scope.logged = true;

     API.getUserFiles().success(function(data, status, headers, config){
         $scope.files = data;
         $scope.loaded = true;
     }).error(function(data, status, headers, config){
         $scope.err = true;
         $scope.loaded = true;
     });

     $scope.deploy = function(id){
         window.location.href = ('/api/v1/deploy/'+id);
     };

     $scope.showModal = false;
     $scope.toggleModal = function(){
         $scope.showModal = !$scope.showModal;
     };

     $scope.generateEmbed = function(id){
         $scope.embedScript = '<script src="'+window.location.protocol+'//'+window.location.hostname+'/embed/file/'+id+'.js"></script>';
     };

    $scope.searchFile = function(){
        var term = this.data.search.replace(/[^a-zA-Z0-9]/g,' ');
        API.searchFile(term).success(function(data, status, headers, config){
            $scope.results = data;
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };
})


.controller('FavoriteController', function($scope, $rootScope, API){

    if($rootScope.logged){
        $scope.logged = $rootScope.logged;
    }

    API.getUserFavorites().success(function(data, status, headers, config){
        $scope.files = data;
        $scope.loaded = true;
    }).error(function(data, status, headers, config){
        $scope.err = true;
        $scope.loaded = true;
    });

    $scope.deploy = function(id){
        window.location.href = ('/api/v1/deploy/'+id);
    };

    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };

    $scope.generateEmbed = function(id){
        $scope.embedScript = '<script src="'+window.location.protocol+'//'+window.location.hostname+'/embed/file/'+id+'.js"></script>';
    };

    $scope.removeRow = function(file){
		var index = -1;
		for( var i = 0; i < $scope.files.length; i++ ) {
			if( $scope.files[i]._id === file._id ) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Oops something went wrong" );
		}
		$scope.files.splice( index, 1 );
	};

   $scope.searchFile = function(){
       var term = this.data.search.replace(/[^a-zA-Z0-9]/g,' ');
       API.searchFile(term).success(function(data, status, headers, config){
           $scope.results = data;
       }).error(function(data, status, headers, config){
           $scope.err = true;
       });
   };
})

.controller('RegistryController', function($scope, $rootScope, $window, API, Loader){

    $scope.files = new Loader();

    if($rootScope.logged === true){
        API.checkFav().success(function(data, status, header, config){
            $scope.favoriteList = data;
            $scope.loaded = true;
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
        $scope.logged = true;
    } else {
        $scope.loaded = true;
    }


    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.copyText= {status: 'notClicked'};
        $scope.showModal = !$scope.showModal;
    };

    $scope.generateEmbed = function(id){
        $scope.embedScript = '<script src="'+window.location.protocol+'//'+window.location.hostname+'/embed/file/'+id+'.js"></script>';
    };

    $scope.deploy = function(id){
        window.location.href = ('/api/v1/deploy/'+id);
    };

    $scope.searchFile = function(){
        var term = this.data.search.replace(/[^a-zA-Z0-9]/g,' ');
        API.searchFile(term).success(function(data, status, headers, config){
            $scope.results = data;
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };

    $scope.checkSearch = function(){
        if($window.localStorage.search !== undefined){
            $scope.data = {search:$window.localStorage.search};
            API.searchFile($window.localStorage.search.replace(/[^a-zA-Z0-9]/g,' ')).success(function(data, status, headers, config){
                $scope.results = data;
            }).error(function(data, status, headers, config){
                $scope.err = true;
            });
            $window.localStorage.clear();
        }
    };

})

.controller('RegistryDetailsController', function($scope, $rootScope, $window, $routeParams, API){
    API.getFileWithId($routeParams.registryId).success(function(data, status, headers, config){
        $scope.data = data;
        API.getYAMLFile(data._id, data.projectName, data.path).success(function(yamlData, status, headers, config){
            $scope.composeFile = yamlData;
            $scope.images = processImages(data.images);
            $scope.downloadLink = "https://github.com/" + data.user + "/" + data.projectName + "/raw/" + data.branch + data.path + "docker-compose.yml";
            $scope.loaded = true;
        }).error(function(data, status, headers, config){
            $scope.composeFile = "Unable to fetch tutum.yml from Github repository. Please select a repository that contains a tutum.yml or a docker-compose.yml file";
            $scope.loaded = true;
        });
    }).error(function(data, status, headers, config){
        window.location.href = ("/404");
    });

    if($rootScope.logged){
        $scope.user = $rootScope.user;
        $scope.logged = $rootScope.logged;
    }

    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };

    $scope.generateEmbed = function(id){
        $scope.embedScript = '<script src="'+window.location.protocol+'//'+window.location.hostname+'/embed/file/'+id+'.js"></script>';
    };

    $scope.deploy = function(id){
        window.location.href = ('/api/v1/deploy/'+id);
    };

    $scope.toggleStatus = function(file) {
        $scope.favoriteList.push(file._id);
        API.favFile(file._id).success(function(data, status, headers, config){

        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };
    $scope.isSelected = function(file) {
        return $scope.favoriteList.indexOf(file._id) > -1;
    };

    $scope.deleteStackfile = function(id){
        API.deleteStackfile(id).success(function(data, status, headers, config){
            $window.location.href = ("/registry");
        }).error(function(data, status, headers, config){
            $window.location.href = ("/registry");
        });
    };

    processImages = function(images){
      var processedImages = [];
      images.forEach(function(item){
        image = item.split(':')[0];
        if(image.split('/').length === 1){
          image = "library/" + image;
        }
        processedImages.push(image);
      });
      return processedImages;
    };
})

.controller('CreateController', function($scope, $rootScope, $window, API){
    var orgs = [];

    if($rootScope.logged){
        $scope.user = $rootScope.user;
        $scope.logged = $rootScope.logged;
    }

    $scope.getOrgs = function(){
        var orgs = [];
        var repos = [];
        var branches = [];
        $scope.stackfile = "Window will automatically refresh after filling form.";
        API.getUserOrgs().success(function(data, status, headers, config){
            angular.forEach(data, function(value, key){
                orgs.push(value.login);
            });
            orgs.push($scope.user);
            $scope.orgs=orgs;
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };

    $scope.getRepos = function(){
        var repos = [];
        var branches = [];
        $scope.data.path = "/";
        $scope.stackfile = "Window will automatically refresh after filling form.";
        API.getUserRepos($scope.data.orgname).success(function(data, status, headers, config){
            $scope.repos = [];
            angular.forEach(data, function(value, key){
                repos.push(value.name);
            });
            $scope.repos=repos;
        }).error(function(data, status, headers, config){
            $scope.err = true;
        });
    };

    $scope.getBranches = function(){
        var branches = [];
        $scope.data.path = "/";
        $scope.stackfile = "Window will automatically refresh after filling form.";
        if($scope.data.reponame !== null){
            $scope.branches = [];
            API.getRepoBranches($scope.data.orgname, $scope.data.reponame).success(function(data, status, headers, config){
                angular.forEach(data, function(value, key){
                    branches.push(value);
                });
                $scope.branches=branches;
            }).error(function(data, status, headers, config){
                $scope.err = true;
            });
        }

    };

    $scope.locked = false;

    $scope.getComposeFile = function(orgname, name, branch, path){

        $scope.stackfile = "";
        API.getUserReposInfo(orgname, name, branch, path).success(function(data, status, headers, config){
            if(data === "File not found"){
                $scope.stackfile = "Unable to fetch tutum.yml from Github repository. Please select a repository that contains a tutum.yml or a docker-compose.yml file";
                $scope.locked = true;
            } else {
                $scope.locked = false;
                $scope.stackfile = data;
            }
        }).error(function(data, status, headers, config){
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
        var description = this.data.description;

        var form = {
            title: title.replace(/[^a-zA-Z0-9]/g,' '),
            stackfile: stackfile,
            branch: branch,
            path: path,
            name: projectName,
            orgname: organizationName,
            description: description
        };

        API.saveFile(form).success(function(data, status, headers, config){
            $window.location.href = ('/registry');
        }).error(function(data, status, header, config){
            window.location.href = ("/404");
        });
    };
});
