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
    raven = require('raven'),
    app = express();

var env = process.env.NODE_ENV;
var pass = process.env.MONGODB_PASS;
var SENTRY_DSN = process.env.SENTRY_DSN;

var onOpen = function () {
	db.db.s.databaseName = 'tutum';
};

var onError = function(err) {
	console.log('Connection to mongodb for queries failed', err);
};

var onClose = function() {
	console.log('Mongodb queries closed');
};

if (env == 'development'){
    console.log("Using dev DB");
    var db = mongoose.createConnection('mongodb://admin:test@192.168.59.100:27018');
    db.once('open', onOpen);
    db.once('close', onClose);
    db.on('error', onError);
}

if (env == 'production'){
    var port = process.env.MONGODB_PORT_27017_TCP_PORT;
    var host = process.env.MONGODB_PORT_27017_TCP_ADDR;
    var db = mongoose.createConnection('mongodb://admin:'+ pass + '@' + host + ':' + port);
    console.log(db);
    db.once('open', onOpen);
    db.once('close', onClose);
    db.on('error', onError);
}

var port = process.env.PORT || 4000;

app.use(raven.middleware.express.requestHandler(SENTRY_DSN));
app.use(raven.middleware.express.errorHandler(SENTRY_DSN));
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
