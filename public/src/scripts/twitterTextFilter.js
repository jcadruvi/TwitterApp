(function(){
    'use strict';

    angular.module("app")
           .filter("twitterText", function() {
               var findAllDuplicateUrls = function(input) {
                   var duplicateUrlIndices = [],
                       duplicateFound = false,
                       urls = [];
                   for (var i = 0; i < input.entities.urls.length; i++) {
                        for (var j = i + 1; j < input.entities.urls.length; j++, duplicateFound = false) {
                            if (input.entities.urls[i].url == input.entities.urls[j].url) {
                                duplicateUrlIndices.push(input.entities.urls[j].indices);
                            }
                        }
                   }
                   return duplicateUrlIndices;
               };
               var removeDuplicateUrls = function(text, duplicateUrlIndices) {
                   var indexFound = false,
                       returnVal = '';
                   for (var i = 0; i < text.length; i++, indexFound = false) {
                       for (var j = 0; j < duplicateUrlIndices.length; j++) {
                           if (i >= duplicateUrlIndices[j][0] && i <= duplicateUrlIndices[j][1]) {
                               indexFound = true;
                               break;
                           }
                       }
                       if (!indexFound) {
                           returnVal += text[i];
                       }
                   }
                   return returnVal;
               };
               return function(input) {
                    var anchor,
                        duplicateUrl,
                        duplicateUrlIndices,
                        image,
                        text = input.text;
                    if (input.entities) {
                        if (input.entities.urls) {
                            duplicateUrlIndices = findAllDuplicateUrls(input);
                            text = removeDuplicateUrls(text, duplicateUrlIndices);
                            for (var i = 0; i < input.entities.urls.length; i++) {
                                if (input.entities.urls[i].url && input.entities.urls[i].display_url) {
                                    // Test for a duplicate URL already replaced.
                                    duplicateUrl = false;
                                    for (var j = 0; j < i; j++) {
                                        if (input.entities.urls[i].url == input.entities.urls[j].url) {
                                            duplicateUrl = true;
                                            break;
                                        }
                                    }
                                    if (!duplicateUrl) {
                                        anchor = '<a target="_blank" href="' + input.entities.urls[i].url + '">' +
                                            input.entities.urls[i].display_url + '</a>';
                                        text = text.replace(new RegExp(input.entities.urls[i].url, 'g'), anchor);
                                    }
                                }
                            }
                        }
                        if (input.entities.media) {
                            for (i = 0; i < input.entities.media.length; i++) {
                                if (input.entities.media[i].url && input.entities.media[i].media_url) {
                                    image = '<img src="' + input.entities.media[i].media_url + '"/>'
                                    text = text.replace(new RegExp(input.entities.media[i].url, 'g'), image);
                                }
                            }
                        }
                    }
                    return text;
               };
           });
})();
