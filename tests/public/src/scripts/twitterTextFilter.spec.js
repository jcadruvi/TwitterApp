describe("twitterText", function() {
    var $filter;

    beforeEach(module("app"));
    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));
    it("should be defined", function() {
        expect($filter('twitterText')).toBeDefined()
    });
    it("should handle simple text only", function() {
        var twitterData = {
                text: "This is a unit test."
            },
            filterResult;

        filterResult = $filter('twitterText')(twitterData);
        expect(filterResult).toBe(twitterData.text);
    });
    it("should handle a URL in the tweet", function() {

    });
});
