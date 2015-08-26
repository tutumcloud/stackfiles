class FavService{
  constructor($http){
    this.$http = $http;
  }

  checkFav(){
    return this.$http.get('/api/v1/user/fav', {
      method: 'GET'
    });
  }
  
  favFile(id){
    return this.$http.get('/api/v1/files/fav/' + id, {
      method: 'GET'
    }).then(r => r.data);
  }

  unFavFile(id){
    return this.$http.get('/api/v1/files/unfav/' + id, {
      method: 'GET'
    }).then(r => r.data);
  }

  static factory($http){
    return new FavService($http);
  }
}

FavService.factory.$inject = ['$http'];

export { FavService };
