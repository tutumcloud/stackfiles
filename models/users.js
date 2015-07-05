var mongoose = require('mongoose');
var File = require('./composeFiles.js');

var schema = new mongoose.Schema({
    userId: {type: String},
    username: {type: String, index: {unique: true, dropDups: true}},
    profileUrl: {type: String},
    accessToken: {type: String},
    files: [File]
});

module.exports = mongoose.model('User', schema);
