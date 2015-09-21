var mongoose = require('mongoose'),
    File = require('./composeFiles.js'),
    db = require('../server.js');

var schema = new mongoose.Schema({
    userId: {type: String},
    username: {type: String, index: {unique: true, dropDups: true}},
    profileUrl: {type: String},
    accessToken: {type: String},
    favorites: {
        type: Array,
        es_type: 'string'
    }
});

module.exports = db.model('User', schema);
