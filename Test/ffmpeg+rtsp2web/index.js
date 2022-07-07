// index.js

const RTSP2web = require('rtsp2web')

const express = require('express')
const app = express()
const path = require('path')

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"))
})

app.listen(9000,()=>{
    console.log('http://10.110.133.212:9000');
})


// 服务端长连接占据的端口号；端口号可以自定义
const port = 1234
new RTSP2web({
    port
})