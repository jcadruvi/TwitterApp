(function() {
    'use strict';

    angular.module('app').directive('jcPagination', jcPagination);

    function jcPagination() {
        return {
            controller: 'jcPaginationController',
            controllerAs: 'vm',
            bindToController: {
                currentPage: '=',
                pageSize: '=',
                total: '='
            },
            replace: true,
            restrict: 'E',
            scope: {},
            templateUrl: 'jcPagination.html'
        };
	}
})();