var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {type: String},
    compose: {type: String},
    readme: {type: String},
    user: {type: String},
    tags: {type: [String]},
})

module.exports = mongoose.model('File', schema);
