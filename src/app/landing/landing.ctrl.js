class MainController{
  constructor($state, $window, landingFactory) {
    this.landingFactory = landingFactory;
    this.$state = $state;
    this.$window = $window;
  }
  signin(page){
    this.landingFactory.signin(page);
  }

  search(){
    if(this.data.search !== ""){
      this.$window.localStorage.search = this.data.search;
      console.log(this.$window.localStorage.search);
      this.$state.go("registry");
    }
  }
}

MainController.$inject = ['$state', '$window', 'landingFactory'];

export { MainController };
