var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'api_test',
    connectionLimit : 50
});

module.exports = pool;
