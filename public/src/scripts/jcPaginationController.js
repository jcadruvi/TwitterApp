(function(){
    'use strict';
    angular.module('app').controller('jcPaginationController', ['$scope', jcPaginationController]);

    function jcPaginationController($scope) {
        var vm = this; // jshint ignore:line
        vm.allowPrevious = false;
        vm.allowNext = false;
        vm.currentPage = 1;
        vm.numberOfPages = 0;

        var calculateAllowPreviousAndNext = function () {
            if (vm.currentPage && vm.numberOfPages) {
                vm.allowPrevious = vm.currentPage !== 1;
                vm.allowNext = vm.currentPage === vm.numberOfPages && vm.numberOfPages !== 0;
            }
        };

        $scope.$watch(['pageSize', 'total'], function(){
            if (vm.total && vm.pageSize) {
                vm.numberOfPages = Math.ceil(vm.total / vm.pageSize);
            }
            calculateAllowPreviousAndNext();
        });

        $scope.$watch('currentPage', function () {
           calculateAllowPreviousAndNext();
        });
    }
})();
