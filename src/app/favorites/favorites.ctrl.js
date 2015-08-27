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
}

FavoriteController.$inject = ['$scope', '$rootScope', 'favoritesFactory'];

export { FavoriteController };
