(function(){
    'use strict';

    angular.module("app")
           .filter("twitterText", function() {
               return function(input) {
                    return "Test";
               };
           });
})();
