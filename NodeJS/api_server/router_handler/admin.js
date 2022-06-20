// 导入数据库操作模块
// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// ************************* 跳转页面的处理函数 ************************
// 收到get('/admin/homePage')请求时候的接口

exports.login = (req,res) => {
    //     res.send({
    //     status:200,
    //     message:'用户信息获取成功了！',
    // })
    // jwt.verify(token)
    
    // 给homePage.html页面token授权
}