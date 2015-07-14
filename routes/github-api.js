var Github = require("github-api");
var request = require('request');
var User = require('../models/users.js');
var File = require('../models/composeFiles.js');

//Wrapper to get the list of repositories of the user
function listUserRepos(accessToken, username, callback){
    var github = new Github({
      token: accessToken
    });

    var userGH = github.getUser();
    userGH.userRepos(username, function(err, repos) {
        if(err){
            callback(err, null);
        } else {
            callback(null, repos);
        }
    });
}

function listBranches(accessToken, username, reponame, callback){
    var github = new Github({
        token: accessToken
    });

    var repo = github.getRepo(username, reponame);
    repo.listBranches(function(err, branches) {
        if(err){
            callback(err, null);
        } else {
            callback(null, branches);
        }
    });
}

function listOrgs(accessToken, callback){
    var github = new Github({
        token: accessToken
    });

    var userGH = github.getUser();
    userGH.orgs(function(err, orgs){
        if(err){
            callback(err, null);
        } else {
            callback(null, orgs);
        }
    });
}

function listOrgRepos(accessToken, name, callback){
    var github = new Github({
      token: accessToken
    });

    var userGH = github.getUser();
    userGH.orgRepos(name, function(err, repos) {
        if(err){
            callback(err, null);
        } else {
            callback(null, repos);
        }
    });
}

//Wrapper to get tutum.yml from repository
function getYAML(username, repositoryName, branch, path, callback){
    var github = new Github({});
    path = path.substr(1);
    request.get("https://github.com/" + username + "/" + repositoryName + "/raw/" + branch + "/" + path + "/tutum.yml", function(err, data){
        if(data.statusCode == 404){
            request.get("https://github.com/" + username + "/" + repositoryName + "/raw/" + branch + "/" + path + "/docker-compose.yml", function(err, data){
                if(data.statusCode == 404){
                    callback("File not found", null);
                } else {
                    callback(null, data.body);
                }
            });
        } else {
            callback(null, data.body);
        }

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

    app.get('/api/v1/user', function(req, res){
        res.json(req.user);
    });

    //GET ORGS LIST AT CREATION
    app.get('/api/v1/user/orgs', function(req, res){
        User.findOne({username: req.user.username}, function(err, user){
            if(err){
                console.log(err);
                res.redirect('/registry');
            }
            listOrgs(user.accessToken, function(err, orgs){
                if(err){
                    res.json(err);
                } else {
                    res.json(orgs);
                }
            });
        });
    });

    //GET REPOS LIST AT CREATION
    app.get('/api/v1/user/repos', function(req, res){
        User.findOne({username: req.user.username}, function(err, user){
            if(err){
                console.log(err);
                res.redirect('/registry');
            }
            if(req.query.name == req.user.username){
                listUserRepos(user.accessToken, user.username, function(err, repos){
                    if(err){
                        res.json(err);
                    } else {
                        res.json(repos);
                    }
                });
            } else {
                listOrgRepos(user.accessToken, req.query.name, function(err, repos){
                    if(err){
                        res.json(err);
                    } else {
                        res.json(repos);
                    }
                });
            }
        });
    });

    //GET BRANCHES LIST AT CREATION
    app.get('/api/v1/user/repos/branches', function(req, res){
        var repositoryName = req.query.repo;
        var organization = req.query.orgname;
        User.findOne({username: req.user.username}, function(err, user){
            if(err){
                res.json(err);
                res.redirect('/registry');
            }
            listBranches(user.accessToken, organization, repositoryName, function(err, branches){
                if(err){
                    res.json(err);
                } else {
                    res.json(branches);
                }
            });
        });
    });

    //GET YAML FOR PREVIEW AT CREATION
    app.post('/api/v1/user/repos/new', function(req, res){
        var organization = req.body.params.orgname;
        var repositoryName = req.body.params.repo;
        var repositoryPath = req.body.params.path;
        var branch = req.body.params.branch;
        getYAML(organization, repositoryName, branch, repositoryPath, function(err, yaml){
            if(err){
                res.send(err);
            } else {
                res.send(yaml);
            }
        });
    });

    //GET YAML FROM REGISTRY
    app.post('/api/v1/user/repos/file', function(req, res){
        var repositoryName = req.body.params.repo;
        var repositoryPath = req.body.params.path;
        File.findOne({_id: req.body.params.id}, function(err, file){
            if(err){
                res.json(err);
                res.redirect('/404');
            } else {
                getYAML(file.user, repositoryName, file.branch, repositoryPath, function(err, yaml){
                    if(err){
                        res.redirect('/404');
                    } else {
                        res.send(yaml);
                    }
                });
            }
        });
    });
};
