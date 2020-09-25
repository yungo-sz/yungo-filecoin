const express = require("express")
var app = express()

var ffsRouter = require("./router/ffs")
var netRouter = require("./router/net")
var minerRouter = require("./router/miner")
var reputationRouter = require("./router/reputation")
var healthRouter = require("./router/health")

app.use("/health",healthRouter)
app.use("/miners",minerRouter)
app.use("/reputation",reputationRouter)
app.use("/ffs",ffsRouter)
app.use("/net",netRouter)



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


