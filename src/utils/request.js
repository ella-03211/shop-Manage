// 封装axios方法
// 1、引入axios
import axios from 'axios'
// import { config } from "vue/types/umd";
// 3、在main.js中引入一下。
import '../api/mock'

// 2、创建一个axios实例
// http变量接收axios实例
const http = axios.create({
    baseURL: '/api',  // baseURL:通用请求地址，即地址前缀，如果有后端，也可以将后端地址写到这里
    timeout: 10000,   // 超时时间，如果超过该时间后端没有给响应就终止该请求


})


// 4、添加请求拦截器,interceptors绑定在当前创建的http实例中

http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 5、添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做什么
    return response
}, function (error) {
    // 对响应错误做什么
    return Promise.reject(error)
})

// 3、使http实例对外暴露
export default http


