// Admin 权限下的路由
const express = require('express')
const adRouter = express.Router()
const adminHandler = require('../router_handler/admin')

//跳转主页
adRouter.get('/homePage',adminHandler.login)

module.exports = adRouter
