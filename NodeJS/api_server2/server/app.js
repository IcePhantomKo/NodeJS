// 导入 express
const express = require('express')
// 创建express实例
const app = express()

// 导入并配置cors中间件
const cors = require('cors')
// 导入cookieParser
const cookieParser = require('cookie-parser')
const tokenAuth = require('../../api_server/middleware/tokenAuth')

app.use(cookieParser())

app.use(cors())

app.use('/public', express.static('public'));

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })
app.get('/homePage.html',tokenAuth,function(req,res){
    res.sendFile(__dirname + "/" + "homePage.html")
})

// 配置解析表单数据的中间件,注意这个中间件智能解析application/x-www-form-urlencoded样式中间件
app.use(express.urlencoded({extended:false}))

// 一定要在路由之前封装res.cc函数
// 封装res.cc函数
app.use((req,res,next) =>{
    // status默认值为1，表示失败的情况
    // err 的值可能是一个错误的对象，也可能是错误的描述字符串
    res.cc = (err,status = 1) =>{
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 一定要在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({path: [/^\/api\//]}))

// 导入并使用路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)

const joi = require('joi')
// 错误中间件
app.use((err,req,res,next) =>{
    // 验证数据失败
    if(err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误
    if(err.name == 'UnauthorizedError') return res.cc('身份认证失败')
    // 未知错误
    res.cc(err)
})

const adRouter = require('./router/admin')
app.use('/admin',adRouter)

app.listen(8000,() =>{
    console.log('运行在 http://10.110.133.212:8000/index.html');
})