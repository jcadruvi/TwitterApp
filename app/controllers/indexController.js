'use strict';
var Twitter = require('twitter-node-client').Twitter;

module.exports.controller = function (app, config) {

    var getTwitterClient = function() {
        var twitterConfig = {
            consumerKey: config.twitter.consumerKey,
            consumerSecret: config.twitter.consumerSecret,
            accessToken: config.twitter.accessToken,
            accessTokenSecret: config.twitter.accessTokenSecret,
            callBackUrl: config.twitter.callBackUrl
        }

        return new Twitter(twitterConfig);
    };

    var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);
    };

    app.get('/', function(req, res) {
        res.render('index', { title: 'Twitter App' });
    });

    app.get('/api/twitter', function(req, res) {
        var twitter = getTwitterClient(),
            data = twitter.getUserTimeline({ screen_name: 'joshcadruvi', count: '10'}, error, success);
        res.json({
            "data": data,
            "status": {
                "code": 200
            }
        });
    });
};
