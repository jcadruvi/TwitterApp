'use strict';

//var controllers = require('./app/controllers');
var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path');


// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var config = require('./config/config');

var port = 8080;

app.set('port', port);
app.set('views', path.join(__dirname, 'app/views'));

app.set('view engine', 'jade');
app.use(express.static('public/dist'));

fs.readdirSync('./app/controllers').forEach(function (file) {
    var route;
    if(file.substr(-3) === '.js') {
        route = require('./app/controllers/' + file);
        route.controller(app);
    }
});

// Start the app by listening on <port>
app.listen(port, function(){
    console.log('Express app started on port ' + port);
});


