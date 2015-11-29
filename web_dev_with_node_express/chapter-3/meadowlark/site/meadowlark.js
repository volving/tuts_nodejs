var express = require('express');

var app = express();

//B-1: Install express-handlebars view engine //
var hbs = require('express-handlebars').create({defualtLayout: 'main', extname: '.hbs'});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//B-1: end //

app.set('port', process.env.PORT || 8000);

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about');
});

app.use(function(req, res){
	res.status('404');
	res.render('404');
});

app.use(function(err, req, res){
	res.status('500');
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost' + app.get('port') + '; press Ctrl+c to terminate.');
});