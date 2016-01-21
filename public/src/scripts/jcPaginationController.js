(function(){
    'use strict';
    angular.module('app').controller('jcPaginationController', ['$scope', jcPaginationController]);

    function jcPaginationController($scope) {
        var vm = this; // jshint ignore:line
        vm.numberOfPages = 0;
        $scope.$watch(['pageSize', 'total'], function(){
            if (vm.total && vm.pageSize) {
                vm.numberOfPages = Math.ceil(vm.total / vm.pageSize);
            }
        });
    }
})();
