const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')
const path = require('path');

// ************************* 跳转页面的处理函数 ************************
// 收到get('/admin/homePage')请求时候的接口
exports.login = (req,res,next) => {
    // res.sendFile(path.join(__dirname,"../public/test.html"));
    res.sendFile(path.join(__dirname,"../homePage.html"))
}