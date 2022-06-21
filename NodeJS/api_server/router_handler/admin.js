const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')
const path = require('path');

// ************************* 跳转页面的处理函数 ************************
// 收到get('/admin/homePage')请求时候的接口

exports.login = (req,res) => {
    res.sendFile(path.resolve(__dirname,"../homePage.html"));

    res.header({'Authorization': req.headers.authorization})

    res.send({
        status:200,
        authorization:req.headers.authorization
    })
}