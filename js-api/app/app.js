var express = require('express'), app = express();
var db = require('./db');
var logger = require('./util/logger');

//app.engine('jade', require('jade').__express);
//app.set('view engine', 'jade');

app.use(function(req, res, next) {
    req.logger = logger.child({req_id: id_generator.next()});
    next();
});

app.use('/comments', require('./controller/comments_ctlr'));
app.use('/users', require('./controller/users_ctlr'));

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/mydatabase', function (err) {
    if (err) {
        logger.error('Unable to connect to Mongo');
        process.exit(1);
    } else {
        app.listen(3000, function () {
            logger.info('Listening on port 3000...');
        })
    }
});


var id_generator = function() {
    var req_index = 1;
    return {
        next: function() {
            return req_index++;
        }
    }
}();