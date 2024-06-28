<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <!-- 应用组件 -->
                <!-- 菜单 -->
                <common-aside />
            </el-aside>
            <el-container>
                <el-header>
                    <!-- 应用组件 -->
                    <!-- 头部header -->
                    <common-header />
                </el-header>
                <!-- 应用组件 -->
                <!-- tag组件 -->
                <common-tag />
                <el-main>
                    <!-- <h1>我是main</h1> -->
                    <!-- 路由出口 -->
                    <!-- 路由匹配到的组件将渲染在这里 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    // 导入左侧导航菜单组件
    import CommonAside from '../components/CommonAside.vue'
    // 导入头部header组件
    import CommonHeader from '../components/CommonHeader.vue'
    // 导入tag组件
    import CommonTag from '../components/CommonTag.vue'
    export default {
        data() {
            return {

            }
        },
        //引入组件
        components: {
            CommonAside, //左侧菜单组件
            CommonHeader,//头部header组件
            CommonTag,////CommonTag组件
        }
    }
</script>


<style>
    .el-header {
        padding: 0;
    }

    /* 不要那个边框 */
    .el-menu {
        border-right: none;
    }
</style>