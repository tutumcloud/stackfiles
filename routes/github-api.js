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

    var headers = {
      'Content-Type':     'text/x-yaml; charset=utf-8'
    };

    var files = ["docker-cloud.yml", "tutum.yml", "docker-compose.yml"];

    function fileRequest(files, i, cb){
        var options = {
          url: "https://github.com/" + username + "/" + repositoryName + "/raw/" + branch + "/" + path + "/" + files[i],
          method: 'GET',
          headers: headers
        };
        request.get(options, function(err, data){
            if(err){
                cb(err, null);
            }
            if(data){
                if(data.statusCode == 404 && i < 3){
                    fileRequest(files, i + 1, cb);
                } else if(i === 3) {
                    cb(err, null);
                } else {
                    cb(null, data.body);
                }
            }
        });
    }

    fileRequest(files, 0, function(err, data){
        if(err){
            callback(err, null);
        } else {
            callback(null, data);
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
        if(req.user !== undefined){
            res.json(req.user);
        }

    });

    //GET ORGS LIST AT CREATION
    app.get('/api/v1/user/orgs', function(req, res){
        User.findOne({username: req.user.username}, function(err, user){
            if(err){
                return next(new Error(err));
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
                return next(new Error(err));
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
                return next(new Error(err));
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
    app.get('/api/v1/user/repos/new', function(req, res){
        var organization = req.query.orgname;
        var repositoryName = req.query.repo;
        var repositoryPath = req.query.path;
        var branch = req.query.branch;
        getYAML(organization, repositoryName, branch, repositoryPath, function(err, yaml){
            if(err){
                res.send(err);
            } else {
                res.writeHead(200, {'Content-Type': 'text/x-yaml; charset=utf-8'});
                res.end(yaml);
            }
        });
    });

    //GET YAML FROM REGISTRY
    app.get('/api/v1/user/repos/file', function(req, res){
        var repositoryName = req.query.repo;
        var repositoryPath = req.query.path;
        File.findOne({_id: req.query.id}, function(err, file){
            if(err){
                res.json(new Error(err));
                res.redirect('/404');
            } else {
                getYAML(file.user, repositoryName, file.branch, repositoryPath, function(err, yaml){
                    if(err){
                        res.send('"Unable to fetch stackfile from Github. The file might have been moved or the repository deleted by its owner."');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/x-yaml; charset=utf-8'});
                        res.end(yaml);
                    }
                });
            }
        });
    });

    app.get('/api/v1/user/repos/embed', function(req, res){
        var user = req.query.user;
        var repoName = req.query.repository;
        var branch = req.query.branch;
        var path = req.query.path;

        getYAML(user, repoName, branch, path, function(err, file){
            if(err){
              res.end('Unable to fetch stackfile');
            } else {
              res.writeHead(200, {'Content-Type': 'text/x-yaml; charset=utf-8'});
              res.end(file);
            }
        });
    });
};
