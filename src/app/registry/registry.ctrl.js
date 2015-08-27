class RegistryController{
  constructor($scope, $rootScope, $state, $window, registryFactory, registryLoader){
    this.registryFactory = registryFactory;
    this.registryLoader = registryLoader;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$window = $window;
    this.init();
  }

  init(){
    console.log('Called');
    this.$scope.files = this.registryLoader;
    this.$scope.loaded = true;
  }

  toggleModal(){
    this.$scope.copyText = {status: 'notClicked'};
    this.$scope.showModal = !this.$scope.showModal;
  }

  generateEmbed(id){
    this.$scope.embedScript = '<script src="'+window.location.protocol+'//'+window.location.hostname+'/embed/file/'+id+'.js"></script>';
  }

  deploy(id){
    window.location.href = ('/api/v1/deploy/'+id);
  }

  searchFile(){
    var term = this.data.search;
    this.registryFactory.searchFile(term).then(results => {
      this.results = results;
    });
  }

  checkSearch(){
    if(this.$window.localStorage.search !== undefined){
      this.$scope.data = {search: this.$window.localStorage.search};
      this.registryFactory.searchFile(this.$window.localStorage.search).then(results => {
        this.results = results;
      });
      this.$window.localStorage.clear();
    }
  }

}

RegistryController.$inject = ['$scope', '$rootScope', '$state', '$window','registryFactory', 'registryLoader'];

export { RegistryController };
