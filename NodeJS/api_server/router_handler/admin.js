const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')
const path = require('path')

// ************************* 跳转页面的处理函数 ************************
// 收到get('/admin/homePage')请求时候的接口

exports.login = (req,res) => {
    // token 验证时要把Bearer去掉
    const token = req.headers.authorization.split(" ")[1];

    res.header({'Authorization': req.headers.authorization})
    
    // token 验证
    jwt.verify(token,config.jwtSecretKey,(err,data) =>{
        if(err){
            res.send({
                status:'401',
                msg:'token无效',
                err:err
            })
        }else{
            res.sendFile(path.resolve(__dirname,"../homePage.html"));
            res.header({'Authorization': req.headers.authorization})
            res.send({
                status:'1',
                msg:'token有效',
                data:data,
                req:req.headers.authorization
            })
        }
    })
}