(function(){
    'use strict';
    angular.module('app').controller('jcTwitterGridController', ['$scope', jcTwitterGridController]);

    function jcTwitterGridController($scope) {
        var vm = this; // jshint ignore:line

        vm.pageBegin = 0;

        var calulateBegin = function() {
            if (vm.currentPage && vm.pageSize) {
                vm.pageBegin = (vm.currentPage - 1) * vm.pageSize;
            }
        };

        $scope.$watch('currentPage', function(){
            calulateBegin();
        });

        $scope.$watch('pageSize', function(){
            calulateBegin();
        });
    }
})();
