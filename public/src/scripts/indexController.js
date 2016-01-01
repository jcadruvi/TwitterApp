(function() {
   'use strict';
   angular.module("app")
          .controller("indexController", ["$scope", "indexService", indexController]);

   function indexController($scope, indexService) {
      var vm = this; // jshint ignore:line

      vm.service = indexService;
      vm.service.init();
   }
})();
