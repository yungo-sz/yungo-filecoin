var pow = require("./pow.js")

//addr          Get the listen address of the node
const listenAddr = () => pow.net.listenAddr()
//connect       Connect to a specified peer
const connectedness = peerId => pow.net.connectedness(peerId)
//connectedness Check connectedness to a specified peer
//disconnect    Disconnect from specified peer
const disconnectPeer = peerId => pow.net.disconnectPeer(peerId)
//find          Find a peer by peer id
const findPeer = peerId => pow.net.findPeer(peerId)
//peers         Get the node peer
const getPeers = () => pow.net.peers()

module.exports = {
    getPeers,
    findPeer,
    disconnectPeer,
    connectedness,
    listenAddr
}