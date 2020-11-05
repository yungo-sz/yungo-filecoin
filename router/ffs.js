var express = require("express")
var multer = require('multer');
var upload = multer({});
var router = express.Router()
var { stageFile, listStageFiles, dealFile } = require('../serviceImpl/ffsImpl')

var { expressJWT, secretOrPrivateKey } = require("../middleware/jwt")

router.use(expressJWT)

const {
    id,
    info,
    addrs,
    stage,
    stageFolder,
    pushStorageConfig,
    watchJobs,
    listStorageDealRecords,
    listRetrievalDealRecords,
    getStorageConfig,
    get,
    defaultStorageConfig,
    watchLogs,
    getStorageJob
} = require("../utils/ffs")

router.get("/foo", function (req, res) {

    res.send("foo")
});

// ffs info 查看ffs信息
router.get("/info", async (req, res) => {

    let result = await info()
    res.send(result)
})

// ffs id  查看ffs的ID
router.get("/id", async (req, res) => {

    let result = await id()
    res.send(result)
})

// ffs addrs 查看ffs管理的钱包地址
router.get("/addrs", async (req, res) => {

    let result = await addrs()
    res.send(result)
})
// ffs stage stageFolder  暂存文件/文件夹到hot存储区域
router.post("/stage", upload.any(), async (req, res) => {

    try {
        let fileInfo = req.files[0]
        console.log('info:', fileInfo.originalname, req.user);
        let result1 = await stage(fileInfo.buffer);
        let result2 = await stageFile(Object.assign(req.user, { cid: result1.cid, filename: fileInfo.originalname }))
        res.send({ code: 0, data: result2, msg: 'success' })
    } catch (e) {
        res.json(e)
    }

})
//遍历stage到ipfs的文件
router.get("/list", async (req, res) => {

    try {
        let result = await listStageFiles(Object.assign(req.query, req.user))
        res.send({ code: 0, data: result, msg: 'success' })
    } catch (e) {
        res.json({ code: -1, data: null, msg: e.message })
    }

})

// ffs pushStorageConfig将数据存储到cold storage => filecoin
router.put("/pushStorageConfig/:cid", async (req, res) => {

    try {
        let result1 = await pushStorageConfig(req.params.cid)
        let result2 = await dealFile(Object.assign({ job_id: result1.jobId }, req.params, req.user))
        res.send({ code: 0, data: result2, msg: 'success' })
    } catch (e) {
        res.send({ code: -1, data: null, msg: e.message })
    }

})

//ffs storage-job
/**
 * type JobStatus int
 * 
 * const (
 *  
 * Unspecified JobStatus =iota
 * 
 * Queued
 * 
 * Executing
 * 
 * Failed
 * 
 * Canceled
 * 
 * Success
 * 
 * )
 * 
 *  */ 
router.get("/storagejob/:jobID", async (req, res) => {

    try {
        let result = await getStorageJob(req.params.jobID);
        res.json({code:0,data:result,msg:'success'})
    }catch(e){
        res.json({code:-1,data:null,msg:e.message})
    }

})

// ffs watchJob by jobId : 'b9ce8729-1660-45be-b47e-05ac81428e1c'
router.get("/watchJob/:jobId", async (req, res) => {

    watchJobs(job => {
        res.send(job)
    }, req.params.jobId)

})

//  ffs listStorageDealRecords,listRetrievalDealRecords
router.get("/listStorageDeal", async (req, res) => {

    let results = await listStorageDealRecords({ includeFinal: true, includePending: true })
    res.send(results)

})

//  ffs listRetrievalDealRecords
router.get("/listRetrievalDeal", async (req, res) => {
    let results = await listRetrievalDealRecords({ includeFinal: true, includePending: true })
    res.send(results)

})

// ffs get 从ffs获取文件params：cid 'QmZc5wydh9YsSECrCKcZCBMNhLRpgS1THibT3pakcbbJpp'
router.get("/file/:cid", async (req, res) => {

    res.set('Content-Type', 'application/octet-stream')

    let bufs = await get(req.params.cid)

    // let results = bufs.reduce((pre, cur) => {
    //     return pre + String.fromCharCode(cur)
    // }, '')

    res.send(Buffer.from(bufs))

    // res.send(new ArrayBuffer(results))
})

//  ffs defaultStorageConfig 获取ffs默认配置
router.get("/defaultStorageConfig", async (req, res) => {

    let result = await defaultStorageConfig()
    res.send(result)
})

//ffs log  查看 cid的日志 : QmZc5wydh9YsSECrCKcZCBMNhLRpgS1THibT3pakcbbJpp
router.get("/logs/:cid", (req, res) => {

    // res.set('Content-Type: text/event-stream')

    let logs = []
    watchLogs(function (logEvent) {
        console.log(logEvent)
        logs.push(logEvent)
    }, req.params.cid)

    setTimeout(() => { res.send(logs) }, 4000)

    // setInterval(()=>{res.send(new Date())},2000)
    // res.send(new Buffer('342432'))
})

// ffs Fetches the storage config for the provided cid:QmZc5wydh9YsSECrCKcZCBMNhLRpgS1THibT3pakcbbJpp
router.get("/storageConfig/:cid", async (req, res) => {

    let result = await getStorageConfig(req.params.cid)

    res.send(result)

})


module.exports = router