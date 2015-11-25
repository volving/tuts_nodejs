var http = require('http');

var listener = function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello, world!');
};

var server = http.createServer(listener);

server.listen(8000);

console.log('Server started on localhost:8000; press Ctrl+C to terminate...');



// require('http').createServer(function(req, res){
// 	res.writeHead(200, {'Content-Type': 'text/plain'});
// 	res.end('Hello, world!');
// }).listen(8000);
// console.log('Server started on localhost:8000; press Ctrl+C to terminate...');