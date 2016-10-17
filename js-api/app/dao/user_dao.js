var base_dao = require('./base_dao');
var _ = require('underscore-node');

var collection_name = "users";
var object_key = "_id";

var api = _.defaults(
    {
        'collection_name': collection_name,
        'object_key': object_key
    }, base_dao);

module.exports = api;