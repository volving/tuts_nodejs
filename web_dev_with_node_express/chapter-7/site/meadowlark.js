var express = require('express');

var app = express();


//B-1: Install express-handlebars view engine //
var hbs = require('express-handlebars').create({
    defualtLayout: 'main',
    extname: '.hbs',
    helpser: {
        'section': function(name, options) {
            if (!this._sections) {
                this._sections = {};
                this._sections[name] = options.fn(this);
            }
            return null;
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('view cache', true);
//B-1: end //

//注意两个字串在拼接时加上路径斜杠／
app.use(express.static(__dirname + '/public'));


app.set('port', process.env.PORT || 8000);

var generateQuote = function() {
    var quotes = [
        "擒贼擒王", "无欲则刚",
        "天行健，君子以自强不息；地势坤，君子以厚德载物@《易》",
        "天行有常，不为尧存，不为桀亡",
        "念去去千里烟波，暮霭沉沉楚天阔@雨霖铃",
        "五日三省吾身@孔夫子",
        "千里之行，始于足下@中华谚语",
        "富贵不能淫，贫贱不能移，威武不能屈，此之谓大丈夫也！@《孟子》"
    ];
    var txt = quotes[Math.floor(Math.random() * quotes.length)];
    return txt.split('@');
};

app.get('/', function(req, res) {
    res.render('home', {
        quote: generateQuote()
    });
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/travel', function(req, res) {

    res.render('travel', {
        currency: {
            name: 'United States Dollars',
            abbrev: 'USD'
        },
        tours: [{
            name: 'Hood River',
            price: '$99.95'
        }, {
            name: 'Oregon Coast',
            price: '$159.95'
        }],
        specialsUrl: 'http://www.baidu.com',
        currencies: ['USD', 'GBP', 'BTC'],
    });
});




app.use(function(req, res) {
    res.status('404');
    res.render('404');
});

app.use(function(err, req, res) {
    res.status('500');
    res.render('500');
});


app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost' + app.get('port') + '; press Ctrl+c to terminate.');
});
