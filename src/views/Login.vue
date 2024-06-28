<template>
    <!-- <h1>我是登录页</h1> -->
    <div class="login-box">
        <el-card class="box-card">
            <el-form class="demo-ruleForm" ref="form" :model="form" status-icon :rules="rules" label-width="100px">
                <h3 class="login-title">系统登入</h3>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="submitForm('form')">登录</el-button>
                    <el-button @click="resetForm('form')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    // <!-- 通过mock进行数据模拟 -->
    import Mock from 'mockjs'
    import Cookie from 'js-cookie'
    import { getMenu } from '../api'
    export default {
        data() {
            return {
                // 表单数据
                form: {
                    username: '',
                    password: '',
                },
                // 表单校验规则
                rules: {
                    username: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请输入用户名'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '请输入密码'
                        }
                    ],
                }
            }
        },
        methods: {
            submitForm(form) {
                // this.$refs[form].validate((valid)=>{
                //     if(valid){
                //         alert('submit!')
                //     }
                //     else
                //     {
                //         console.log('error submit!!')
                //         return false
                //     }
                // })
                // token信息
                //    const token= Mock.Random.guid()
                //     Cookie.set('token',token)
                //     // 跳转到首页
                //     this.$router.push('/home')

                // 校验通过后
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // alert('submit!')
                        // 解构数据
                        getMenu(this.form).then(({ data }) => {
                            console.log(data)
                            // 判定，code
                            if (data.code === 2000) {
                                // 将token数据存入cookies
                                Cookie.set('token', data.data.token)
                                // 获取菜单数据，存入store中//    data.data.menu
                                this.$store.commit('setMenu', data.data.menu)
                                // 将当前的router实例传入store中
                                this.$store.commit('addMenu', this.$router)
                                // 页面跳转到home
                                this.$router.push('/home')
                            } else {
                                this.$message.error(data.data.message)
                            }
                        })
                    }

                    else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            resetForm(form) {
                this.$refs[form].resetFields()
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-card {
        border-radius: 20px;
        /* margin: 180px auto; */
    }

    /* .el-form-item__label{
        padding-right: 34px;

    } */
    .el-form-item__label {
        /* padding:0 30px 0 0; */
        padding: 0 30px 0 0;

    }


    .login-title {
        text-align: center;
        margin-bottom: 30px;
    }

    .box-card {
        width: 350px;
        position: relative;
        left: 30%;
        top: 35%;

    }

    .login-box {
        background-image: url('@/assets/images/background.png');
        height: 100vh;
        min-height: 550px;
        background-size: cover;

    }
</style>