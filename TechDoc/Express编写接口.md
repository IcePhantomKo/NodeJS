# 使用 Express 写接口

## 1.1 创建 API 路由模块

```
// api.Router.js 【路由模块】
const express = require('express')
const apiRouter = express.Router()
//bind your router here
module.exports = apiRouter

//--------------------------------

// app.js 【导入并注册路由模块】
const apiRouter = require('./apiRouter.js')
app.use('/api',apiRouter)
```
## 1.2 编写 GET 接口
app.js

```
const express = require('express')
// app.js 【导入并注册路由模块】
const router = require('./apiRouter.js')
const app = express()

// 把路由模块，注册到app上
app.use('/api',router)

app.listen(8000,() => {
    console.log('http://127.0.0.1');
})
```
apiRouter.js

```
// api.Router.js 【路由模块】
const express = require('express')
const router = express.Router()
//在这里挂载对应的路由
router.get('/get',(req,res) =>{
    // 通过req.query 获取客户端通过查询字符串，发送到服务器的数据
    const query = req.query
    // 调用res.send()方法，向客户端响应处理的结果
    res.send({
        status: 0,  //0 表示处理成功， 1 表示失败
        msg: 'GET 请求成功！',
        data:query
    })
})
module.exports = router
```
Postman GET请求

```
http://127.0.0.1:8000/api/get?name=zs&age=22&gender=male
```
返回的结果
> {
    "status": 0,
    "msg": "GET 请求成功！",
    "data": {
        "name": "zs",
        "age": "22",
        "gender": "male"
    }
}

## 1.3 编写 POST 接口
app.js

```
const express = require('express')
const router = require('./apiRouter')
const app = express()

// 配置解析表单数据的中间件
app.use(express.urlencoded({
    extended:false
}))
app.use('/api',router)

app.listen(8000,() =>{
    console.log('http://127.0.0.1');
})
```

apiRouter.js

```
const express = require('express')
const router = express.Router()

// 定义post接口
router.post('/post',(req,res) =>{
    // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
    const body = req.body
    res.send({
        status: 0,
        msg: 'POST 请求成功！',
        data:body
    })
})

module.exports = router
```
Postman POST请求（选择x-www-form-urlencoded)

## 1.4 CORS相关（跨域问题）
使用 cors 中间件解决跨域问题
- 运行 npm install cors 安装中间件
- 使用 const cors = require('cors') 导入中间件
- 在路由之前调用 app.use(cors())

##### 什么是 CORS
cors（Cross-Origin Resource Sharing,跨域资源共享）由一系列HTTP响应头组成，这些HTTP响应头决定浏览器是否组织前端JS代码跨域获取资源。
##### CORS 的注意事项
- 主要在服务器端进行配置。客户端浏览器无需做任何额外配置，即可开启了CORS的接口。
- CORS在浏览器中由兼容性。只有支持XMLHttpRequest Level2的浏览器可以兼容。
##### CORS 响应头部 -Access-Control-Allow-Origin,origin 参数的值指定了 **允许访问该资源的外域 URL**

```
res.setHeader('Access-Control-Allow-Origin','http://baidu.com')
```
只接收百度发来的请求

```
res.setHeader('Access-Control-Allow-Origin','*')
```
允许任何域的请求

 
