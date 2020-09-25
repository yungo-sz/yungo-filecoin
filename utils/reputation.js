var pow =require("./pow.js")

// addSource   Adds a new external source to be considered for reputation generation
// topMiners   Fetches a list of the currently top rated miners
const getTopMiners = limit => pow.reputation.getTopMiners(limit)

module.exports={
    getTopMiners
}