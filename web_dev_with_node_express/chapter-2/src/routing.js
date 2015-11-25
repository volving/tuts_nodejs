var http = require('http');

http.createServer(function(req, res){
	console.log(req.url);
	var path = req.url.replace(/\/*(?:\?.*)?$/, '').toLowerCase();
	console.log(path);
	switch(path){
		case '':
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Homepage');
			break;
		case '/about':
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('about');
			break;
		default: 
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Not Found');
			break;
	}
}).listen(8000);