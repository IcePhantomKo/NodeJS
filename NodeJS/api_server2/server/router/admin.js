// Admin 权限下的路由
const express = require('express')

// 创建路由对象
const adRouter = express.Router()

// 导入用户路由处理函数对应的模块
const adminHandler = require('../router_handler/admin')

//跳转主页
adRouter.post('/homePage',adminHandler.login)

// 将路由共享出去
module.exports = adRouter
