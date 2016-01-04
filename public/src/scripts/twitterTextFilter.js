(function(){
    'use strict';

    angular.module("app")
           .filter("twitterText", function() {
               return function(input) {
                    var anchor,
                        text = input.text;
                    if (input.entities && input.entities.urls) {
                        for (var i = 0; i < input.entities.urls.length; i++) {
                            if (input.entities.urls[i].url && input.entities.urls[i].display_url) {
                                anchor = '<a target="_blank" href="' + input.entities.urls[i].url + '">' +
                                         input.entities.urls[i].display_url + '</a>';
                                text = text.replace(input.entities.urls[i].url, anchor);
                            }
                        }
                    }
                    return text;
               };
           });
})();
