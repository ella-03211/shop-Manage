// 存放用户登录数据
import Mock from 'mockjs'
export default {
    // getMenu接收传入过了的config参数
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号密码是否正确
        if (username === 'admin' && password === '123') {
            return {
                code: 2000,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首页",
                            icon: "s-home",//图标
                            url: "Home.vue",
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",//图标
                            url: "Mall.vue",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",//图标
                            url: "User.vue",
                        },
                        {
                            label: "其他",
                            icon: "location",//图标
                            children: [
                                {
                                    path: "/page1",
                                    name: "page1",
                                    label: "页面1",
                                    icon: "setting",//图标
                                    url: "PageOne.vue",
                                },
                                {
                                    path: "/page2",
                                    name: "page2",
                                    label: "页面2",
                                    icon: "setting",//图标
                                    url: "PageTwo.vue",
                                }

                            ],
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功！'
                }
            }
        }
        else if (username === 'abc' && password === '111') {
            return {
                code: 2000,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首页",
                            icon: "s-home",//图标
                            url: "Home.vue",
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",//图标
                            url: "Mall.vue",
                        },
                        {
                            label: "其他",
                            icon: "location",//图标
                            children: [
                                {
                                    path: "/page1",
                                    name: "page1",
                                    label: "页面1",
                                    icon: "setting",//图标
                                    url: "PageOne.vue",
                                },

                                {
                                    path: "/page2",
                                    name: "page2",
                                    label: "页面2",
                                    icon: "setting",//图标
                                    url: "PageTwo.vue",
                                }
                            ],
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功！'
                }
            }
        }
        else {
            return{
                code:-999,
                data:{
                    message :'密码错误！'
                }
            }

        }
    }
}