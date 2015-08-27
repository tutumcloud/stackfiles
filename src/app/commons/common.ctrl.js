class CommonController{
  constructor($scope, commonFactory){
    this.$scope = $scope;
    this.commonFactory = commonFactory;
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
    this.commonFactory.searchFile(term).then(results => {
      this.results = results;
    });
  }
}

CommonController.$inject = ['$scope', 'commonFactory'];

export { CommonController };
