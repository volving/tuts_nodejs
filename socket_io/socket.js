/**
 * socket.js - simple socket.io sample
 */

/*jshint
    node: true,
    devel: true, indent: 2, maxerr: 10,
    newcap: true, nomen: true, plusplus: true,
    regexp: true
*/


// ----------------------------------BEGIN MODULE SCOPE VARIABLES
'use strict';
var http = require('http');
var express = require('express');
var logger = require('express-logger');
var app = express();
var server = http.createServer(app);
// ----------------------------------END MODULE SCOPE VARIABLES
// ----------------------------------socket.io related
var socketIo = require('socket.io');
var io = socketIo();
io.listen(server);
// ----------------------------------END socket.io related
app.use(logger({
    'path': './logs/www.log'
}));



var cc = 0;
var countUp = function() {
    cc += 1;
};


app.use(express.static(__dirname + '/public'));


app.get('/json', function(req, res) {
    res.type('json');
    res.send({
        'Name': 'success'
    });
});

app.get('/*', function(req, res) {
    res.redirect('/public/socket.html');
});
// setTimeout(
setInterval(
    function() {
        countUp();
        console.log(cc);
        io.sockets.send(cc);
    }, 1000);

server.listen(3333, function() {
    console.log('Server stated listening PORT:3333');
})
