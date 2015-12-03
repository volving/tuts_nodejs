/**
 * socket.js - simple socket.io sample
 */

/*jshint    
    node: true,
    devel: true, indent: 2, maxerr: 10,
    newcap: true, nomen: true, plusplus: true,
    regexp: true
*/


// ----------------------------------BEGIN MODULE SCOPE VARIABLES----------------------------------
'use strict';
var http = require('http');
var express = require('express');
var socketIo = require('socket.io');
var io = socketIo();
var logger = require('express-logger');
var app = express();
var server = http.createServer(app);


// ----------------------------------END MODULE SCOPE VARIABLES----------------------------------
io.listen(server);
app.use(logger({
    'path': './logs/www.log'
}));

app.get('/*', function(req, res) {
    res.type('json');
    res.send({
        'Name': 'success'
    });
});
