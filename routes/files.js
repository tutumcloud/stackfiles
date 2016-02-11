var yaml = require('js-yaml'),
    fs   = require('fs'),
    mongoosastic = require('mongoosastic'),
    request = require('request'),
    path = require('path'),
    File = require('../models/composeFiles.js'),
    User = require('../models/users.js');

var BASE_URL = process.env.BASE_URL;

var auth = function(req, res, next){
    if (req.isAuthenticated()) {
         return next();
    } else {
        res.redirect('/');
    }
};

function tokenizer(name){
    var newArray = [];
    var array = name.split('');
    newArray[0] = array[0];
    for(var i = 1; i < array.length; i++){
        newArray[i] = newArray[i-1]+array[i];
    }
    return newArray;
}

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
  }
});

function reIndex(stream, count, total, done){
    console.log('reIndexing');
  stream.on('data', function(doc){
    console.log('reIndexing1');
    console.log(doc);
    total++;
    count++;
    doc.index(function() {
      count--;
      allDone();
    });
  });

  stream.on('close', function() {
    console.log('reIndexing1');
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

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/'/g, "&#039;")
         .replace(/"/g, "&quot;")
         .replace(/(?:\r\n|\r|\n)/g, '\\n');
 }

module.exports = function(app) {

    app.post('/api/v1/create', auth, function(req, res){
        var serviceTags = [];
        var serviceToken = [];
        var images = [];

        for(var key in req.body.params.form.stackfile){
            serviceTags.push(key);
            serviceToken.push(tokenizer(key));
            images.push(req.body.params.form.stackfile[key].image);
        }

        var file = new File({
            title: req.body.params.form.title,
            stackfile: req.body.params.form.stackfile,
            branch: req.body.params.form.branch,
            path : req.body.params.form.path,
            user: req.body.params.form.orgname,
            author: req.user.username,
            description: req.body.params.form.description,
            token: tokenizer(req.body.params.form.title).concat(serviceToken),
            profileLink: "https://github.com/"+req.body.params.form.orgname,
            projectName: req.body.params.form.name,
            tags: serviceTags,
            images: images
        });

        file.save(function(err, savedFile){
            if(err){
                res.send(err);
            }
            file.on('es-indexed', function(){
                console.log('file indexed');
            });
        });
        res.redirect('/registry/' + file._id);
    });

    app.get('/api/v1/files', function(req, res, next){
        File.paginate({}, {page: req.query.page, limit: req.query.limit, sortBy : {stars: -1}}, function(err, files){
            if(err){
              return next(new Error(err));
            }
            res.json(files);
        });
    });

    app.get('/api/v1/files/:id', function(req, res, next){
        File.findOne({_id: req.params.id}, function(err, file){
            if(err){
                return next(new Error(err));
            }
            res.json(file);
        });
    });

    app.get('/embed/embed.css', function(req, res, next){
        res.sendFile(path.resolve(__dirname + '/../www/css/embed.css'));
    });

    app.get('/embed/file/:id', function(req, res, next){
        var jsFile = '';
        var id = req.params.id.substring(0, req.params.id.length-3);

        File.findOne({_id: id}, function(err, file){
            if(err){
              return next(new Error(err));
            }

            var options = {
              url: BASE_URL+'/api/v1/user/repos/embed?user='+file.user+'&repository='+file.projectName+'&branch='+file.branch+'&path='+file.path,
              headers: {
                'Content-Type':'text/x-yaml; charset=utf-8'
              }
            };

            request.get(options, function(err, data){
                res.setHeader('content-type', 'text/javascript');
                res.setHeader('cache-control', 'public, max-age=300, s-maxage=300');
                jsFile = "document.write('<link rel=\"stylesheet\" href=\""+ BASE_URL +"/embed/embed.css\">');" +
                "document.write('<div id=\"stackfile\"><pre class=\"pre-stackfile\"><p class=\"stack\">"+escapeHtml(data.body)+"</p><div class=\"footer-stackfile\">"+
                "<p>Stackfile hosted by </p><a href=\"https://tutum.co\">Tutum</a><span><a class=\"boxed-btn\" "+
                "href=\"https://cloud.docker.com/stack/deploy/?repo="+ file.profileLink + "/" + file.projectName + "\" target=\"blank\">Deploy to Docker Cloud</a></span></div></pre></div>')";
                res.end(jsFile);
            });
        });
    });

    app.get('/api/v1/files/fav/:id', auth, function(req, res, next){
        File.findById(req.params.id, function(err, file){
            if(err){
                return next(err);
            }
            file.stars = file.stars + 1;
            file.save(function(err){
              if(err){
                return next(new Error(err));
              }
            });
            User.findOne({userId: req.user.id}, function(err, file){
              if(err){
                  return next(err);
              }
              file.favorites.push(req.params.id);
              file.save(function(err){
                if(err){
                  return next(new Error(err));
                }
              });
            });
        });
        File.findOne({ _id: req.params.id}, function(err, file){
            file.index(function(err, res){
                if(err){
                    console.log(req.params.id);
                    return next(new Error(err));
                }
            });
        });
        res.send("Success");
    });

    app.get('/api/v1/files/unfav/:id', auth, function(req, res, next){
        File.findById(req.params.id, function(err, file){
            if(err){
                return next(err);
            }
            file.stars = file.stars - 1;
            file.save(function(err){
              if(err){
                return next(new Error(err));
              }
            });
            User.find({userId: req.user.id}, function(err, file){
              if(err){
                  return next(err);
              }
              var index =file[0].favorites.indexOf(req.params.id);
              file[0].favorites.splice(index, 1);
              file[0].save(function(err){
                if(err){
                  return next(new Error(err));
                }
              });
            });
        });
        res.send("Success");
    });

    app.delete('/api/v1/files/:id', auth, function(req, res, next){
        File.find({_id: req.params.id, author: req.user.username}).remove(function(err, data){
          if(err){
            return next(err);
          }
          File.esTruncate(function(err, data) {
              if(err){
                  return next(new Error(err));
              }
          });
          File.synchronize();
          res.send('success');
        });
    });

    app.get('/api/v1/user/files', auth, function(req, res, next){
        File.find({author: req.user.username}, function(err, files){
            if(err){
                return next(new Error(err));
            }
            res.json(files);
        });
    });

    app.get('/api/v1/user/favorites', auth, function(req, res, next){
        User.findOne({userId: req.user.id}, function(err, user){
            if(err){
                return next(new Error(err));
            }

            File.find({'_id': { $in: user.favorites}}, function(err, files){
                if(err){
                    return next(new Error(err));
                }
                res.json(files);
            });
        });
    });

    app.get('/api/v1/user/fav', auth, function(req, res, next){
        User.findOne({userId: req.user.id}, function(err, user){
            if(err){
                return next(new Error(err));
            }
            res.json(user.favorites);
        });
    });


    app.get("/api/v1/deploy/:id", function(req, res, next){
        File.findOne({_id: req.params.id}, function(err, file){
            if(err){
                return next(new Error(err));
            } else {
                res.redirect('https://cloud.docker.com/stack/deploy/?repo='+file.profileLink+'/'+file.projectName+'/tree/'+file.branch+'/'+ file.path.substr(1));
            }
        });
    });

    app.get("/api/v1/search", function(req, res, next){
        File.search({
            query_string:{
                query: req.query.term
            }
        }, function(err, data){
            if(err){
                return next(new Error(err));
            }
            res.json(data.hits.hits);
        });
    });
};
