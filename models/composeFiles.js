var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {type: String},
    compose: {type: Object},
    readme: {type: String},
    user: {type: String},
    profileLink: {type: String},
    tags: {type: [String]},
})

module.exports = mongoose.model('File', schema);
