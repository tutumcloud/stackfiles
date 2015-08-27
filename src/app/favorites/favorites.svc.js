class FavoriteService{
  constructor($http){
    this.$http = $http;
  }

  getUserFavorites(){
    return this.$http.get('/api/v1/user/favorites',{
        method: 'GET'
    }).then(r => r.data);
  }

  static factory($http){
    return new FavoriteService($http);
  }
}

FavoriteService.factory.$inject = ['$http'];

export { FavoriteService };
