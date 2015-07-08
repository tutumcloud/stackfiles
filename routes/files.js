var yaml = require('js-yaml'),
    fs   = require('fs'),
    mongoosastic = require('mongoosastic'),
    File = require('../models/composeFiles.js');

var auth = function(req, res, next){
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
};

var stream = File.find().stream();
var total = 0;
var count = 0;
var done = false;

File.createMapping(function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  } else {
    console.log('mapping created!');
    console.log(mapping);
  }
});

function reIndex(stream, count, total, done){
  stream.on('data', function(doc){
    total++;
    count++;
    doc.index(function() {
      count--;
      allDone();
    });
  });

  stream.on('close', function() {
    done = true;
    allDone();
  });

  stream.on('error', function(err){
    throw err;
  });
}

function allDone() {
  if (count > 0) return;
  if (!done) return;
  console.log('indexed ' + total + ' docs');
  process.exit(0);
}

module.exports = function(app) {
    app.post('/api/v1/create', auth, function(req, res){
        var file = new File({
            title: req.body.params.form.title,
            stackfile: req.body.params.form.stackfile,
            readme: req.body.params.form.readme,
            path : req.body.params.form.path,
            user: req.user.username,
            profileLink: req.user.profileUrl,
            projectName: req.body.params.form.name,
            tags: req.body.params.form.tags
        });

        file.save(function(err, savedFile){
            if(err){
                console.log(err);
            }
            file.on('es-indexed', function(){
                console.log('file indexed');
            });
        });
        res.redirect('/registry/' + file._id);
    });

    app.get('/api/v1/files', auth, function(req, res){
        File.find({}, function(err, files){
            if(err) console.log(err);
            res.json(files);
        });
    });

    app.get('/api/v1/files/:id', auth, function(req, res){
        File.findOne({_id: req.query.id}, function(err, file){
            if(err) console.log(err);
            res.json(file);
        });
    });

    app.get('/api/v1/userfiles', auth, function(req, res){
        File.find({user: req.user.username}, function(err, files){
            if(err) console.log(err);
            res.json(files);
        });
    });

    app.get('/api/v1/userfiles/:id', auth, function(req, res){
        File.findOne({_id: req.query.id, user: req.user.username}, function(err, file){
            if(err) console.log(err);
            res.json(file);
        });
    });

    app.delete('/api/v1/userfiles/:id', auth, function(req, res){
        File.findOne({_id: req.query.id, user: req.user.username}, function(err, file){
            if(err) console.log(err);
            file.remove(function(err, data){
                if(err){
                    res.json(err);
                } else {
                    reIndex(stream, count, total, done);
                    res.json(data);
                }
            });
        });
    });

    app.post('/api/v1/userfiles/update', auth, function(req, res, next){
        File.findOneAndUpdate({
            _id: req.body.params.id,
            user: req.user.username
        }, {
            $set: {
                title: req.body.params.form.title,
                readme: req.body.params.form.readme,
                tags: req.body.params.form.tags
            }
        }, {
            safe: true
        },
            function(err, file){
                File.findOne({
                    _id: req.body.params.id,
                    user: req.user.username
                }, function(err, file){
                    file.index(function(err){
                        if(err) console.log(err);
                        res.json(file);
                    });
                });
        });
    });

    app.get("/api/v1/search", function(req, res){
        File.search({
            query_string:{
                query: req.query.term
            }
        }, function(err, data){
            if(err) console.log(err);
            res.json(data.hits.hits);
        });
    });
};
