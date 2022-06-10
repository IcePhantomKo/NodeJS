### http 请求概述
- DNS 解析，建立TCP连接，发送http请求
- server接收到http请求，处理，并返回
- 客户端接收到返回数据，处理数据（如渲染页面，执行js）

### nodejs 处理 http 请求
- get请求和querrystring
- post请求和postdata
- 路由

### nodejs 处理 get 请求
- get请求， **客户端向server端获取数据** ，如查询博客列表
- 通过querystring来传递数据，如a.html?a=100&b=200
- 浏览器直接访问，就发送get请求

### nodejs 处理 post 请求
- post请求， **客户端要像服务端传递数据** ，如新建博客
- 通过 post data 传递数据
- 浏览器无法直接模拟，需要手写js，或者使用 postman


```
const http = require('http')
const server = http.createServer((req,res) =>{
    if(req.method === 'POST'){
        //数据格式
        console.log('Content-type', req.headers['content-type'])
        //接收数据
        let postData = ''
        req.on('data',chunk => {
            postData += chunk.toString()
        })
        req.on('end',()=>{
            console.log(postData)
            res.end('hello world')
        })
    }
});
server.listen(8000);
console.log('ok');

```

### 请求不同url功能

```
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
    // 获取请求的url地址
    const url = req.url
    // 设置默认的相应内容为 404 Not Found
    let content = '<h1>404 Not Found!</h1>'
    // 判断用户请求是否为 / 或 /index.html首页 判断用户请求是否为 /about.html关于页面
    if (url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    } else if (url === '/about.html') {
        content = '<h1>关于页面</h1>'
    }
    // 设置Content-Type 响应头，防止中文乱码
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    // 使用 res.end() 把内容响应给客户端
    res.end(content)
})

server.listen(8000, () => {
    console.log('Server is running at http://127.0.0.1');
})
```

### 路径映射

```
// 1. 导入需要的模块
// 1.1导入 http 模块
const http = require('http')
// 1.2 导入 fs 模块
const fs = require('fs')
// 1.3 导入 path 模块
const path = require('path')

// 2.1 创建 web 服务器
const server = http.createServer()
// 2.2 监听 web 服务器的 request 事件
server.on('request',(req,res) => {
    // 3.1 获取到客户端请求的 url 地址
    const url = req.url
    // 3.2 把请求的 url 地址映射为具体文件的存放路径
    const fpath = path.join(__dirname, url)

    // 4.1 根据映射过来的文件路径读取文件的内容
    fs.readFile(fpath, 'utf8',(err,dataStr) =>{
        // 4.2 读取失败
        if(err) return res.end('404 Not Found!')
        res.end(dataStr)
    })
})
// 2.3 启动服务器
server.listen(8000,()=>{
    console.log('http://127.0.0.1');
})
```
### 初识 Express
建立 get / post 请求

```
const express = require('express')
// 创建服务
const app = express()
// 监听客户端的 GET 和 POST 请求，并向客户端响应具体内容
app.get('/user',(req,res)=>{
    //调用express提供的res.send方法，向客户端响应一个 json 对象
    res.send({
        name:'Jay',
        age:25
    })
})

app.post('/user',(req,res)=>{
    res.send('请求成功')
})

app.listen(8000,()=>{
    console.log('http://127.0.0.1');
})
```
查询参数

```
app.get('/',(req,res) =>{
    // 通过req.query 可以获取到客户端发送过来的 查询参数
    console.log(req.query);
    res.send(req.query);
})
```

```
PostMan Get 命令
http://localhost:8000/?name=zs&age=13
返回值：
{
    "name": "zs",
    "age": "13"
}
```

动态参数

```
app.get('/user/:id',(req,res)=>{
    // req.params 是动态匹配到的 url 参数， 默认也是一个空对象
    console.log(req.params);
    res.send(req.params);
})
```

```
PostMan Get 命令
http://localhost:8000/user/1
返回值：
{
    "id": "1"
}
```
#### 托管静态资源
express 提供了一个非常好用的函数，叫做 express.static(),通过它，我们可以非常方便地创建一个静态资源服务器。

```
app.use(express.static('public'))
```
#### 托管多个静态资源
```
app.use(express.static('public'))
app.use(express.static('files'))
```

#### Express 中的路由
在express中，路由指的是 **客户端的请求**与 **服务器处理函数**之间的 **映射关系**   
Express 中的路由分 3 部分组成，分别是 **请求的类型**， **请求的URL地址**， **处理函数** ，格式如下
```
app.METHOD(PATH,HANDLER)
```

```
// 匹配GET请求，且请求URL为/
app.get('/',function(req,res)=>{
    res.send('Hello World!')
})
```
##### 模块化路由
###### 注册路由
```
// 1. 导入express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()
// 3. 挂载具体的路由
router.get('/user/list',(req,res) =>{
    res.send('Get user list')
})
router.post('/user/add',(req,res)=>{
    res.send('Add new user.')
})
// 4. 向外导出路由对象
module.exports = router
```
###### 使用路由

```
const express = require('express')
const app = express()

// 1. 导入路由模块
const router = require('./router')
// 2. 注册路由模块
app.use(router)

app.listen(8000,()=>{
    console.log('http://127.0.0.1');
})
```
##### Express 中间件
Express 的中间件，本质上就是一个function处理函数，Express中间件的格式如下：

```
var express = require('express')
var app = express()
app.get('/',function(req,res,next){
    next()
})
app.listen(3000)
```

###### next函数的作用

**next函数**是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个 **中间件** 或 **路由**

客户端 -> 请求 -> 中间件（1） next() -> 中间件（2） next() -> 处理完毕，响应这次请求 -> 响应 -> 客户端

```
const express = require('express')
const app = express()

定义一个最简单的中间件函数
const mw = function(req,res,next){
    console.log('这是最简单的中间件');
    // 把流转关系，转交给下一个中间件或路由
    next();
}
// 定义一个全局生效的中间件
app.use(mw);

app.get('/',(req,res) =>{
    res.send('Home Page')
})

app.get('/user',(req,res) =>{
    res.send('User Page');
})

app.listen(8000,()=>{
    console.log('http://127.0.0.1');
})
``` 
简化版的中间件

```
app.use((req,res,next) =>{
    console.log('这是最简单的中间件函数');
    next();
})
```
###### 中间件的作用
多个中间件之间，共享同一分 req 和 res。基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或者方法，供下游的中间件或路由进行使用。

```
const express = require('express')
const app = express()

app.use((req,res,next) =>{
    const time = Date.now();
    // 为req对象挂载自定义属性，从而把时间共享给后面的所有路由
    req.startTime = time
    next();
})

app.get('/',(req,res) =>{
    res.send('Home Page ' + req.startTime)
})

app.get('/user',(req,res) =>{
    res.send('User Page ' + req.startTime);
})

app.listen(8000,()=>{
    console.log('http://127.0.0.1');
})
```
###### 局部使用中间件

```
const express = require('express')
const app = express()

// 全局中间件
app.use((req,res,next) =>{
    const time = Date.now();
    // 为req对象挂载自定义属性，从而把时间共享给后面的所有路由
    req.startTime = time
    next();
})
// 局部中间件
const mw1 = (req,res,next) =>{
    console.log('第一个局部中间件');
    next();
}
const mw2 = (req,res,next) =>{
    console.log('第二个局部中间件');
    next();
}

app.get('/',[mw1,mw2],(req,res) =>{
    res.send('Home Page ' + req.startTime)
})

app.get('/user',(req,res) =>{
    res.send('User Page ' + req.startTime);
})

app.listen(8000,()=>{
    console.log('http://127.0.0.1');
})
```

### nodemon
无需每次启动node index.js，通过nodemon index.js 来自动启动node
安装 nodemon

```
npm install -g nodemon
```
