<template>
    <div class="header-container">
        <div class="l-content">
            <!-- 按钮 -->
            <el-button @click="handlemenu()" icon="el-icon-menu" size="mini" style="margin-right: 10px;"></el-button>
            <!-- 面包屑 -->
            <!-- <span class="l-text">首页</span> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label
                    }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="logout">
                <!-- 用户头像 -->
                <span class="el-dropdown-link">
                    <img class="user-img" src="../assets/images/user.jpg" alt="">
                </span>
                <!-- 下拉选项 -->
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    // 导入辅助函数
    // 在computed中调用mapState
    import { mapState } from 'vuex'
    import Cookie from 'js-cookie'

    export default {
        data() {
            return {

            }
        },

        methods: {
            // 该函数用来处理点击按钮时，将左侧菜单展开或折叠事件，$store实例
            handlemenu() {
                this.$store.commit('collapseMenu')
                // 触发store中的commit方法去调用tab.js中的collapseMenu方法

            },
            // 退出登录函数
            logout(command) {
                if (command === 'cancel') {
                    // 清楚cookies中的token信息
                    Cookie.remove('token')
                 
                    //清除Cookie中的menu
                    Cookie.remove('menu')
                    // 跳转到登入页面
                    this.$router.push('/login')
                }

            }

        },
        computed: {
            // 返回一个对象，使用es6，“ ...”使用扩展运算符对其进行解构
            ...mapState({
                tags: state => state.tab.tabsList
            })

        },
        mounted() {
            console.log(this.tags)

        }
    }
</script>
<style lang="less" scoped>
    .header-container {
        padding: 0 20px;
        background-color: #333;
        height: 60px;
        /* 采用flex布局 */
        display: flex;
        /* 水平两端对齐 */
        justify-content: space-between;
        /* 纵轴居中 */
        align-items: center;

        .l-text {
            color: #fff;
            font-size: 14px;
            margin-left: 10px;
        }

        .r-content {
            .user-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }

        .l-content {
            display: flex;
            align-items: center;

            /* // /deep/穿刺，？， */
            /deep/.el-breadcrumb__item {
                .el-breadcrumb__inner {
                    font-weight: normal;

                    &.is-link {
                        color: #666;
                    }
                }

                &:last-child {
                    .el-breadcrumb__inner {
                        color: #fff;
                    }
                }
            }
        }

    }
</style>