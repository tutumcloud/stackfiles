var mongoose = require('mongoose');
var File = require('./composeFiles.js');
var findOneOrCreate = require('mongoose-find-one-or-create');

var schema = new mongoose.Schema({
    userId: {type: String},
    username: {type: String, index: {unique: true, dropDups: true}},
    profileUrl: {type: String},
    files: [File]
})

schema.plugin(findOneOrCreate);
module.exports = mongoose.model('User', schema);
