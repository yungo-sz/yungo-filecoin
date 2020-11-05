var pool = require("../db/pool")

var snowflake = require('./id')

//热存储到IPFS
const stageFile = user => new Promise((resolve, reject) => {

    pool.getConnection(function (err, connection) {
        if (err) reject(err); // not connected!
        let recored = {
            member_id: user.id,
            filename: user.filename,
            ipfsaddr: `https://ipfs.io/ipfs/${user.cid}`,
            cid: user.cid,
            deal: 0,
        }
        // Use the connection
        connection.query('INSERT INTO FILE SET ?', recored, function (error, results, fields) {
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error)
                reject(error)
            else
                resolve(results)
            // Don't use the connection here, it has been returned to the pool.
        });
    });

})


//遍历ipfs热存储记录
const listStageFiles = page => new Promise((resolve, reject) => {

    pool.getConnection(function (err, connection) {
        if (err) reject(err); // not connected!
        // Use the connection
        connection.query('SELECT count(*) AS total from FILE where member_id = ?', page.id, function (error, results, fields) {
            // When done with the connection, release it.
            // connection.release();
            // Handle error after the release.
            if (error) {
                reject(error)
            }
            else {
                console.log(results)
                if (results && results[0]) {
                    //分页查询
                    connection.query('SELECT * FROM FILE WHERE member_id = ? LIMIT ?,?', [page.id, (page.pageNum - 1) * page.pageSize, page.pageSize * 1], function (err, res, fie) {
                        connection.release();
                        if (err) {
                            reject(err)
                        }
                        resolve({
                            list: res,
                            total: results[0].total,
                            pageNum: page.pageNum * 1,
                            pageSize: page.pageSize * 1
                        })

                    });
                }
            }
        });
    });
})


//通过filecoin发起存储交易
const dealFile = user => new Promise((resolve, reject) => {

    pool.getConnection(function (err, connection) {
        if (err) reject(err); // not connected!
       
        // Use the connection
        connection.query('UPDATE FILE SET deal = 1 ,job_id = ? WHERE member_id =? AND cid =?', [user.job_id,user.id,user.cid], function (error, results, fields) {
            // When done with the connection, release it.
            connection.release();
            // Handle error after the release.
            if (error)
                reject(error)
            else
                resolve(results)
            // Don't use the connection here, it has been returned to the pool.
        });
    });

})

module.exports = {

    stageFile,
    listStageFiles,
    dealFile
}

