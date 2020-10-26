var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '192.168.1.233',
    user: 'root',
    password: '123456',
    database: 'seata'
});

module.exports = pool