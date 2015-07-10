var path = require('path'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    Github = require("github-api"),
    User = require('../models/users.js');

var env = process.env.NODE_ENV;
var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

if (env == 'development'){
    passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            var user = new User({
            userId: profile.id,
            username: profile.username,
            profileUrl: profile.profileUrl,
            accessToken: accessToken
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
    ));
}

if (env == 'production'){
    passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://registry.stackfileio.admin.svc.tutum.us:8082/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, done){
            var user = new User({
            userId: profile.id,
            username: profile.username,
            profileUrl: profile.profileUrl,
            accessToken: accessToken
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
    ));
}

var auth = function(req, res, next){
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/registry');
};

module.exports = function(app) {

    app.get('/', function(req, res){
        res.sendFile(path.resolve(__dirname + '/../www/index.html'));
    });

    app.get('/registry', function(req, res){
        res.sendFile(path.resolve(__dirname + '/../www/index.html'));
    });

    app.get('/registry/:id', function(req, res){
        res.sendFile(path.resolve(__dirname + '/../www/index.html'));
    });

    app.get('/mystack', auth, function(req, res){
        res.sendFile(path.resolve(__dirname + '/../www/index.html'));
    });

    app.get('/mystack/:id', auth, function(req, res){
        res.sendFile(path.resolve(__dirname + '/../www/index.html'));
    });

    app.get('/create', auth, function(req, res){
        res.sendFile(path.resolve(__dirname + '/../www/index.html'));
    });

    app.get('/auth/github', passport.authenticate('github', { scope: 'read:org' }));

    app.get('/auth/github/callback', passport.authenticate('github'), function(req, res) {
        res.redirect('/create');
    });
};
