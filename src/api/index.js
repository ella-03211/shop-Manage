// 创建接口，引入封装的axios
// 1、导入封装的axios工具
import http from "../utils/request"

// 2、定义接口
// 请求首页数据接口
export const getData=()=>{
    // 会返回一个promise对象
    return http.get('/home/getData')
    // http就是axios二次封装的实例,接口名称：/home/getData
}

// 在页面中使用这个接口。


// 返回用户列表api接口 前端
export const getUser=(params)=>{
    // 返回用户列表,并传入参数
    console.log(params,'params')
    return http.get('/user/getUser',params)

}
// 新增用户接口
export const addUser=(data)=>{
    // POST请求
    return http.post('/user/add',data)
}

// 修改用户接口
export const editUser=(data)=>{
    // POST请求
    return http.post('/user/edit',data)
}

// 删除用户接口
export const delUser=(data)=>{
    // POST请求
    return http.post('/user/del',data)
}

// 定义aip接口
export const getMenu=(data)=>{
    return http.post('/permission/getMenu',data)
}
