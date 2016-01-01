(function () {
    "use strict";
    angular.module("app")
           .factory("indexService", ["$http", indexService]);

    function indexService($http){
        var self = {};

        self.loading = true;
        self.tweets = [];

        var getTweets = function() {
            self.loading = true;
            $http.get('/api/twitter/timeline').then(function (result) {
                if (result.status && result.status.code === 200) {
                    self.tweets = result.data;
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
