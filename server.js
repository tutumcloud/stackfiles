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

var db = mongoose.connect('mongodb://192.168.59.103:27017');
var port = process.env.PORT || 4000;

app.use(cookieParser())
app.use(bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'keyboard cat'}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/www'));

app.listen(port, function(){
    console.log("Server is running on port " + port);
});

require('./routes/index.js')(app, db);
require('./routes/files.js')(app, db);
