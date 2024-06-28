// 1、导入vue，vuex
import Vue from "vue"
import Vuex from "vuex"
// 4、创建两个不同的模块,并导入
import tab from "./tab"




// 2、全局注入 Vuex 
Vue.use(Vuex)

//3、创建vuex的实例，用来接收一个对象,export default使Store实例对外暴露
//5、在main.js中挂载

export default new Vuex.Store({
    modules: {
        tab   // 引入
      
    }

})