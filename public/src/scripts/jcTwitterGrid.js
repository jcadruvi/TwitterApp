(function() {
    'use strict';

    angular.module('app').directive('jcTwitterGrid', jcTwitterGrid);

    function jcTwitterGrid() {
        return {
            controller: 'jcTwitterGridController',
            controllerAs: 'vm',
            bindToController: {
                currentPage: '=',
                total: '=',
                tweets: '='
            },
            replace: true,
            restrict: 'E',
            scope: {},
            templateUrl: 'jcTwitterGrid.html'
        };
	}
})();
