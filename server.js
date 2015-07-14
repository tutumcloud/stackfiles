var express = require('express'),
    mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic'),
    morgan  = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    methodOverride = require('method-override'),
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
app.use(session({secret: 'secretsecretsecretsecret'}));
app.use(passport.initialize());
app.use(passport.session());

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
