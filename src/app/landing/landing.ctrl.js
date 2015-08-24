class MainController{
  constructor(landingFactory) {
    this.landingFactory = landingFactory;
  }
  signin(page){
    this.landingFactory.signin(page);
  }
}

MainController.$inject = ['landingFactory'];

export { MainController };
