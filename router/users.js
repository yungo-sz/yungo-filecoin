var express = require('express');
var router = express.Router();
var casbinmiddleware = require('../middleware/rbac.js');
var { expressJWT,secretOrPrivateKey } = require("../middleware/jwt")
var jwt = require("jsonwebtoken")

//权限控制中间件
router.use(casbinmiddleware());

//login
router.post("/login", function (req, res) {
    res.json({
        result: 'ok',
        token: jwt.sign({
            name: "牛空空",
            data: "========="
        }, secretOrPrivateKey, {
            expiresIn: 60 * 60 * 24
        })
    })
});

//register
router.post("/register", function (req, res) {
    res.json(req.body)
});

/* GET users listing. */
router.get('/foo', expressJWT, function (req, res) {
    console.log(req.user)
    res.send(req.user);
});

module.exports = router;