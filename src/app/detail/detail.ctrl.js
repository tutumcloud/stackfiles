class DetailController{
 constructor($scope, $rootScope, $state, $window, $stateParams, detailFactory){
   this.$scope = $scope;
   this.$rootScope = $rootScope;
   this.$state = $state;
   this.$window = $window;
   this.$stateParams = $stateParams;
   this.detailFactory = detailFactory;
   this.init();
 }

 init(){
   if(this.$rootScope.logged){
     this.$scope.user = this.$rootScope.user;
     this.$scope.logged = this.$rootScope.logged;
   }

   this.detailFactory.getFileWithId(this.$stateParams.id).then(r => {
     this.data = r.data;
     if(r.status < 300){
       this.detailFactory.getYAMLFile(r.data._id, r.data.projectName, r.data.path).then(yamlData => {
         this.composeFile = yamlData;
         this.$scope.loaded = true;
       });
     }
   }, () => {
     this.$state.go('404');
   });
 }

 deleteStackfile(id){
   this.detailFactory.deleteStackfile(id).then(() => {
     this.$state.go('registry', {}, { reload: true, inherit: false, notify: true });
   });
 }
}

DetailController.$inject = ['$scope', '$rootScope', '$state', '$window', '$stateParams', 'detailFactory'];

export { DetailController };
