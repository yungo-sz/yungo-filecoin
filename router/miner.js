var express = require("express")
const { getMiners } = require("../utils/miner")
var router = express.Router()
var { expressJWT } = require("../middleware/jwt")

//jwt校验中间件
router.use(expressJWT)

// miners  查看节点所有矿工
router.get("/list",async (req,res)=>{
    let results = await  getMiners()
    res.send(results)
})


module.exports = router