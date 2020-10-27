var { createPow } = require("@textile/powergate-client")
const host = "http://183.61.251.232:6002" 
const pow = createPow({ host })
pow.setToken("9854caec-6df1-4581-adbe-04e565375208")

module.exports = pow
