var http=require("http"),fs=require("fs"),serveStaticFile=function(e,t,i,r){r||(r=200),fs.readFile(__dirname.concat(t),function(t,r){return t?(e.writeHead(500,{"Content-Type":i}),void e.end("500-server's dizzying")):(e.writeHead(500,{"Content-Type":i}),void e.end(r))})};http.createServer(function(e,t){var i=e.url.replace(/\/*(?:\?.*)?$/,"").toLowerCase();switch(i){case"":console.log("Requested for /home"),serveStaticFile(t,"/public/home.html","text/html");break;case"/about":serveStaticFile(t,"/public/about.html","text/html");break;case"/img/logo":serveStaticFile(t,"/public/img/logo.jpg","image/jpeg");break;default:serveStaticFile(t,"/public/404.html","text/html")}}).listen(8e3);