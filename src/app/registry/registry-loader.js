class Loader {
  constructor(registryFactory) {
    this.registryFactory = registryFactory;
    this.items = [];
    this.busy = false;
    this.after = 1;
  }

  nextPage() {
    if (this.busy) return;
    this.busy = true;
    var self = this;

    return this.registryFactory.getFiles(this.after).then(files => {
      var list = files;
      if(list.length === 0){
        self.busy = true;
        return;
      } else {
        for(var i = 0; i < list.length; i++){
            self.items.push(list[i]);
        }
        self.after = self.after + 1;
        self.busy = false;
      }
    }, () => {
      self.items = [];
    });
  }

  static factory(registryFactory){
    return new Loader(registryFactory);
  }
}

Loader.$inject = ['registryFactory'];

export { Loader };
