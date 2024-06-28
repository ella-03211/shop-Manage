<!-- tag组件 -->

<template>

    <div class="tabs">
        <el-tag v-for="(item, index) in tags" :key="item.path" :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'" @click="changeMenu(item)"
            @close="handleClose(item, index)"
            size="small">
            {{ item.label }}
        </el-tag>
    </div>
</template>


<script>
//1、导入vuex中的 mapState方法
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'CommonTag',
    data() {
        return {

        }
    },

    computed: {
        // <!-- 导入store中的state数据 -->
        // 2、使用mapState函数解构tabsList，通过es6返回一个对象
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        // 获取shore中的数据
        ...mapMutations(['closeTag']),

        // 点击tag跳转到效果功能
        changeMenu(item) {
            console.log(item)
            this.$router.push({ name: item.name })
        },
        //点击删除tag
        // 1、itme数据，index索引
        handleClose(item, index) {

            //    将数据item传入closeTag
            //    调用删除数据的方法
            this.closeTag(item)
            // 获取长度
            const length = this.tags.length

            // 删除后跳转页面
            // 删除未选中的,当前的路由：$route，路由实例：$router
            if (item.name != this.$route.name) {
                return
            }
            // 选择删除的最后一项
            if (index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            }
            // 删除中间的，往后一个跳转
            else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }




        }
    },
    mounted() {
        // console.log($this.$route, this.tags)

    }
}
</script>
<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}

</style>