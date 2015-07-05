var Github = require("github-api");
var User = require('../models/users.js');

//BUILD ALL HELPER
function listRepos(accessToken, callback){ //CALLBACK HERE
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

function getYAML(accessToken, username, repositoryName, callback){
    var github = new Github({
      token: accessToken
    });

    var repo = github.getRepo(username, repositoryName);
    repo.read('master', 'tutum.yml', function(err, data) {
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
        User.findOne({username: req.user.username}, function(err, user){
            if(err){
                console.log(err);
                res.redirect('/registry');
            }
            getYAML(req.user.accessToken, req.user.username, repositoryName, function(err, file){
                if(err){
                    console.log(err);
                } else {
                    res.send(file);
                }
            });
        });
    });
};
