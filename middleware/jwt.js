
var jwt = require('express-jwt');

const secretOrPrivateKey = "yungo";

const  expressJWT = jwt({
    secret: secretOrPrivateKey,
    credentialsRequired: true,
    algorithms: ["HS256"]
})

module.exports = {secretOrPrivateKey,expressJWT}