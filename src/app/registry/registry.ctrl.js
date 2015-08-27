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
    this.$scope.files = this.registryLoader;
    this.$scope.loaded = true;
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
