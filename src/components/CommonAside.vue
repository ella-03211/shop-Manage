<template>

  <el-menu default-active="1-4-1" 
  class="el-menu-vertical-demo"
   @open="handleOpen" 
   @close="handleClose"
    :collapse="isCollapse"
     background-color="#545c64"
      text-color="#fff" 
      active-text-color="#ffd04b">
    <h3>{{isCollapse ? '后台':'通用后台管理'}}</h3>
    <!-- 不含有子菜单 -->
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <!-- 动态获取标签 -->
      <i :class="`el-icon-${item.icon}`"></i>
      <!-- 获取名称 -->
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 含有子菜单 -->
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subitem in item.children" :key="subitem.name">
        <el-menu-item @click="clickMenu(subitem)" :index="subitem.name">{{ subitem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>



<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu {
    height: 100vh;

    h3 {
      color: aliceblue;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-weight: 400;
    }
  }
</style>

<script>
  import Cookie from 'js-cookie'
  export default {
    data() {
      return {
        // isCollapse: false, //不需要这个字段了，后面在computed定义类一个动态的
        // menuData: [
        //   {
        //     path: "/home",
        //     name: "home",
        //     label: "首页",
        //     icon: "s-home",//图标
        //     url: "Home/Home",
        //   },
        //   {
        //     path: "/mall",
        //     name: "mall",
        //     label: "商品管理",
        //     icon: "video-play",//图标
        //     url: "MallManage/MallManage",
        //   },
        //   {
        //     path: "/user",
        //     name: "user",
        //     label: "用户管理",
        //     icon: "user",//图标
        //     url: "UserManage/UserManage",
        //   },
        //   {
        //     label: "其他",
        //     icon: "location",//图标
        //     childern: [
        //       {
        //         path: "/page1",
        //         name: "page1",
        //         label: "页面1",
        //         icon: "setting",//图标
        //         url: "Other/PageOne",
        //       },
        //       {
        //         path: "/page2",
        //         name: "page2",
        //         label: "页面2",
        //         icon: "setting",//图标
        //         url: "Other/PageTwo",
        //       }

        //     ],
        //   },
        // ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      //点击菜单事件
      clickMenu(item) {
        // 将当前点击菜单信息item传入selectMenu中
        this.$store.commit('selectMenu', item)
        console.log(item)//打印获取到item
        // this.$router.push(item.path)//跳转路由
        //处理点击多次报错问题
        //当页面路由与需跳转不一样才跳转,route当前页面路由，router表示整个router实例
        if (this.$route.path !== item.path) {
          this.$router.push(item.path)//跳转路由
        }
      }
    },
    computed: {
      // 菜单数据集
      menuData() {
        // 判断当前数据，如果缓存Cookie中没有，去当前store中获取数据
        return JSON.parse(Cookie.get('menu')) ||this.$store.state.tab.menu

      },
      //对数据分类
      //没有子菜单
      noChildren() {
        return this.menuData.filter(item => !item.children)//对menuData遍历，没有item.childern则没有子菜单
      },
      //有子菜单
      hasChildren() {
        return this.menuData.filter(item => item.children)//对menuData遍历，有item.childern则有子菜单
      },
      //实现左侧菜单折叠或展开，使用修改后isCollapse的数据
      isCollapse() {
        return this.$store.state.tab.isCollapse

      }
    }
  }
</script>