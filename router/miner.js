var express = require("express")
const { getMiners } = require("../utils/miner")
var router = express.Router()


// miners  查看节点所有矿工
router.get("/list",async (req,res)=>{

    let results = await  getMiners()

    res.send(results)

})


module.exports = router