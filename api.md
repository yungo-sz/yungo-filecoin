
// //miners  查看节点所有矿工
// getMiners().then(res=>{console.log('miners:',res)})
// //health  查看powergate 健康状态
// checkHealth().then(res=>{console.log('health:',res)})
// // net peers 查看chain节点
// getPeers().then(res=>{console.log('peers:',res)})
// //topMiners 查看矿工排名
// getTopMiners(10).then(res=>{console.log('top 10 miners:',res)})
// //ffs info 查看ffs信息
// info().then(res=>{console.log('info:',res)})
// //ffs id  查看ffs的ID
// id().then(res=>{console.log('id:',res)})
// //ffs addrs 查看ffs管理的钱包地址
// addrs().then(res=>{console.log('addrs:',res)})
// // ffs stage stageFolder  暂存文件/文件夹到hot存储区域
// var buf = fs.readFileSync('./package.json')
// stage(buf).then(res=>{console.log('stage-result: ',res)})
// stageFolder('./utils').then(res => { console.log('stageFolder-result:', res) })
// //ffs default push 将文件的cid发布到cold storage 等待 存储调度
// pushStorageConfig('QmZc5wydh9YsSECrCKcZCBMNhLRpgS1THibT3pakcbbJpp').then(res=>{console.log('push clod storage:',res)})
// //ffs watch
// watchJobs(job => {
//   console.log('jobs-status:', job)
// }, 'b9ce8729-1660-45be-b47e-05ac81428e1c')
// // ffs listStorageDealRecords,listRetrievalDealRecords
// listStorageDealRecords({includeFinal:true,includePending:true}).then(res=>{console.log('storageDealRecords:',res)})
// listRetrievalDealRecords({}).then(res=>{console.log('retrievalDealRecords:',res)})
// ffs get 获取文件从ffs
// get('QmZc5wydh9YsSECrCKcZCBMNhLRpgS1THibT3pakcbbJpp').then(res => {
//   let result = res.reduce((pre, cur) => {
//     return pre + String.fromCharCode(cur)
//   }, '')
//   console.log('file:',result)
// })
// // ffs defaultStorageConfig 获取ffs默认配置
// defaultStorageConfig().then(res => { console.log('defaultStorageConfig:', res) })
// // ffs Fetches the storage config for the provided cid
// getStorageConfig('QmZc5wydh9YsSECrCKcZCBMNhLRpgS1THibT3pakcbbJpp').then(res=>{console.log('storage config:',res)})
//ffs log  查看 cid的日志
// console.log('log:',watchLogs)
// watchLogs(function(res){
//   console.log(`日志:`,res)
// },'QmZc5wydh9YsSECrCKcZCBMNhLRpgS1THibT3pakcbbJpp')