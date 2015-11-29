var express = require('express');

var app = express();
//B-1: Install express-handlebars view engine //
var hbs = require('express-handlebars').create({defualtLayout: 'main', extname: '.hbs'});
app.engine('hbs', hbs.engine);
app.use('view engine', 'hbs');
//B-1: end //

app.set('port', process.env.PORT || 8000);

app.get('/', function(req, res){
	res.type('text/plain');
	res.send('Meadowlark Travel');
});

app.get('/about', function(req, res){
	res.type('text/plain');
	res.send('About Meadowlark Travel');
});


app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use(function(err, req, res){
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost' + app.get('port') + '; press Ctrl+c to terminate.');
});