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

    it('should calculate allowPrevious false correctly.', function () {
        var vm, $scope = $rootScope.$new();
        vm = $controller('jcPaginationController', { $scope: $scope});

        expect(vm.allowPrevious).toBe(false);
        vm.total = 51;
        vm.pageSize = 10;
        vm.currentPage = 1;
        $scope.$apply();
        expect(vm.allowPrevious).toBe(false);
    });

    it('should calculate allowPrevious true correctly.', function () {
        var vm, $scope = $rootScope.$new();
        vm = $controller('jcPaginationController', { $scope: $scope});

        expect(vm.allowPrevious).toBe(false);
        vm.total = 51;
        vm.pageSize = 10;
        vm.currentPage = 2;
        $scope.$apply();
        expect(vm.allowPrevious).toBe(true);
    });

    it('should calculate allowNext false correctly.', function () {
        var vm, $scope = $rootScope.$new();
        vm = $controller('jcPaginationController', { $scope: $scope});

        expect(vm.allowNext).toBe(false);
        vm.total = 51;
        vm.pageSize = 10;
        vm.currentPage = 1;
        $scope.$apply();
        expect(vm.allowNext).toBe(false);
    });

    it('should calculate allowNext true correctly.', function () {
        var vm, $scope = $rootScope.$new();
        vm = $controller('jcPaginationController', { $scope: $scope});

        expect(vm.allowNext).toBe(false);
        vm.total = 51;
        vm.pageSize = 10;
        vm.currentPage = 6;
        $scope.$apply();
        expect(vm.allowNext).toBe(true);
    });

});
