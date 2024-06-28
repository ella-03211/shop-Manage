//管理菜单相关数据、面包屑相关数据
import Cookie from 'js-cookie'
export default {
    // 数据。变量
    state: {
        // 管理菜单相关数据
        isCollapse: false, // 控制左侧菜单展开还是收起

        // 面包屑相关数据
        tabsList: [
            {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "s-home",//图标
                url: "Home/Home",
            },
        ],//面包屑数据

        // menu菜单数据
        menu: [],

    },
    //方法。 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
    mutations: {
        // 修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse // 取反
        },

        // 更新面包屑数据,当选择菜单后触发这个方法,两个
        selectMenu(state, val) {
            console.log(val)
            // 处理数据逻辑
            // 1、判断添加到数据是否为首页
            if (val.name !== 'home') {
                // 判断是否存在tablist中，如果存在返回一个索引，不存在返回-1
                const index = state.tabsList.findIndex(item => item.name === val.name)
                //不存在， 添加数据
                if (index == -1) {
                    state.tabsList.push(val)
                }
            }
        },
        // 删除指定tag数据，即tabsList数组
        closeTag(state, item) {
            console.log(item, 'item')
            const index = state.tabsList.findIndex(val => val.name === item.name)
            // 调用splice删除数据
            state.tabsList.splice(index, 1)
        },
        // 设置menu数据
        setMenu(state, val) {
            //将获取到val数据传递给menu变量
            state.menu = val
            // 做缓存,将JSON.stringify(val)存入Cookie中的menu
            Cookie.set('menu', JSON.stringify(val))
        },
        // 动态路由注册
        addMenu(state, router) {
            // 判断Cookie中是否有menu数据
            if (!Cookie.get('menu')) return
            //数据存在
            // 将缓存时间取出放到变量menu中
            // console.log('abc'+Cookie.get('menu'))
            const menu = JSON.parse(Cookie.get('menu'))
            // const menu = Cookie.get('menu')
            // 更新当前menu数据
            state.menu = menu
            // 打印
            console.log('abc' + 'menu', menu)

            //   组装动态路由数据

            const menuArray = []// 存储路由
            //  遍历当前menu数据
            menu.forEach(item => {
                // 判断是否有子菜单
                if (item.children) {
                    console.log("孩子Path")
                    // 有子菜单
                    item.children = item.children.map(item => {
                        // 给item添加component属性
                        item.component = () => import(`../views/${item.url}`)
                        console.log("孩子Path"+item.component)
                        return item
                    })
                    // 将数据添加到   
                    //...通过扩展运算符...展开添加数据
                    menuArray.push(...item.children)
                    console.log('abc' + menuArray, 'menuArray')
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
                console.log(menuArray, 'menuArray')
                // 动态添加路由
                menuArray.forEach(item => {
                    router.addRoute('Main', item)
                })

            });


        }

    }
}