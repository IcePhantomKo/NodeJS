// Admin 权限下的路由
const express = require('express')
// 创建路由对象
const adRouter = express.Router()

// 导入用户路由处理函数对应的模块
const adminHandler = require('../router_handler/admin')
const tokenAuth = require('../middleware/tokenAuth')

//登录页接口
adRouter.post('/homePage',adminHandler.login)

// 网络拓扑图接口
adRouter.post('/topology',adminHandler.topoInfo)

// 模块通道图接口
// TODO:
adRouter.post('/modChal',adminHandler.modChalInfo)

// 接入设备接口
adRouter.post('/devCon',adminHandler.devConInfo)

// ping 接口
adRouter.post('/pings',adminHandler.Pings)

// 将路由共享出去
module.exports = adRouter
