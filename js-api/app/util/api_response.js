var _ = require('underscore-node');

var success_response = {
    success: true,
    data: undefined
};
var error_response = {
    success: false,
    reason: undefined
};

module.exports = {
    ok: function (res, data) {
        res.status(200).json(
            _.defaults(_.clone(success_response), {'data': data})
        );
    },

    bad_request: function (res) {
        res.status(400).json(
            error_response
        );
    },

    unauthorized: function (res) {
        res.sendStatus(401);
    },

    forbidden: function (res, reason) {
        res.status(403).json(
            _.defaults(_.clone(error_response), {'reason': reason})
        );
    },

    not_found: function (res) {
        res.sendStatus(404);
    },

    method_not_allowed: function(res, reason) {
        res.status(405).json(
            _.defaults(_.clone(error_response), {'reason': reason})
        );
    },

    not_acceptable: function(res, reason) {
        res.status(406).json(
            _.defaults(_.clone(error_response), {'reason': reason})
        );
    },

    internal_error: function (res, reason) {
        res.status(500).json(
            _.defaults(_.clone(error_response), {'reason': reason})
        );
    },

    not_implemented: function (res, reason) {
        res.status(501).json(
            _.defaults(_.clone(error_response), {'reason': reason})
        );
    }
};
