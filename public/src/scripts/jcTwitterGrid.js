(function() {
    'use strict';

    angular.module('app').directive('jcTwitterGrid', jcTwitterGrid);

    function jcTwitterGrid() {
        return {
            controller: 'jcTwitterGridController',
            controllerAs: 'vm',
            bindToController: {
                pageSize: '=',
                tweets: '='
            },
            replace: true,
            restrict: 'E',
            scope: {},
            templateUrl: 'jcTwitterGrid.html'
        };
	}
})();
