var Github = require("github-api");
var User = require('../models/users.js');
var File = require('../models/composeFiles.js');

function listRepos(accessToken, callback){
    var github = new Github({
      token: accessToken
    });

    var userGH = github.getUser();
    userGH.repos(function(err, repos) {
        if(err){
            callback(err, null);
        } else {
            callback(null, repos);
        }
    });
}

function getYAML(username, path, repositoryName, callback){
    var github = new Github({});
    path = path.substr(1);
    var repo = github.getRepo(username, repositoryName);
    repo.read('master', path + 'tutum.yml', function(err, data) {
        callback(null, data);
    });
}

function getREADME(username, repositoryName, callback){
    var github = new Github({});

    var repo = github.getRepo(username, repositoryName);
    repo.read('master', 'README.md', function(err, data) {
        callback(null, data);
    });
}

module.exports = function(app) {

    app.get('/api/v1/user/repos', function(req, res){
        User.findOne({username: req.user.username}, function(err, user){
            if(err){
                console.log(err);
                res.redirect('/registry');
            }
            listRepos(user.accessToken, function(err, repos){
                if(err){
                    console.log(err);
                } else {
                    res.json(repos);
                }
            });
        });
    });

    app.post('/api/v1/user/repos/file', function(req, res){
        var repositoryName = req.body.params.repo;
        var repositoryPath = req.body.params.path;
        File.findOne({_id: req.body.params.id}, function(err, file){
            if(err){
                console.log(err);
                res.redirect('/registry');
            }
            getYAML(file.user, repositoryPath, repositoryName, function(err, yaml){
                if(err){
                    console.log(err);
                } else {
                    res.send(yaml);
                }
            });
        });
    });

    app.post('/api/v1/user/repos/readme', function(req, res){
        var repositoryName = req.body.params.repo;
        File.findOne({_id: req.body.params.id}, function(err, file){
            if(err){
                console.log(err);
                res.redirect('/registry');
            }
            getREADME(file.user, repositoryName, function(err, file){
                if(err){
                    console.log(err);
                } else {
                    res.send(file);
                }
            });
        });
    });
};
