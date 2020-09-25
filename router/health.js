var express = require("express")
const { checkHealth } = require("../utils/health")
var router = express.Router()


//查看powergate 健康状态
router.get("/check", async (req, res) => {

    let results = await checkHealth()
    res.send(results)

})

module.exports = router