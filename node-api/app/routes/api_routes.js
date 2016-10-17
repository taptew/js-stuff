var api_router = require('express').Router();
var connection_pool = require('../utils/connection_pool');

api_router.get('/author/', function(req, res) {
    connection_pool.query('select * from author limit 20', function(err, rows, fields) {
        if (err) {
            console.error('db error', err);
            res.status(400).json({
                success : false,
                msg : 'db fetch error'
            });
            return;
        }

        console.log('db rows');

        res.status(200).json({
            'result' : rows,
            success: true
        })

    });
});

api_router.put('/author/', function(req, res) {

    console.log('req.body = ', req.body);

    if (!req.body.name || !req.body.email) {
        res.status(400).json({ success : false, msg : 'missing values'});
        return;
    }

    var payload = {name : req.body.name, email : req.body.email};

    connection_pool.query('insert into author set ?', payload, function(err, result) {
        if (err) {
            console.error('db error', err);
            res.status(400).json({
                success : false,
                msg : 'db insert error'
            });
            return;
        }

        console.log('new record inserted', result.insertId);

        res.status(200).json({
            'result' : result.insertId,
            success: true
        });

    });
});

api_router.get('/author/:author_id', function(req, res) {

    if (!req.params.author_id) {
        res.status(400).json({ success : false, msg : 'missing author id'});
        return;
    }

    var params = {id : req.params.author_id};

    connection_pool.query('select * from author where id = :id', params, function(err, result) {
        if (err) {
            console.error('db error', err);
            res.status(400).json({
                success : false,
                msg : 'db fetch error'
            });
            return;
        }

        console.log('records found');

        res.status(200).json({
            'result' : result,
            success: true
        });

    });
});

module.exports = api_router;
