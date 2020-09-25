var { createPow } = require("@textile/powergate-client")

const host = "http://45.113.32.176:6002" 

const pow = createPow({ host })

pow.setToken("f990258c-01a3-43df-ac72-299cd2a10773")

module.exports = pow
