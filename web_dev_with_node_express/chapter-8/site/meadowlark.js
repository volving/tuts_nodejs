var express = require('express');

var app = express();
var bodyparser = require('body-parser');

//B-1: Install express-handlebars view engine //
var hbs = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: '.hbs'
});
app.disable('x-powered-by');
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//B-1: end //

app.use(bodyparser());

//注意两个字串在拼接时加上路径斜杠／
app.use(express.static( __dirname + '/public'));
// app.use('/vendors', express.static(__dirname + '/public/vendors'));


app.set('port', process.env.PORT || 8000);

app.get('/', function(req, res){
    res.render('home', {
        quote: 'The quick fox jumps over the lazy dog!'
    });
});


app.get('/newsletter', function(req, res){
    res.render('newsletters', {csrf:'a little secret thing happened'});
});
app.post('/process', function(req, res){
    console.log(req.body._csrf);
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(typeof req.query);
    console.log(req.query);
    res.redirect('/', '303');
});
app.get('/', function(req, res){
    res.render('home', {quote: 'Have a seat!'});
});
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost' + app.get('port') + '; press Ctrl+c to terminate.');
});
