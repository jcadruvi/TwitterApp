describe("twitterText", function() {
    var $filter;

    var createAnchorTag = function (url, displayUrl) {
        return '<a target="_blank" href="' + url + '">' + displayUrl + '</a>';
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
        }
        filterResult = $filter('twitterText')(twitterData);
        expect(filterResult).toBe("Creating an Angular 2 build with Gulp, TSLint and DefinitelyTyped "
            + createAnchorTag(twitterData.entities.urls[0].url, twitterData.entities.urls[0].display_url)
            + ".");
    });
});
