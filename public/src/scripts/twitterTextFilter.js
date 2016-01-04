(function(){
    'use strict';

    angular.module("app")
           .filter("twitterText", function() {
               return function(input) {
                    var anchor,
                        dupUrl,
                        text = input.text;
                    if (input.entities && input.entities.urls) {
                        for (var i = 0; i < input.entities.urls.length; i++) {
                            if (input.entities.urls[i].url && input.entities.urls[i].display_url) {
                                // Test for a duplicate URL already replaced.
                                dupUrl = false;
                                for (var j = 0; j < i; j++) {
                                    if (input.entities.urls[i].url == input.entities.urls[j].url) {
                                        dupUrl = true;
                                        break;
                                    }
                                }
                                if(!dupUrl) {
                                    anchor = '<a target="_blank" href="' + input.entities.urls[i].url + '">' +
                                        input.entities.urls[i].display_url + '</a>';
                                    text = text.replace(new RegExp(input.entities.urls[i].url, 'g'), anchor);
                                }
                            }
                        }
                    }
                    return text;
               };
           });
})();
