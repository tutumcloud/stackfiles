var Github = require("github-api");
var request = require('request');
var User = require('../models/users.js');
var File = require('../models/composeFiles.js');

//Wrapper to get the list of repositories of the user
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

//Wrapper to get tutum.yml from repository
function getYAML(username, path, repositoryName, callback){
    var github = new Github({});
    path = path.substr(1);
    request.get("https://github.com/" + username + "/" + repositoryName + "/raw/master/" + path + "/tutum.yml", function(err, data){
        if(err){
            callback(err, null);
        }
        callback(null, data.body);
    });
}


//Wrapper to get README.md from repository
function getREADME(username, repositoryName, callback){
    var github = new Github({});
    var repo = github.getRepo(username, repositoryName);
    repo.read('master', 'README.md', function(err, data) {
        callback(null, data);
    });
}

module.exports = function(app) {

    //GET REPOS LIST AT CREATION
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

    //GET YAML FOR PREVIEW AT CREATION
    app.post('/api/v1/user/repos/new', function(req, res){
        var repositoryName = req.body.params.repo;
        var repositoryPath = req.body.params.path;
        User.findOne({username: req.user.username}, function(err, user){
            if(err){
                console.log(err);
                res.redirect('/registry');
            }
            getYAML(user.username, repositoryPath, repositoryName, function(err, yaml){
                if(err){
                    console.log(err);
                } else {
                    res.send(yaml);
                }
            });
        });
    });

    //GET YAML FROM REGISTRY
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

    //GET README FROM REGISTRY
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
