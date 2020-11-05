var express = require('express');
var router = express.Router();
var casbinmiddleware = require('../middleware/rbac.js');
var { expressJWT, secretOrPrivateKey } = require("../middleware/jwt")
var jwt = require("jsonwebtoken")

var { userRegister, userLogin } = require('../serviceImpl/userImpl')

//权限控制中间件
router.use(casbinmiddleware());

//login
router.post("/login", async (req, res) => {

    try {
        let result = await userLogin(req.body);
        res.json({
            code: 0,
            data: jwt.sign({
                id: result.id,
                username: result.username,
                mobile: result.mobile,
                wechat: result.wechat,
            }, secretOrPrivateKey, {
                expiresIn: 60 * 60 * 24
            }),
            msg: 'success',
        });
    } catch (e) {
        res.json(e)
    }

});

//register
router.post("/register", async (req, res) => {

    try {
        let result = await userRegister(req.body)
        res.json(result)
    } catch (e) {
        res.json(e)
    }

});

/* GET users listing. */
router.get('/foo', expressJWT, function (req, res) {
    console.log(req.user)
    res.send(req.user);
});

module.exports = router;