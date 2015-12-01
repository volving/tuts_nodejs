var express = require('express');

var app = express();

//B-1: Install express-handlebars view engine //
var hbs = require('express-handlebars').create({
    defualtLayout: 'main',
    extname: '.hbs'
});
app.disable('x-powered-by');
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//B-1: end //

//注意两个字串在拼接时加上路径斜杠／
app.use(express.static(__dirname + '/public'));


app.set('port', process.env.PORT || 8000);

var generateQuote = function() {
    var quotes = ["There are two types of people in this world. Those that enter a room and say 'Here I am!' and those that enter a room and say 'There you are!'.@Unknown",
        "Because it's there.@George Mallory on climbing mountains",
        "Footsteps always follow us, whenever it is snowing.They always show us where we 've been, but never where we're going.@Winnie the Pooh 's A-Z",
        "For I know the plans that I have for you.@The Lord, Jer 29:11",
        "The only way to climb properly is to realize that just getting up a route is nothing, the way it is done is everything.@Royal Robbins ",
        "Small minds discuss people.  Average minds discuss events.  Great minds discuss ideas.@Unkown",
        "The significant problems we face cannot be solved at the same level of thinking we were at when we created them.@Albert Einstein",
        "We must not cease from exploration and the end of all our exploring will be to arrive where we began and to know the place for the first time.@T S Eliot",
        "One man asked another on the death of a mutual friend, 'How much did he leave?' His friend responded, 'He left it all.'@Proverb",
        "It is more noble to give yourself completely to one individual than to labor diligently for the salvation of the masses.@Dag Hammarskjold, Sec. Gen. of the UN",
        "Maps are a way of organizing wonder.@Edward Tufte", "I have decided to make my life my argument.@Albert Schweitzer",
        "Now it's a sqirt mecca for mystery artist, but back then it was just magic.@Jim Snyder on Kayaking",
        "Knowledge keeps about as well as fish.@Alfred North Whitehead",
        "It all began, I said, when I decided that some experts don't really know enough to make a pronouncement of doom on a human being.  And I said I hoped they would be careful about what they said to others; they might be believed and that coud be the beginning of the end.@Norman Cousins, Anatomy of an Illness",
        "Do not go gentle into that good night.  Rage, rage against the dying of the light.@Dylan Thomas",
        "For you will look smart and feel ignorant and the patient will not know which day it is for you and you will pretend to be smart out of ignorance.@John Stone, Gaudeamus Igitur",
        "A man who he crys he lose!",
        "欲速则不达",
        "逆水行舟，不进则退",
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
    //-More information
    //Express source code
    //
    //lib/application.js    //Express's main interface, middleware, view rendering
    //lib/express.js        //Short shell extends 'connect' with the functions in application.js. 
                                //returns a function that can be used with http.createServer to 
                                //actually run an express app.
    //li/request.js         //Extends Nodejs's http.IncomingMessage object to provide a robust request object.
    //lib/response.js       //http.ServerResponse - > response object
    //lib/router/route.js   //Code is short and elegant on basic routing support
    //
    //
    //The response body
    console.log('-------------------------------------------');
    // console.log(res.header());
    console.log(res.status);
    // console.log(res.status);
    // console.log(res.redirect(303, 'http://www.baidu.com'));
    res.send(200, 'text/array/object');
    // res.json({'a':'aaa'});
    // res.jsonp();
    // res.type('text/plain');
    res.format({
        'application/json': function() {
            res.json({
                'a': 'aaa'
            });
        },
        'application/xml': function() {
            res.type('application/xml');
            res.send('');
        },
        'text/xml': function() {
            res.type('text/xml');
            res.send('');
        },
        'text/plain': function() {
            res.type('text/plain');
            res.send('Plain text');
        }

    });
    res.attachment('file.txt');
    res.download('~/download/', 'file.txt', function() {});
    res.sendFile(path, [options], [callback]);
    res.render('about', {
        title: 'About Page'
    });
    console.log('-------------------------------------------');
    /* 
    // The request body
    // req.headers Objec
    console.log(req.headers);
    console.log('url-------------------------------------------');
    // req.url String
    console.log(req.url);
    console.log(req.originalUrl);

    console.log('query-------------------------------------------');
    // req.query object; http://localhost:8000/?abc=ccbbaa&911=emergency
    console.log(req.query['abc']);

    console.log('body-------------------------------------------');
    // post method only: body is the request body of POST parameters(passed in the body of the REQUEST)
    console.log(req.body);

    console.log('route-------------------------------------------');
    // Infomation about the currently mathed route. Used for route debugging
    console.log(req.route);

    console.log('cookies-------------------------------------------');
    // console.log(req.cookie);
    console.log(req.cookies);

    console.log('signedCookies-------------------------------------------');
    console.log(req.signedCookies);

    console.log('accepts()-------------------------------------------');
    console.log(req.accepts());

    console.log('ip-------------------------------------------');
    console.log(req.ip);

    console.log('path-------------------------------------------');
    console.log(req.path);

    console.log('hostname-------------------------------------------');
    console.log(req.hostname);

    console.log('xhr-------------------------------------------');
    // return true if the request originated from a AJAX call.
    console.log(req.xhr);

    console.log('protocol-------------------------------------------');
    console.log(req.protocol);

    console.log('secure-------------------------------------------');
    // true if the protocol equals to 'https'; req.protocol == 'https'
    console.log(req.secure);

    console.log('acceptedLanguages-------------------------------------------');
    // true if the protocol equals to 'https'; req.protocol == 'https'
    console.log(req.acceptedLanguages);

    */










    res.render('home', {
        quote: generateQuote()
    });
});


app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost' + app.get('port') + '; press Ctrl+c to terminate.');
});
