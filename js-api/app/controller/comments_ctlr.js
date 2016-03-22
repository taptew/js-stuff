var express = require('express'), router = express.Router();
var model = require('../model/comments_model');
var api_response = require('../util/api_response');

var body_parser = require('body-parser');
var _ = require('underscore-node');

var logging_keys = {
    'module' : 'comments-controller'
};

router.use(body_parser.json());
router.use(body_parser.urlencoded({extended : true}));

router.use(function(req, res, next) {
    req.logger.info(logging_keys, 'processing [%s] of %s:%s', req.baseUrl, req.method, req.url);
    next();
});

router.get('/all', function (req, res) {
    model.all(function (err, docs) {
        res.json({result: docs});
    });
});

router.get('/recent', function (req, res) {
    model.recent(function (err, docs) {
        if (err)
            api_response.internal_error(res, 'Unable to retrieve recent comments');
        else
            api_response.ok(res, docs);
    });
});

router.post('/', function (req, res) {
    req.logger.info(logging_keys, 'request body %s', req.body);
    res.format({
        json: function() {
            api_response.not_implemented(res, 'api under development')
        },

        default: function() {
            api_response.not_acceptable(res, 'Unsupported or no mime-type in the request')
        }
    });
});

module.exports = router;
