var db = require('../db');
var _ = require('underscore-node');
var logger = require('../util/logger');

var logging_keys = {
    'module' : 'comments-controller'
};

var api = {
    'collection_name': undefined,
    'object_key': "_id",

    'create': function (obj_for_create, callback) {
        logger.debug(logging_keys, 'creating %s', this.collection_name);

        var collection = db.get().collection(this.collection_name);
        collection.insertOne(obj_for_create, function (err, result) {
            callback(err, err ? null : result.ops[0]);
        });
    },

    'update': function (obj_for_update, callback) {
        logger.debug(logging_keys, 'updating %s', this.collection_name);

        var collection = db.get().collection(this.collection_name);
        if (!obj_for_update[this.object_key]) {
            callback({reason: 'bad values'}, null);
            return;
        }

        collection.updateOne(obj_for_update, function (err, result) {
            callback(err, err ? null : result.ops[0]);
        });
    },

    'delete': function (key, callback) {
        logger.debug(logging_keys, 'deleting %s', this.collection_name);

        var collection = db.get().collection(this.collection_name);
        var criteria = {};
        criteria[this.object_key] = key;

        collection.deleteOne(criteria, function (err, result) {
            callback(err, err ? null : result.ops[0]);
        });
    },

    'read': function (key, callback) {
        logger.debug(logging_keys, 'reading %s', this.collection_name);

        var collection = db.get().collection(this.collection_name);
        var criteria = {};
        criteria[this.object_key] = key;

        collection.find(criteria).limit(1).next(function (err, result) {
            callback(err, err ? null : result.ops[0]);
        });
    },

    'list': function (filter, sort, callback) {
        logger.debug(logging_keys, 'list %s', this.collection_name);

        var collection = db.get().collection(this.collection_name);
        var criteria = {};

        if (_.isObject(filter)) {
            // TODO: copy only the supported properties.
            criteria = _.extend(criteria, filter);
        }

        var cursor = collection.find(criteria);
        if (sort) {
            cursor.sort(sort);
        }
        cursor.limit(100).toArray(function (err, result) {
            callback(err, err ? null : result);
        });
    }
};

module.exports = api;

