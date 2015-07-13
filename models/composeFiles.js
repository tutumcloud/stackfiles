var mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic');

var schema = new mongoose.Schema({
    title: {type: String, es_boost:2.0, es_indexed: true},
    stackfile: {type: Object},
    branch: {type: String},
    path: {type: String},
    user: {type: String, es_indexed:true},
    author: {type: String},
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
    stars: {type: Number},
});

var env = process.env.NODE_ENV;
if (env == 'development'){
    console.log("Using dev ES");
    schema.plugin(mongoosastic, {
      hosts: [
        '192.168.59.103:9200'
      ]
    });
}

if (env == 'production'){
    var host = process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR;
    var port = process.env.ELASTICSEARCH_PORT_9200_TCP_PORT;
    schema.plugin(mongoosastic, {
      hosts: [
        host + ":" + port
      ]
    });
}

module.exports = mongoose.model('File', schema);
