var path = require('path'),
    passport = require('passport'),
    findOneOrCreate = require('mongoose-find-one-or-create'),
    GitHubStrategy = require('passport-github').Strategy;

var User = require('../models/users.js');

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

function userValidation(githubId, callback){
    Users.findOne({
        userId: githubId
    }, function(err, user){
        callback(user);
    });
};

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var user = new User({
        userId: profile.id,
        username: profile.username,
        profileUrl: profile.profileUrl
    });

    User.find({userId : profile.id}, function (err, docs) {
        if (docs.length){
            done(null, profile);
        }else{
            user.save(function(err){
                done(null, profile);
            });
        }
    });
}
/*function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      console.log(profile)
      return done(null, profile);
    });
}*/
));

var auth = function(req, res, next){
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
};

module.exports = function(app) {

    app.get('/', function(req, res){
        if (req.isAuthenticated()) {
            res.redirect('/registry');
        }
        else {
            res.sendFile(path.resolve(__dirname + '/../www/index.html'));
        }
    });

    app.get('/registry', auth, function(req, res){
        res.sendFile(path.resolve(__dirname + '/../www/index.html'));
    });

    app.get('/registry/:id', auth, function(req, res){
        res.sendFile(path.resolve(__dirname + '/../www/index.html'));
    });

    app.get('/create', auth, function(req, res){
        res.sendFile(path.resolve(__dirname + '/../www/index.html'));
    });

    app.get('/auth/github', passport.authenticate('github'), function(req,res){
        console.log("Hello")
    });

    app.get('/auth/github/callback', passport.authenticate('github'), function(req, res) {
        res.redirect('/registry');
    });
};
