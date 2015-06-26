var path = require('path'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy;

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

var auth = function(req, res, next){
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
};

module.exports = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

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
