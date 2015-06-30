var yaml = require('js-yaml');
var fs   = require('fs');

var File = require('../models/composeFiles.js');

// Get document, or throw exception on error
/*try {
  var doc = yaml.safeLoad(fs.readFileSync('./routes/test.yml', 'utf8'));
  console.log(yaml.dump(doc))
} catch (e) {
  console.log(e);
}*/
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
        res.redirect('/registry'); //Redirect to corresponding db entry
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
