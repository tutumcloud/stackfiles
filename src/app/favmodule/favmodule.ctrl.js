class FavController{
  constructor($scope, $rootScope, favFactory){
    this.favFactory = favFactory;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.init();
    this.$scope.favoriteList = [];

  }

  init(){
    if(this.$rootScope.logged){
      this.$scope.user = this.$rootScope.user;
      this.$scope.logged = this.$rootScope.logged;
      this.favFactory.checkFav().then(favorites => {
        this.$scope.favoriteList = favorites.data;
      });
    }
  }

  increment(file){
    if(this.$rootScope.logged){
      file.stars = file.stars + 1;
    }
  }

  toggleStatus(file){
    this.favFactory.favFile(file._id).then(() => {
      if(this.$rootScope.logged){
        this.$scope.favoriteList.push(file._id);
      }
    });
  }

  unToggleStatus(file){
    this.favFactory.unFavFile(file._id).then(() => {
      if(this.$scope.logged){
        var index = this.$scope.favoriteList.indexOf(file._id);
        this.$scope.favoriteList.splice(index, 1);
      }
    });
  }

  isSelected(file){
    return this.$scope.favoriteList.indexOf(file._id) > -1;
  }
}

FavController.$inject = ['$scope', '$rootScope', 'favFactory'];

export { FavController };
