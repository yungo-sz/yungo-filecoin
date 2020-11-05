var { createPow } = require("@textile/powergate-client")
const host = "http://183.61.251.226:6002" 
const pow = createPow({ host })
pow.setToken("459ace63-a62c-4a2b-b254-e88ea6d14855")

module.exports = pow
