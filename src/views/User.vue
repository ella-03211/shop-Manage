<template>
    <!-- <h1>我是user</h1> -->
    <div class="manage">
        <el-dialog title="新增用户" :before-close="handleClose" :visible.sync="dialogVisible" width="50%">

            <!-- 用户表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="form.birth" type="date" placeholder="请选择出生日期" value-format="yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <!-- 新增按钮 -->
            <el-button @click="handleAdd"  type="primary">+新增</el-button>
            <!-- 搜索区 -->
            <el-form :inline="true" :model="userForm">
                <el-form-item>
                    <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="common-table">
            <!-- 用户数据展示 -->
            <el-table stripe height="90%" :data="tableData" style="width: 100%; ">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.sex==1 ?'男':'女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="birth" label="出生日期"></el-table-column>
                <el-table-column prop="addr" label="地址"></el-table-column>
                <el-table-column prop="sex" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination background layout="prev, pager, next" @current-change="handlePage" :total="total">
                </el-pagination>
            </div>
        </div>


    </div>
</template>
<script>
    import { getUser, addUser, editUser, delUser } from '../api'
    export default {
        data() {
            return {
                dialogVisible: false,
                // 表单字段
                form: {
                    name: '',
                    age: '',
                    sex: '',
                    birth: '',
                    addr: '',

                },
                // 表单验证规则
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    age: [
                        { required: true, message: '请输入年龄', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' },
                    ],
                    birth: [
                        { required: true, message: '请选择出生日期', trigger: 'blur' },
                    ],
                    addr: [
                        { required: true, message: '请填写地址', trigger: 'blur' },
                    ],


                },

                // table信息展示
                tableData: [],
                modalType: 0,//表示新增用户，1表示编辑
                //当前总条数
                total: 0,
                // pageData参数
                pageData: {
                    page: 1,
                    limit: 10,
                },
                // 查询表单
                userForm: {
                    name: ''
                }

            }
        },
        methods: {
            // 点击提交按钮
            submit() {
                this.$refs.form.validate((valid) => {
                    // console.log(valid)
                    if (valid) {
                        if (this.modalType === 0) {
                            // 插入列表
                            addUser(this.form).then(() => {
                                // 重新获取列表数据
                                this.getList()
                            })

                        } else {
                            editUser(this.form).then(() => {
                                // 重新获取列表数据
                                this.getList()
                            })

                        }

                        // 为true时才可以对表单数据处理
                        console.log(this.form)
                        // 关闭弹窗
                        this.$refs.form.resetFields()
                        this.dialogVisible = false

                    }
                })
            },
            // 点击取消
            cancel() {
                this.handleClose()

            },
            // 弹窗关闭
            handleClose() {
                console.log(this.$refs.form)
                this.$refs.form.resetFields()
                this.dialogVisible = false
            },
            // 点击新增
            handleAdd() {
                //对modalType赋值
                this.modalType = 0
                // 打开当前弹窗
                this.dialogVisible = true

            },
            // 点击编辑
            handleEdit(row) {
                //对modalType赋值
                this.modalType = 0
                // 打开当前弹窗
                this.dialogVisible = true
                // 内容回写,将当前行数据深拷贝
                this.form = JSON.parse(JSON.stringify(row))

            },
            // 点击删除
            handleDelete(row) {
                // 消息提示弹窗
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 调用删除接口,传递数据是一个对象
                    delUser({ id: row.id }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        // 重新获取列表数据， => 可以获取上一层作用域中的this
                        this.getList()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            // 获取列表数据
            getList() {
                // 获取列表数据
                getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
                    console.log(data)
                    // 
                    this.tableData = data.list
                    // 获取当前总条数
                    this.total = data.count || 0
                })
            },
            // 分页器切换页面
            handlePage(val) {
                // val点击第几页
                console.log('val', val)
                // 修改page
                this.pageData.page = val
                // 调用获取数据方式
                this.getList()
            },
            // 点击列表搜索查询
            onSubmit() {
                this.getList()
            },

        },
        // 生命周期
        mounted() {
            // 首次加载调用获取列表数据
            this.getList()

        },
    }
</script>

<style scoped lang="less">
    .manage {
        height: 90%;
        .manage-header{
            display: flex;
            /* 水平靠两边 */
            justify-content: space-between;
             /* 垂直靠居中 */
            align-items: center;
        }
    }

    .common-table {
        /* 相对定位 */
        position: relative;
        /* 动态计算高度 父盒子高度100%， - 62px加减法运行，*/
        height: calc(100% - 62px);

        .pager {
            /* 绝对定位 */
            position: absolute;
            bottom: 0;
            right: 20px;

        }
       
    }
</style>