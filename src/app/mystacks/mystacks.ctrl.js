class MyStackController {
  constructor($scope, $state, mystacksFactory){
    this.mystacksFactory = mystacksFactory;
    this.$scope = $scope;
    this.$state = $state;
    this.init();
  }

  init(){
    this.mystacksFactory.getUserFiles().then(data => {
      this.files = data;
      this.$scope.loaded = true;
    }, (data) => {
      console.log('not logged in');
    });
  }
}

MyStackController.$inject = ['$scope', '$state', 'mystacksFactory'];

export { MyStackController };
