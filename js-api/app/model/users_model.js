var user_dao = require('../dao/user_dao');

exports.all = function (callback) {
    user_dao.list({}, null, function (err, docs) {
        callback(err, docs)
    })
};
