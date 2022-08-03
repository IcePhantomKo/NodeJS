const path = require('path');

// ************************* 跳转页面的处理函数 ************************
// 收到get('/admin/homePage')请求时候的接口
exports.login = (req,res) => {
    res.send({
        status: 1,
        message:'登录成功'
    })
    res.sendFile(path.join(__dirname,"../homePage.html"))
}