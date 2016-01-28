(function () {
    "use strict";
    angular.module("app")
           .factory("indexService", ["$http", indexService]);

    function indexService($http){
        var self = {};

        self.loading = true;
        self.pageSize = 10;
        self.tweets = [];

        var getTweets = function() {
            self.loading = true;
            $http.get('/api/twitter/timeline').then(function (result) {
                if (result.status === 200) {
                    self.tweets = result.data.data;
                }
                self.loading = false;
            });
        };

        self.init = function () {
            getTweets();
        };

        return self;
    }
})();
