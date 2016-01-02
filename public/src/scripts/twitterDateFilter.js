(function(){
    'use strict';

    angular.module("app")
           .filter("twitterDate", function () {
                return function(input) {
                    var splitDate,
                        twitterDate;
                    if(!input) {
                        return input;
                    }
                    splitDate = input.split(" ");
                    if (splitDate.length >= 3) {
                        twitterDate = splitDate[0] + " " + splitDate[1] + " " + splitDate[2];
                    }
                    return twitterDate;
                };
           });
})();
