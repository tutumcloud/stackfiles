var express = require('express'),
    app = express();

var port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/www'));


app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.listen(port);
