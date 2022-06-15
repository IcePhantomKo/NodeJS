// 用户的路由模块
const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入用户路由处理函数对应的模块
const userHandler = require('../router_handler/user')

// 导入验证表单那数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const {reg_login_schema} = require('../schema/user')

// 注册新用户
router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)

// 登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)

// 测试
router.post('/test',userHandler.test)

// 将路由共享出去
module.exports = router