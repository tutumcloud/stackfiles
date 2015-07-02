var mongoose = require('mongoose')
    mongoosastic = require('mongoosastic');

var schema = new mongoose.Schema({
    title: {type: String, es_boost:2.0, es_indexed: true},
    compose: {type: Object},
    readme: {type: String},
    user: {type: String, es_indexed:true},
    profileLink: {type: String},
    tags: {
        type: Array,
        es_type:'string',
        es_indexed:true
    },
})

schema.plugin(mongoosastic, {
  hosts: [
    '192.168.59.103:9200'
  ]
});

module.exports = mongoose.model('File', schema);
