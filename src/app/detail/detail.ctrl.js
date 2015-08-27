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

   this.detailFactory.getFileWithId(this.$stateParams.id).then(data => {
     this.data = data;
     this.detailFactory.getYAMLFile(data._id, data.projectName, data.path).then(yamlData => {
       this.composeFile = yamlData;
       this.$scope.loaded = true;
     });
   });
 }

 toggleModal(){
   this.$scope.showModal = !this.$scope.showModal;
 }

 generateEmbed(id){
   this.$scope.embedScript = '<script src="'+window.location.protocol+'//'+window.location.hostname+'/embed/file/'+id+'.js"></script>';
 }

 deploy(id){
   window.location.href = ('/api/v1/deploy/'+id);
 }

 deleteStackfile(id){
   this.detailFactory.deleteStackfile(id).then(() => {
     this.$state.go('mystacks', {}, { reload: true, inherit: false, notify: true });
   });
 }
}

DetailController.$inject = ['$scope', '$rootScope', '$state', '$window', '$stateParams', 'detailFactory'];

export { DetailController };
