var pow = require("./pow.js")


// create      Create ffs instance
// show        Show pinned cid data
// paych       Provides commands to manage payment channels
// remove      Removes a Cid from being tracked as an active storage
// replace     Pushes a StorageConfig for c2 equal to that of c1, and removes c1
// send        Send fil from one managed address to any other address


// id          Returns the FFS instance id
const id = () => pow.ffs.id()
// info        Get info from ffs instance
const info = () => pow.ffs.info()
// addrs       Provides commands to manage wallet addresses
const addrs = () => pow.ffs.addrs()
// stage      Temporarily stage data in the Hot layer in preparation for pushing a cid storage config
const stage = buf => pow.ffs.stage(buf)
const stageFolder = path => pow.ffs.stageFolder(path)
// config      Provides commands to manage storage configuration
const pushStorageConfig = cid => pow.ffs.pushStorageConfig(cid, { override: true })
// config     Returns the default storage config
const defaultStorageConfig = cid => pow.ffs.defaultStorageConfig(cid)
//config  Fetches the storage config for the provided cid
const getStorageConfig = cid => pow.ffs.getStorageConfig(cid)
//config  Sets the default cid storage config from stdin or a file
// pow.ffs.setDefaultStorageConfig()
// watch       Watch for job status updates
const watchJobs = (handler, jobId) => pow.ffs.watchJobs(handler, jobId)
// storage     List storage deal records for an FFS instance
const listStorageDealRecords = optional => pow.ffs.listStorageDealRecords(optional)
// retrievals  List retrieval deal records for an FFS instance
const listRetrievalDealRecords = optional => pow.ffs.listRetrievalDealRecords(optional)
// get    Get data by cid from ffs
const get = cid => pow.ffs.get(cid)
// log         Display logs for specified cid
const watchLogs = (handler, cid) => pow.ffs.watchLogs(handler, cid, { includeHistory: true })
// cancel      Cancel an executing job
const cancelJob = jobId => pow.ffs.cancelJob(jobId)

// storage-job Get a storage job's current status
const getStorageJob = jobId => pow.ffs.getStorageJob(jobId)


module.exports = {
    id,
    info,
    addrs,
    stage,
    stageFolder,
    pushStorageConfig,
    watchJobs,
    listStorageDealRecords,
    listRetrievalDealRecords,
    getStorageConfig,
    get,
    defaultStorageConfig,
    getStorageJob,
    watchLogs,
    cancelJob
}