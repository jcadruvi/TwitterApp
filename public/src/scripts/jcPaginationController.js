(function(){
    'use strict';
    angular.module('app').controller('jcPaginationController', ['$scope', jcPaginationController]);

    function jcPaginationController($scope) {
        var vm = this; // jshint ignore:line
        vm.allowPrevious = false;
        vm.allowNext = false;
        vm.currentPage = 1;
        vm.numberOfPages = 0;
        vm.startPage = 1;

        var calculateAllowPreviousAndNext = function () {
            if (vm.currentPage && vm.numberOfPages) {
                vm.allowPrevious = vm.currentPage !== 1;
                vm.allowNext = vm.currentPage === vm.numberOfPages && vm.numberOfPages !== 0;
            }
        };

        var calculateStartPage = function () {
            vm.startPage = vm.currentPage - 2;
            if(vm.startPage < 1) {
                vm.startPage = 1;
            }

            if (vm.startPage + 4 > vm.numberOfPages) {
                vm.startPage = vm.numberOfPages - 4;
            }
        };

        $scope.$watch(['pageSize', 'total'], function(){
            if (vm.total && vm.pageSize) {
                vm.numberOfPages = Math.ceil(vm.total / vm.pageSize);
            }
            calculateAllowPreviousAndNext();
            calculateStartPage();
        });

        $scope.$watch('currentPage', function () {
            calculateAllowPreviousAndNext();
            calculateStartPage();
        });

        vm.doNext = function () {
            if (vm.currentPage < vm.numberOfPages) {
                vm.currentPage++;
            }
            calculateStartPage();
        };

        vm.doPrevious = function () {
            if (vm.currentPage > 1) {
                vm.currentPage--;
            }
            calculateStartPage();
        };
    }
})();
