//导入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入新建的组件
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
// 引入登入页面
// import Login from '../views/Login.vue'



Vue.use(VueRouter)

//1、新建组件，一般src文件夹下views中包含所有组件
//2、将组件和路由映射
//非嵌套路由
// const routes = [
//     { path: '/home', component: Home },
//     { path: '/user', component: User }
// ]

//嵌套路由
const routes = [
    // 登入路由
    {
        path: '/login',
        name: 'login',
        // component: Login,
        component: () => import('../views/Login.vue')
    },

    //主路由
    {
        path: '/',
        // 主路由
        name: 'Main',
        component: Main,
        redirect: '/home',//当路径是/,重定向到home中//处理首页跳转
        children: [
            //子路由
            // { path: 'home', name: 'home', component: Home },//首页
            // { path: 'user', name: 'user', component: User },//用户管理
            // { path: 'mall', name: 'mall', component: Mall },//商品管理
            // { path: 'page1', name: 'page1', component: PageOne },//页面1
            // { path: 'page2', name: 'page2', component: PageTwo },//页面2
        ]
    },


]
//3、创建router实例
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

//4、挂载到根结点
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能


export default router //将router对象作为默认导出，在其他导入时直接导入router即可

