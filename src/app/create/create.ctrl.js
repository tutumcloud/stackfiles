class CreateController{
  constructor($scope, $rootScope, $state, $window, createFactory){
    this.createFactory = createFactory;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$window = $window;
    this.init();
  }

  init(){
    if(this.$rootScope.logged){
      this.$scope.user = this.$rootScope.user;
      this.$scope.locked = false;
      this.$scope.stackfile = "Unable to fetch tutum.yml from Github repository. Please select a repository that contains a tutum.yml or a docker-compose.yml file";
    }
  }

  getOrgs(){
    var orgs = [];
    var repos = [];
    var branches = [];
    this.data.path = "/";
    this.$scope.stackfile = "Window will automatically refresh after filling form.";

    this.createFactory.getUserOrgs().then(data => {
      angular.forEach(data, (value, key) => {
        orgs.push(value.login);
      });
      orgs.push(this.$scope.user);
      this.$scope.orgs = orgs;
    });
  }

  getRepos(){
    var repos = [];
    var branches = [];
    this.data.path = "/";
    this.$scope.stackfile = "Window will automatically refresh after filling form.";

    this.createFactory.getUserRepos(this.data.orgname).then(data => {
      this.$scope.repos = [];
      angular.forEach(data, (value, key) => {
          repos.push(value.name);
      });
      this.$scope.repos = repos;
    });
  }

  getBranches(){
    var branches = [];
    this.data.path = "/";
    this.$scope.stackfile = "Window will automatically refresh after filling form.";

    this.createFactory.getRepobranches(this.data.orgname, this.data.reponame).then(data => {
      angular.forEach(data, (value, key) => {
        branches.push(value);
      });
      this.$scope.branches = branches;
    });
  }

  getComposeFile(orgname, name, branch, path){
    if(orgname === undefined){
      return;
    }
    this.$scope.stackfile = "";
    this.createFactory.getUserRepoInfo(orgname, name, branch, path).then(data => {
      if(data === "File not found"){
        this.$scope.stackfile = "Unable to fetch tutum.yml from Github repository. Please select a repository that contains a tutum.yml or a docker-compose.yml file";
        this.$scope.locked = true;
      } else {
        this.$scope.locked = false;
        this.$scope.stackfile = data;
      }
    });
  }

  createNew(){
    var title = this.data.title;
    var stackfile = jsyaml.load(this.$scope.stackfile);
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

    this.createFactory.saveFile(form).then(() => {
      this.$state.go('registry');
    });
  }
}

CreateController.$inject = ['$scope', '$rootScope', '$state', '$window', 'createFactory'];

export { CreateController };
