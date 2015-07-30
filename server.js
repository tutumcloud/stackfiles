require('newrelic');

var express = require('express'),
    paginate = require('express-paginate'),
    mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic'),
    morgan  = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    randomstring = require("randomstring"),
    app = express();


var env = process.env.NODE_ENV;
if (env == 'development'){
    console.log("Using dev DB");
    var db = mongoose.connect('mongodb://192.168.59.103:27018');
}

if (env == 'production'){
    var port = process.env.MONGODB_PORT_27017_TCP_PORT;
    var host = process.env.MONGODB_PORT_27017_TCP_ADDR;
    var db = mongoose.connect('mongodb://' + host + ':' + port);
}

var port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: randomstring.generate(7), cookie: {maxAge: 2678400000}}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(paginate.middleware(10, 50));
app.use(express.static(__dirname + '/www'));

app.listen(port, function(){
    console.log("Server is running on port " + port);
});

require('./routes/index.js')(app, db);
require('./routes/files.js')(app, db);
require('./routes/github-api.js')(app, db);

app.get('*', function(req, res){
    res.redirect('/404');
});
