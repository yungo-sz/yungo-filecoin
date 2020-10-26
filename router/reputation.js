var express = require("express")
const { getTopMiners } = require("../utils/reputation")
var router = express.Router()
var { expressJWT } = require("../middleware/jwt")

//jwt校验中间件
router.use(expressJWT)


// topMiners 查看矿工排名
router.get("/getTopMiners/:limit",async (req,res)=>{

    let results = await  getTopMiners(req.params.limit)

    res.send(results)

})


module.exports = router