var express = require("express")
const { checkHealth } = require("../utils/health")
var router = express.Router()
var { expressJWT } = require("../middleware/jwt")

//jwt校验中间件
router.use(expressJWT)


//查看powergate 健康状态
router.get("/check", async (req, res) => {

    let results = await checkHealth()
    res.send(results)

})

module.exports = router