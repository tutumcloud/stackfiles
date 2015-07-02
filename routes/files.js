var yaml = require('js-yaml'),
    fs   = require('fs'),
    File = require('../models/composeFiles.js');

var auth = function(req, res, next){
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
};

module.exports = function(app) {
    app.post('/create', auth, function(req, res){
        var file = new File({
            title: req.body.params.form.title,
            compose: req.body.params.form.compose,
            readme: req.body.params.form.readme,
            user: req.user.username,
            profileLink: req.user.profileUrl,
            tags: req.body.params.form.tags
        })

        file.save(function(err, savedFile){
            if(err){
                console.log(err);
            }
        });
        res.redirect('/registry/' + file._id);
    });

    app.get('/files', auth, function(req, res){
        File.find({}, function(err, files){
            if(err) console.log(err)
            res.json(files)
        });
    });

    app.get('/files/:id', auth, function(req, res){
        File.findOne({_id: req.query.id}, function(err, files){
            if(err) console.log(err)
            res.json(files)
        });
    });
};
