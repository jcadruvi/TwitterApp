'use strict';

module.exports.controller = function (app) {
    app.get('/', function(req, res) {
        res.render('index', { title: 'Twitter App' });
    });
};
