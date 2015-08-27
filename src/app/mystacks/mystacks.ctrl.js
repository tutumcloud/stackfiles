class MyStackController {
  constructor($scope, mystacksFactory){
    this.mystacksFactory = mystacksFactory;
    this.$scope = $scope;
    this.init();
  }

  init(){
    this.mystacksFactory.getUserFiles().then(data => {
      this.files = data;
      this.$scope.loaded = true;
    });
  }
}

MyStackController.$inject = ['$scope', 'mystacksFactory'];

export { MyStackController };
