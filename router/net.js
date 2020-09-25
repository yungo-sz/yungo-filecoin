var express = require("express")
const { getPeers,listenAddr,findPeer } = require("../utils/net")
var router = express.Router()

// net peers 查看chain上所有的peer节点
router.get("/peers",async (req,res)=>{

    let results = await getPeers()

    res.send(results)

})

//addr          Get the listen address of the node
router.get("/listenAddr",async (req,res)=>{

    let results = await listenAddr()

    res.send(results)

})

//find    Find a peer by peer id: 12D3KooWS8Kozc6XqZm3aP99e3MvtdzML9bKFYAnDZW9pWjrYSSV
router.get("/findPeer/:peerId",async (req,res)=>{

    let result = await findPeer(req.params.peerId)

    res.send(result)

})


// //connect       Connect to a specified peer
// const connectedness = peerId => pow.net.connectedness(peerId)
// //connectedness Check connectedness to a specified peer
// //disconnect    Disconnect from specified peer
// const disconnectPeer = peerId => pow.net.disconnectPeer(peerId)



module.exports = router