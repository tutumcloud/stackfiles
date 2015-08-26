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

  searchFile(term){
    var term = this.data.search;
    this.mystacksFactory.searchFile(term).then(results => {
      this.results = results;
    });
  }
}

MyStackController.$inject = ['$scope', 'mystacksFactory'];

export { MyStackController };
