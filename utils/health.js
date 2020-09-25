var pow =require("./pow.js")

//健康检查
const checkHealth = () => pow.health.check()

module.exports={
    checkHealth
}