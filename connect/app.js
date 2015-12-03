var express = require('express');
var logger = require('express-logger');

app = express();
app.set('port', 3333);
app.use(logger({path:'./logs/www.log'}));

app.get('/*', function(req, res) {
    res.type('json');
    res.send({'name':'My name is ???'});
});


app.listen(app.get('port'), function(){
	console.log('Server started listening PORT: %d', app.get('port'));
});