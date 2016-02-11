var mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic'),
    mongoosePaginate = require('mongoose-paginate'),
    db = require('../server.js');

var schema = new mongoose.Schema({
    title: {type: String, es_boost:2.0, es_indexed: true},
    stackfile: {type: Object},
    branch: {type: String},
    path: {type: String},
    user: {type: String, es_indexed:true},
    author: {type: String},
    description: {type: String},
    token: {
        type: Array,
        es_type: 'string',
        es_indexed:true
    },
    profileLink: {type: String},
    projectName: {type: String},
    tags: {
        type: Array,
        es_type:'string',
        es_indexed:true
    },
    images: {
        type: Array,
        es_type:'string',
        es_indexed: true
    },
    stars: {type: Number, default: 0, es_indexed: true, es_type:'integer'},
});

var env = process.env.NODE_ENV;
if (env == 'development'){
    console.log("Using dev ES");
    schema.plugin(mongoosastic, {
      host: '192.168.99.100',
      auth: 'admin:test'
    });
    schema.plugin(mongoosePaginate);
}

if (env == 'production'){
    var host = process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR;
    var port = process.env.ELASTICSEARCH_PORT_9200_TCP_PORT;
    schema.plugin(mongoosastic, {
        host: host,
        auth: process.env.ELASTICSEARCH_USER + ':' + process.env.ELASTICSEARCH_PASS
    });
    schema.plugin(mongoosePaginate);
}

module.exports = db.model('File', schema);
