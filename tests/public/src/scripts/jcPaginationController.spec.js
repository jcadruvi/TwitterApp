describe("jcPaginationController", function () {
    'use strict';

    var $controller,
        $rootScope;

    beforeEach(module('app'));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    describe('numberOfPages variable', function () {

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

    describe('allowPrevious variable', function() {

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
    });

    describe('allowNext variable', function() {

        it('should calculate allowNext false correctly.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});

            expect(vm.allowNext).toBe(false);
            vm.total = 51;
            vm.pageSize = 10;
            vm.currentPage = 1;
            $scope.$apply();
            expect(vm.allowNext).toBe(true);
        });

        it('should calculate allowNext true correctly.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});

            expect(vm.allowNext).toBe(false);
            vm.total = 51;
            vm.pageSize = 10;
            vm.currentPage = 6;
            $scope.$apply();
            expect(vm.allowNext).toBe(false);
        });
    });

    describe('startPage variable', function() {

        it('should not increment when currentPages is 2 and numberOfPages is 5.', function() {
           var vm, $scope = $rootScope.$new();
           vm = $controller('jcPaginationController', { $scope: $scope});
           vm.currentPage = 2;
           vm.numberOfPages = 5;
           $scope.$apply();
           expect(vm.startPage).toBe(1);
        });

        it('should not increment when currentPages is 3 and numberOfPages is 5.', function() {
           var vm, $scope = $rootScope.$new();
           vm = $controller('jcPaginationController', { $scope: $scope});
           vm.currentPage = 3;
           vm.numberOfPages = 5;
           $scope.$apply();
           expect(vm.startPage).toBe(1);
        });

        it('should be 2 when currentPages is 4 and numberOfPages is 10.', function() {
           var vm, $scope = $rootScope.$new();
           vm = $controller('jcPaginationController', { $scope: $scope});
           vm.currentPage = 4;
           vm.numberOfPages = 10;
           $scope.$apply();
           expect(vm.startPage).toBe(2);
        });

        it('should be 3 when currentPages is 5 and numberOfPages is 10.', function() {
           var vm, $scope = $rootScope.$new();
           vm = $controller('jcPaginationController', { $scope: $scope});
           vm.currentPage = 5;
           vm.numberOfPages = 10;
           $scope.$apply();
           expect(vm.startPage).toBe(3);
        });

        it('should not increment when currentPages is 4 and numberOfPages is 5.', function() {
           var vm, $scope = $rootScope.$new();
           vm = $controller('jcPaginationController', { $scope: $scope});
           vm.currentPage = 4;
           vm.numberOfPages = 5;
           $scope.$apply();
           expect(vm.startPage).toBe(1);
        });

        it('should not increment when currentPages is 5 and numberOfPages is 5.', function() {
           var vm, $scope = $rootScope.$new();
           vm = $controller('jcPaginationController', { $scope: $scope});
           vm.currentPage = 5;
           vm.numberOfPages = 5;
           $scope.$apply();
           expect(vm.startPage).toBe(1);
        });
    });

    describe('doNext method', function() {

        it('should not increment currentPage if numberOfPages has not be set yet if doNext is called', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.displayPages = 5;
            expect(vm.currentPage).toBe(1);
            vm.doNext();
            expect(vm.currentPage).toBe(1);
        });

        it('should increment currentPage when doNext is called', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.displayPages = 5;
            expect(vm.currentPage).toBe(1);
            vm.numberOfPages = 6;
            vm.doNext();
            expect(vm.startPage).toBe(1);
            expect(vm.currentPage).toBe(2);
            expect(vm.pages.length).toBe(5);
            expect(vm.pages[0]).toBe(1);
            expect(vm.pages[1]).toBe(2);
            expect(vm.pages[2]).toBe(3);
            expect(vm.pages[3]).toBe(4);
            expect(vm.pages[4]).toBe(5);
        });

        it('should not increment currentPage if numberOfPages is equal to currentPage when doNext is called', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.displayPages = 5;
            expect(vm.currentPage).toBe(1);
            vm.numberOfPages = 6;
            vm.currentPage = 6;
            vm.doNext();
            expect(vm.currentPage).toBe(6);
            expect(vm.startPage).toBe(2);
            expect(vm.pages.length).toBe(5);
            expect(vm.pages[0]).toBe(2);
            expect(vm.pages[1]).toBe(3);
            expect(vm.pages[2]).toBe(4);
            expect(vm.pages[3]).toBe(5);
            expect(vm.pages[4]).toBe(6);
        });

        it('should make sure pages is not bigger than number of pages.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.displayPages = 5;
            expect(vm.currentPage).toBe(1);
            vm.numberOfPages = 3;
            vm.currentPage = 1;
            vm.doNext();
            expect(vm.currentPage).toBe(2);
            expect(vm.startPage).toBe(1);
            expect(vm.pages.length).toBe(3);
            expect(vm.pages[0]).toBe(1);
            expect(vm.pages[1]).toBe(2);
            expect(vm.pages[2]).toBe(3);
        });

        it('should handle larger displayPages.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.displayPages = 9;
            expect(vm.currentPage).toBe(1);
            vm.numberOfPages = 9;
            vm.currentPage = 1;
            vm.doNext();
            expect(vm.currentPage).toBe(2);
            expect(vm.startPage).toBe(1);
            expect(vm.pages.length).toBe(9);
            expect(vm.pages[0]).toBe(1);
            expect(vm.pages[1]).toBe(2);
            expect(vm.pages[2]).toBe(3);
            expect(vm.pages[3]).toBe(4);
            expect(vm.pages[4]).toBe(5);
            expect(vm.pages[5]).toBe(6);
            expect(vm.pages[6]).toBe(7);
            expect(vm.pages[7]).toBe(8);
            expect(vm.pages[8]).toBe(9);
        });
    });

    describe('doPrevious method', function() {

        it('should not decrement currentPage if numberOfPages has not be set yet.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});

            expect(vm.currentPage).toBe(1);
            vm.doPrevious();
            expect(vm.currentPage).toBe(1);
        });

        it('should decrement currentPage.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});

            expect(vm.currentPage).toBe(1);
            vm.currentPage = 6;
            vm.numberOfPages = 6;
            vm.doPrevious();
            expect(vm.currentPage).toBe(5);
            expect(vm.pages.length).toBe(5);
            expect(vm.pages[0]).toBe(2);
            expect(vm.pages[1]).toBe(3);
            expect(vm.pages[2]).toBe(4);
            expect(vm.pages[3]).toBe(5);
            expect(vm.pages[4]).toBe(6);
        });

        it('should not decrement currentPage if it is 1 or less.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});

            expect(vm.currentPage).toBe(1);
            vm.numberOfPages = 6;
            vm.currentPage = 1;
            vm.doPrevious();
            expect(vm.currentPage).toBe(1);
            expect(vm.pages.length).toBe(5);
            expect(vm.pages[0]).toBe(1);
            expect(vm.pages[1]).toBe(2);
            expect(vm.pages[2]).toBe(3);
            expect(vm.pages[3]).toBe(4);
            expect(vm.pages[4]).toBe(5);
        });

        it('should make sure pages is not bigger than number of pages.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.displayPages = 5;
            expect(vm.currentPage).toBe(1);
            vm.numberOfPages = 3;
            vm.currentPage = 2;
            vm.doPrevious();
            expect(vm.currentPage).toBe(1);
            expect(vm.startPage).toBe(1);
            expect(vm.pages.length).toBe(3);
            expect(vm.pages[0]).toBe(1);
            expect(vm.pages[1]).toBe(2);
            expect(vm.pages[2]).toBe(3);
        });

        it('should handle larger displayPages.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.displayPages = 9;
            expect(vm.currentPage).toBe(1);
            vm.numberOfPages = 9;
            vm.currentPage = 2;
            vm.doPrevious();
            expect(vm.currentPage).toBe(1);
            expect(vm.startPage).toBe(1);
            expect(vm.pages.length).toBe(9);
            expect(vm.pages[0]).toBe(1);
            expect(vm.pages[1]).toBe(2);
            expect(vm.pages[2]).toBe(3);
            expect(vm.pages[3]).toBe(4);
            expect(vm.pages[4]).toBe(5);
            expect(vm.pages[5]).toBe(6);
            expect(vm.pages[6]).toBe(7);
            expect(vm.pages[7]).toBe(8);
            expect(vm.pages[8]).toBe(9);
        });
    });

    describe('selectPage method', function() {

        it('should select first page and make allowPrevious false.', function() {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.numberOfPages = 20;
            expect(vm.currentPage).toBe(1);
            expect(vm.allowPrevious).toBeFalsy();
            vm.selectPage(3);
            expect(vm.currentPage).toBe(3);
            expect(vm.allowPrevious).toBeTruthy();
            vm.selectPage(1);
            expect(vm.currentPage).toBe(1);
            expect(vm.allowPrevious).toBeFalsy();
        });

        it('should select last page and make allowNext false.', function(){
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.numberOfPages = 5;
            expect(vm.currentPage).toBe(1);
            expect(vm.allowNext).toBeFalsy();
            vm.selectPage(3);
            expect(vm.currentPage).toBe(3);
            expect(vm.allowNext).toBeTruthy();
            vm.selectPage(5);
            expect(vm.currentPage).toBe(5);
            expect(vm.allowNext).toBeFalsy();
        });

        it('should make sure pages is not bigger than number of pages.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.displayPages = 5;
            expect(vm.currentPage).toBe(1);
            vm.numberOfPages = 3;
            vm.currentPage = 2;
            vm.selectPage(1);
            expect(vm.currentPage).toBe(1);
            expect(vm.startPage).toBe(1);
            expect(vm.pages.length).toBe(3);
            expect(vm.pages[0]).toBe(1);
            expect(vm.pages[1]).toBe(2);
            expect(vm.pages[2]).toBe(3);
        });

        it('should handle larger displayPages.', function () {
            var vm, $scope = $rootScope.$new();
            vm = $controller('jcPaginationController', { $scope: $scope});
            vm.displayPages = 9;
            expect(vm.currentPage).toBe(1);
            vm.numberOfPages = 9;
            vm.currentPage = 2;
            vm.selectPage(1);
            expect(vm.currentPage).toBe(1);
            expect(vm.startPage).toBe(1);
            expect(vm.pages.length).toBe(9);
            expect(vm.pages[0]).toBe(1);
            expect(vm.pages[1]).toBe(2);
            expect(vm.pages[2]).toBe(3);
            expect(vm.pages[3]).toBe(4);
            expect(vm.pages[4]).toBe(5);
            expect(vm.pages[5]).toBe(6);
            expect(vm.pages[6]).toBe(7);
            expect(vm.pages[7]).toBe(8);
            expect(vm.pages[8]).toBe(9);
        });
    });
});
