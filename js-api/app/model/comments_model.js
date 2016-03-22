/*
var db = require('../db');
exports.all = function (cb) {
    var collection = db.get().collection('comments');

    collection.find().toArray(function (err, docs) {
        cb(err, docs)
    })
};

exports.recent = function (cb) {
    var collection = db.get().collection('comments');

    collection.find().sort({'date': -1}).limit(100).toArray(function (err, docs) {
        cb(err, docs)
    })
};
*/
var comment_dao = require('../dao/comment_dao');

exports.all = function (cb) {
    comment_dao.list({}, null,function (err, docs) {
        cb(err, docs)
    })
};

exports.recent = function (cb) {
    comment_dao.list({}, {'date': -1}, function (err, docs) {
        cb(err, docs)
    })
};

