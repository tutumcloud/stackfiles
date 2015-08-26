class FavoriteController{
  constructor($scope, $rootScope, favoritesFactory){
    this.favoritesFactory = favoritesFactory;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.init();
  }

  init(){
    this.favoritesFactory.getUserFavorites().then(data => {
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

  removeRow(file){
    var index = -1;
		for( var i = 0; i < this.files.length; i++ ) {
			if( this.files[i]._id === file._id ) {
				index = i;
				break;
			}
		}
		this.files.splice( index, 1 );
  }

  searchFile(){
    var term = this.data.search;
    this.favoritesFactory.searchFile(term).then(results => {
      this.results = results;
    });
  }
}

FavoriteController.$inject = ['$scope', '$rootScope', 'favoritesFactory'];

export { FavoriteController };
