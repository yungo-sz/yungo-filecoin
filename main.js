const express = require("express")
var app = express()
var bodyParser = require('body-parser');

//jwt
var jwt = require('jsonwebtoken');
var { expressJWT, secretOrPrivateKey } = require("./middleware/jwt")
//router
var userRouter = require("./router/users")
var ffsRouter = require("./router/ffs")
var netRouter = require("./router/net")
var minerRouter = require("./router/miner")
var reputationRouter = require("./router/reputation")
var healthRouter = require("./router/health")

app.use(bodyParser.json())
//设置jwt认证过滤器
// app.use(expressJWT.unless({
//   path: ['/users/login','/users/register']
// }));

app.use("/users", userRouter)
app.use("/health", healthRouter)
app.use("/miners", minerRouter)
app.use("/reputation", reputationRouter)
app.use("/ffs", ffsRouter)
app.use("/net", netRouter)

app.listen(3000, function () {

  console.log("server listening on port 3000")

});






