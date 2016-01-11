describe("twitterText", function() {
    var $filter;

    var createAnchorTag = function (url, displayUrl) {
        return '<a target="_blank" href="' + url + '">' + displayUrl + '</a>';
    };

    var createImageTag = function (url) {
        return '<img src="' + url + '"/>'
    };

    beforeEach(module("app"));
    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));
    it("should be defined", function() {
        expect($filter('twitterText')).toBeDefined()
    });
    it("should handle simple text only", function() {
        var twitterData = {
                "text": "This is a unit test."
            },
            filterResult;

        filterResult = $filter('twitterText')(twitterData);
        expect(filterResult).toBe(twitterData.text);
    });
    it("should handle a URL in the tweet", function() {
        var twitterData = {
            "text": "Creating an Angular 2 build with Gulp, TSLint and DefinitelyTyped https://t.co/pC0ldo23dd.",
            "entities": {
                "hashtags": [],
                "symbols": [],
                "user_mentions": [],
                "urls": [{
                    "url": "https://t.co/pC0ldo23dd",
                    "expanded_url": "http://flip.it/_vd5Y",
                    "display_url": "flip.it/_vd5Y",
                    "indices": [
                        66,
                        89
                    ]
                }]
            }
        },
        filterResult = $filter('twitterText')(twitterData);
        expect(filterResult).toBe("Creating an Angular 2 build with Gulp, TSLint and DefinitelyTyped "
            + createAnchorTag(twitterData.entities.urls[0].url, twitterData.entities.urls[0].display_url)
            + ".");
    });
    it("should handle duplicate same URL's in a tweet", function() {
        var twitterData = {
            "text": "Machine Learning for indentify the author of an email https://t.co/v6TAqtM90E https://t.co/v6TAqtM90E",
            "entities": {
                "hashtags": [],
                "symbols": [],
                "user_mentions": [],
                "urls": [{
                    "url": "https://t.co/v6TAqtM90E",
                    "expanded_url": "http://flip.it/Vw10S",
                    "display_url": "flip.it/Vw10S",
                    "indices": [
                        54,
                        77
                ]},
                {
                    "url": "https://t.co/v6TAqtM90E",
                    "expanded_url": "http://flip.it/Vw10S",
                    "display_url": "flip.it/Vw10S",
                    "indices": [
                        78,
                        101
                    ]
                }]
            }
        },
        anchorTag = createAnchorTag(twitterData.entities.urls[0].url, twitterData.entities.urls[0].display_url),
        filterResult = $filter('twitterText')(twitterData);
        expect(filterResult).toBe("Machine Learning for indentify the author of an email "
            + anchorTag + " ");
    });
    it("should handle image URL's in a tweet", function() {
        var twitterData = {
            "text": "Machine Learning for indentify the author of an email https://t.co/xEVBHeutDn",
            "entities": {
                "urls": [
                    {
                        "url": "https://t.co/v6TAqtM90E",
                        "expanded_url": "http://flip.it/Vw10S",
                        "display_url": "flip.it/Vw10S",
                        "indices": [
                            54,
                            77
                        ]
                    },
                    {
                        "url": "https://t.co/v6TAqtM90E",
                        "expanded_url": "http://flip.it/Vw10S",
                        "display_url": "flip.it/Vw10S",
                        "indices": [
                            78,
                            101
                        ]
                    }],
                "media": [
                    {
                        "id": 661381802146181100,
                        "id_str": "661381802146181120",
                        "indices": [
                            102,
                            125
                        ],
                        "media_url": "http://pbs.twimg.com/media/CS2zPrHUsAAFupG.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/CS2zPrHUsAAFupG.jpg",
                        "url": "https://t.co/xEVBHeutDn",
                        "display_url": "pic.twitter.com/xEVBHeutDn",
                        "expanded_url": "http://twitter.com/joshcadruvi/status/661381802284597248/photo/1",
                        "type": "photo",
                        "sizes": {
                            "small": {
                                "w": 340,
                                "h": 227,
                                "resize": "fit"
                            },
                            "large": {
                                "w": 499,
                                "h": 334,
                                "resize": "fit"
                            },
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "medium": {
                                "w": 499,
                                "h": 334,
                                "resize": "fit"
                            }
                        }
                    }]
            }
        },
        imageTag = createImageTag(twitterData.entities.media[0].media_url),
        filterResult = $filter('twitterText')(twitterData);
        expect(filterResult).toBe("Machine Learning for indentify the author of an email "
            + imageTag);
    });
});
