var express = require('express'), router = express.Router();
var model = require('../model/users_model');
var logging_keys = {
    'module' : 'users-controller'
};

router.use(function(req, res, next) {
    req.logger.info(logging_keys, 'processing [%s] of %s:%s', req.baseUrl, req.method, req.url);
    next();
});

router.get('/', function (req, res) {
    model.all(function (err, docs) {
        if (err) {
            req.logger.error(logging_keys, 'error encountered - %s', err);
            res.status(500).json({message : 'No data available'});
        } else
            res.json({result: docs});
    });
});

module.exports = router;
