var pool = require("../db/pool")

var snowflake = require('./id')

//用户注册
const userRegister = member => new Promise((resolve, reject) => {

    pool.getConnection(function (err, connection) {
        if (err) reject(err); // not connected!
        //默认10个fil币
        member = Object.assign(member, { id: snowflake.generate(), fil: 10.00000 })
        // Use the connection
        connection.query('INSERT INTO MEMBER SET ?', member, function (error, results, fields) {
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error) reject(error);
            resolve({ code: 0, data: results, msg: 'success' })
            // Don't use the connection here, it has been returned to the pool.
        });
    });

})

//用户登录
const userLogin = info => new Promise((resolve, reject) => {

    pool.getConnection(function (err, connection) {
        if (err) reject(err); // not connected!
        // Use the connection
        connection.query('SELECT * FROM MEMBER WHERE username = ?', info.username, function (error, results, fields) {
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error) reject(error);
            if (results[0] && results[0].password == info.password)
                resolve( results[0])
            else
                reject({ code: -1, data: null, msg: '账号或者密码错误！' })
            // Don't use the connection here, it has been returned to the pool.
        });
    });

})

module.exports = {

    userRegister,
    userLogin
}

