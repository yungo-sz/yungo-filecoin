var { createPow } = require("@textile/powergate-client")

const host = "http://183.61.251.232:6002" 

const pow = createPow({ host })

pow.setToken("9854ca")

module.exports = pow
