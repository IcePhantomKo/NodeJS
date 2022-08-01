// 全局变量地址
// const my_ip = 'http://172.20.10.2:8000'
const my_ip = 'http://10.110.133.212:8000'

// 导入 express
const express = require('express')
// 创建express实例
const app = express()

// 导入并配置cors中间件
const cors = require('cors')
// 导入cookieParser
const cookieParser = require('cookie-parser')
// token验证中间件
const tokenAuth = require('./middleware/tokenAuth')

app.use(cookieParser())

app.use(cors())

app.use('/public/css', express.static('public/css'))
app.use('/public/js',express.static('public/js'))
app.use('/public/icon',express.static('public/icon'))
app.use('/public/img',express.static('public/img'))

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "public/index.html" );
 })
app.get('/public/homePage.html',tokenAuth,function(req,res){
    res.sendFile(__dirname + "/" + "public/homePage.html")
})

// 配置解析表单数据的中间件
// 注意这个中间件智能解析application/x-www-form-urlencoded样式中间件
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

    res.cc(err)
})

const adRouter = require('./router/admin')
app.use('/admin',adRouter)

app.listen(8000,() =>{
    // console.log('运行在 http://10.110.133.212:8000');
    console.log(my_ip);
})