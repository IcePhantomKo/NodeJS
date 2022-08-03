import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        // index 页面
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        // 注册界面
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        // 登录界面
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        // 404 错误界面
        {
            path: '*',
            name: '/404',
            component: NotFound
        }
    ]
})
