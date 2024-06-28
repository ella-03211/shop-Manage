// mock模拟后端数据

// 1、导入mockjs
import Mock from 'mockjs'
// 导入home.js 接口数据
import homeApi from './mockServeData/home'
import permission from './mockServeData/permission'
import user from './mockServeData/user'

// // 2、定义mock 请求拦截
// // 通过.mock调用
// Mock.mock('/api/home/getData',function(){
//     // 拦截到请求后的处理逻辑
//     console.log('拦截到了')
//     return []
// })

// // 3、在main.js中引入一下。


// 有数据后的：
// 2、定义mock 请求拦截
// 通过.mock调用
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

// 3、在main.js中引入一下。


// 用户列表的数据接口

Mock.mock('/api/user/add','post',user.createUser)// 新增用户接口
Mock.mock('/api/user/edit','post',user.updateUser)    // 修改用户接口
Mock.mock('/api/user/del','post',user.deleteUser)    // 删除用户接口
Mock.mock(/api\/user\/getUser/,user.getUserList)   // 获取列表，带参数,获取table列表接口


// 

// 定义getMenu接口，获取用户登录信息,定义拦截器,post请求
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)


