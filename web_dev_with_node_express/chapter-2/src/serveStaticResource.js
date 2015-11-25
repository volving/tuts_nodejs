var http 	= require('http');
var fs 		= require('fs');

var serveStaticFile = function(res, path, contentType, statusCode){
	if(!statusCode){
		statusCode = 200;
	}
	fs.readFile(__dirname.concat(path), function(err, data){
		if(err){
			res.writeHead(500, {'Content-Type': contentType});
			res.end('500-server\'s dizzying');
			return;
		}else{
			res.writeHead(500, {'Content-Type': contentType});
			res.end(data);
		}
	});
};

http.createServer(function(req, res){
	var path = req.url.replace(/\/*(?:\?.*)?$/, '').toLowerCase();
	switch(path){
		case '':
			console.log('Requested for /home');
			serveStaticFile(res, '/public/home.html', 'text/html');
			break;
		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html');
			break;
		case '/img/logo':
			serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
			break;
		default: 
			serveStaticFile(res, '/public/404.html', 'text/html');
			break;
	}
}).listen(8000);