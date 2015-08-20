var path = require('path'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    Github = require("github-api"),
    User = require('../models/users.js');

var env = process.env.NODE_ENV;
var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
var CALLBACK_URL = process.env.CALLBACK_URL;

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
                    User.update({userId : profile.id}, {accessToken: accessToken}, function(err, numberAffected, rawResponse) {
                        if(err){
                            console.log(err);
                        } else {
                            done(null, profile);
                        }
                    });
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
        callbackURL: CALLBACK_URL
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
                    User.update({userId : profile.id}, {accessToken: accessToken}, function(err, numberAffected, rawResponse) {
                        if(err){
                            console.log(err);
                        } else {
                            done(null, profile);
                        }
                    });
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
        res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
    });

    app.get('/404', function(req, res){
        res.sendFile(path.resolve(__dirname + '/../dist/404.html'));
    });

    app.get('/registry', function(req, res){
        res.sendFile(path.resolve(__dirname + '/../dist/template.html'));
    });

    app.get('/mystacks', auth, function(req, res){
        res.sendFile(path.resolve(__dirname + '/../dist/template.html'));
    });

    app.get('/favorites', auth, function(req, res){
        res.sendFile(path.resolve(__dirname + '/../dist/template.html'));
    });

    app.get('/registry/:id', function(req, res){
        res.sendFile(path.resolve(__dirname + '/../dist/template.html'));
    });

    app.get('/create', auth, function(req, res){
        res.sendFile(path.resolve(__dirname + '/../dist/template.html'));
    });

    app.get('/auth/github', function(req, res, next){
        var redirect = req.query.redirect;
        req.session.redirect = redirect;
        passport.authenticate('github', { scope: 'read:org' })(req, res, next);
    }, function(){});

    app.get('/auth/github/callback', passport.authenticate('github'), function(req, res) {
        res.redirect(req.session.redirect);
    });

    app.get('/auth/logout', function(req, res, next){
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            }
        });
        res.redirect('/');
    });
};
