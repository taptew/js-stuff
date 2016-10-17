var express = require('express');
var app = express();
var body_parser = require('body-parser');

app.use(body_parser.urlencoded({ extended: true}));
app.use(body_parser.json());

var port = process.env.PORT || 9090;

// routes
var router = express.Router();

router.get('/ping', function(req, res) {
    res.json({message : 'pong @' + (new Date()).toLocaleString()});
});
app.use('/', router);

var api_routes = require('./app/routes/api_routes');
app.use('/api', api_routes);

app.listen(port);
console.log('Server listening on port ' + port);