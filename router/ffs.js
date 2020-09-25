var express = require("express")

var multer  = require('multer');

var upload = multer({});

var router = express.Router()

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
    watchLogs
} = require("../utils/ffs")

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
router.post("/stage",upload.any(),async (req,res) =>{

    let fileInfo = req.files[0]
    let result = await stage(fileInfo.buffer)
    res.send(result)

})

// ffs pushStorageConfig将数据存储到cold storage => filecoin
router.put("/pushStorageConfig/:cid",async (req,res) =>{

    let result = await pushStorageConfig(req.params.cid)
    res.send(result)
    
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
router.get("/logs/:cid", async (req, res) => {

    // res.set('Content-Type: text/event-stream')

    let logs = []
    watchLogs(function (logEvent) {
        console.log(logEvent)
        logs.push(logEvent)
    }, req.params.cid)

    setTimeout(() =>{res.send(logs)}, 3000)

    // setInterval(()=>{res.send(new Date())},2000)
    // res.send(new Buffer('342432'))
})

// ffs Fetches the storage config for the provided cid:QmZc5wydh9YsSECrCKcZCBMNhLRpgS1THibT3pakcbbJpp
router.get("/storageConfig/:cid", async (req, res) => {

    let result = await getStorageConfig(req.params.cid)

    res.send(result)
   
})


module.exports = router