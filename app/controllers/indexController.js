'use strict';

module.exports.controller = function (app, config) {
    app.get('/', function(req, res) {
        res.render('index', { title: 'Twitter App' });
    });

    app.get('/api/twitter', function(req, res) {
        res.json({
            "data": {
                consumerKey: config.twitter.consumerKey,
                consumerSecret: config.twitter.consumerSecret,
                accessToken: config.twitter.accessToken,
                accessTokenSecret: config.twitter.accessTokenSecret,
                callBackUrl: config.twitter.callBackUrl
            },
            "status": {
                "code": 200
            }
        });
    });
};
