var path = require('path');
var { newEnforcer } = require('casbin');

module.exports = ()=>{

	return async function(req, res, next) {

		const e = await newEnforcer(path.join(__dirname, 'model.conf'), path.join(__dirname, 'policy.csv'));
		console.log('req','sub:alice', 'obj:', req.baseUrl, 'act:', req.method);
		let result = await e.enforce('alice', req.baseUrl, req.method);
		if (result) {
			// 认证通过
			next()
		} else {
			// deny the request, show an error
			res.send('no permission!')
		}

	}

}