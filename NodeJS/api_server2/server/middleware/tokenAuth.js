const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
        let token = req.cookies.token

        jwt.verify(token, config.jwtSecretKey, (err, payload) => {
            // 过期将直接返回登录页
            if(err) return res.redirect('../index.html')
            console.log('=================token验证成功===================')
            req.user = payload
            next()
        })
}