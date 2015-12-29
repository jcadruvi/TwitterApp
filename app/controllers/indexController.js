'use strict';
var Twitter = require('twitter-node-client').Twitter;

module.exports.controller = function (app, config) {

    var getTwitterClient = function() {
        var twitterConfig = {
            consumerKey: config.twitter.consumerKey,
            consumerSecret: config.twitter.consumerSecret,
            accessToken: config.twitter.accessToken,
            accessTokenSecret: config.twitter.accessTokenSecret
        }

        return new Twitter(twitterConfig);
    };

    app.get('/', function(req, res) {
        res.render('index', { title: 'Twitter App' });
    });

    app.get('/api/twitter/timeline', function(req, res) {
        var twitter = getTwitterClient();
        twitter.getUserTimeline(
            {screen_name: 'joshcadruvi', count: '10'},
            function (err, response, body) {
                console.log('Error in api/twitter [%s]', err);
            },
            function (data) {
                res.json({
                    "data": data,
                    "status": {
                        "code": 200
                    }
                });
            });
    });
};
