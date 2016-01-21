describe("jcPaginationController", function () {
    'use strict';

    var $controller,
        $rootScope;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    it('should calculate numberOfPages correctly', function() {
        var vm, $scope = $rootScope.$new();
        vm = $controller('jcPaginationController', { $scope: $scope});

        expect(vm.numberOfPages).toBe(0);
        vm.total = 50;
        vm.pageSize = 10;
        $scope.$apply();
        expect(vm.numberOfPages).toBe(5);
    });

    it('should round up numberOfPages to nearest int.', function() {
        var vm, $scope = $rootScope.$new();
        vm = $controller('jcPaginationController', { $scope: $scope});

        expect(vm.numberOfPages).toBe(0);
        vm.total = 51;
        vm.pageSize = 10;
        $scope.$apply();
        expect(vm.numberOfPages).toBe(6);
    });

});
