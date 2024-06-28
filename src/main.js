import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 3、在main.js中引入一下。
import "./api/mock"
// 导入router
import router from "./router"
// 导入store
import store from './store';

// 导入Cookies
import Cookie from 'js-cookie';

Vue.config.productionTip = false
Vue.use(ElementUI)

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // token存不存在

  const token = Cookie.get('token')//获取当前Cookies的token数据
  console.log('111'+token)
  // token不存在，当前的路由对象是不是不等于登录页面，跳转到登录页
  if (!token && to.name !== 'login') {
    console.log('token存在')
    next({ name: 'login' })
    
  }
  // 已经登录，当前是登录页面，跳转到对应页面首页  
  else if (token && to.name === 'login') {
    next({ name: 'home' })

  } else {
    next()
  }
})


new Vue({
  router,//引入router路由，并挂载到实例中
  store,//引入store路由，并挂载到实例中
  render: h => h(App),
  //  //在Vue实例中created生命周期中调用store中的addMenu( )
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')

import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决ElementUI导航栏中重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}