var { createPow } = require("@textile/powergate-client")

const host = "http://45.113.32.176:6002" 

const pow = createPow({ host })

// pow.setToken("f9")

module.exports = pow
