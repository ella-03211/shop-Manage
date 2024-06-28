<template>
    <!-- <h1>我是home</h1> -->
    <el-row>
        <!-- 总共分为24块，<el-row>表示一行相当于tr，<el-col>表示需要几块相当于td -->
        <el-col :span="8" style="padding-right: 10px;">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/user.jpg" alt="">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2024-3-29</span></p>
                    <p>上次登录地点：<span>景德镇</span></p>
                </div>
            </el-card>
            <el-card style=" margin-top: 20px;">
                <!-- :data数据 ， prop="date" 对应字段-->
                <el-table :data="tableData" style="width: 100%" height="480">
                    <!-- 常规方法 -->
                    <!-- <el-table-column prop="name" label="课程">
                    </el-table-column>
                    <el-table-column prop="todayBuy" label="今日购买">
                    </el-table-column>
                    <el-table-column prop="monthBuy" label="本月购买">
                    </el-table-column>
                    <el-table-column prop="totalBuy" label="总购买">
                    </el-table-column> -->

                    <el-table-column v-for="(val, key) in tableLable" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <!-- 右边 -->
        <el-col :span="16" style="padding-left: 10px;">
            <!-- 右上6个块 -->
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex' }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px;">
                <!-- 折线图 -->
                <div ref="echarts1" style="height: 280px;"></div>
            </el-card>
            <div class="r-graph">
                <el-card style="height: 260px;">
                    <!-- 图表 -->
                    <div ref="echarts2" style="height: 260px;"></div>
                </el-card>
                <el-card style="height: 260px;">
                    <!--饼状图  -->
                    <div ref="echarts3" style="height: 240px;"></div>
                </el-card>
            </div>

        </el-col>
    </el-row>
</template>

<script>

// 使用接口
// 1、导入api
// 2、定义生命周期。
import { getData } from '../api'
// 使用echarts
// （1）引入echarts图表工具
// （2）在生命周期中做echarts初始
//（3）基于准备好的dom，初始化echart1实例
import * as echarts from 'echarts'


export default {
    data() {
        return {
            // 左下部分列表数据
            tableData: [
                // {
                //     name: "oppo",
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800,
                // },
                // {
                //     name: "vivo",
                //     todayBuy: 200,
                //     monthBuy: 600,
                //     totalBuy: 1000,
                // },
                // {
                //     name: "小米",
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800,
                // },
                // {
                //     name: "华为",
                //     todayBuy: 400,
                //     monthBuy: 800,
                //     totalBuy: 1000,
                // },
                // {
                //     name: "三星",
                //     todayBuy: 300,
                //     monthBuy: 400,
                //     totalBuy: 900,
                // },
                // {
                //     name: "小米",
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800,
                // },
                // {
                //     name: "苹果",
                //     todayBuy: 300,
                //     monthBuy: 4000,
                //     totalBuy: 9000,
                // },
                // {
                //     name: "三星",
                //     todayBuy: 300,
                //     monthBuy: 400,
                //     totalBuy: 900,
                // },
                // {
                //     name: "oppo",
                //     todayBuy: 100,
                //     monthBuy: 300,
                //     totalBuy: 800,
                // },
            ],
            // 创建tableLable对象，通过遍历它得到列表信息,其实就是表头
            tableLable: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买',
            },
            // 右侧支付订单信息列表
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                {
                    name: "今日收藏订单",
                    value: 123,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef"
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                {
                    name: "本月收藏订单",
                    value: 123,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef"
                },
            ]



        }
    },
    // 2、定义生命周期。
    // 测试getData()是否调用成功
    // mounted() {
    //     getData().then((data)=>{
    //         // 打印数据，看看能不能调用成功
    //         console.log(data)
    //     })
    // },
    mounted() {
        // 采用解构的方法引用Object对象中数据
        getData().then(({ data }) => {
            // 打印数据，看看能不能调用成功
            console.log(data)
            const { tableData } = data.data
            // 打印，查看是否成功获取数据
            console.log(tableData)
            // 为当前的tableData赋值。
            this.tableData = tableData

            // （3）基于准备好的dom，初始化echart1实例,通过$refs获取当前的dom结点，及图表所在的div
            // this.$refs.echarts1
            //(4)通过init传入dom结点echarts1，实例化echarts1

            // ---------------折线图---------
            const echarts1 = echarts.init(this.$refs.echarts1)
            // 指定图表配置项和数据
            var echarts1Option = {
                // // 提示框，当鼠标放在图表中显示内容
                // tooltip: {},
                // 图例
                // legend: {
                //     data: ['销量']

                // },


                // x轴坐标
                // xAxis: {
                //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                // },
                // // y轴坐标，默认可以不定义
                // yAxis: {},
                // // 当前的数据
                // series: [
                //     {
                //         name: '销量',//与 legend中的data对应
                //         type: 'bar',//显示样式，柱状图还是折线图等等
                //         data: [5, 20, 36, 10, 10, 20]  //需要显示的数据
                //     }
                // ]
            }
            // 处理数据,折线图
            const { orderData } = data.data //解构orderData 
            echarts1Option.tooltip = {}
            //获取x轴数据
            const xAxis1 = orderData.date
            console.log(xAxis1)//打印
            echarts1Option.xAxis = {
                data: xAxis1
            }
            // y轴坐标，默认可以不定义
            echarts1Option.yAxis = {}
            //获取图例
            const legend1 = Object.keys(orderData.data[0])
            console.log(legend1)//打印
            echarts1Option.legend = {
                data: legend1,
            }
            // 获取series数据
            echarts1Option.series = []
            legend1.forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line',
                })
            })
            console.log(echarts1Option)
            // 使用刚指定的配置项和数据显示图表。
            echarts1.setOption(echarts1Option)


            // ---------------柱状图---------
            // 3）1、基于准备好的dom，初始化echart1实例,通过$refs获取当前的dom结点，及图表所在的div
            const echarts2 = echarts.init(this.$refs.echarts2)
            // 指定图表配置项和数据
            const { userData } = data.data //解构userData
            const echarts2Option = {
                // 图例
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: 'axis',
                },
                // x轴
                xAxis: {
                    type: "category",  //类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStype: {
                            color: "#17b3a3"
                        },
                    },
                    axisLable: {
                        interval: 0,
                        color: "#333",
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStype: {
                                color: "#17b3a3"
                            },
                        },

                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: "新增用户",
                        data: userData.map(item => item.new),
                        type: 'bar',
                    },
                    {
                        name: "活跃用户",
                        data: userData.map(item => item.active),
                        type: 'bar',
                    }
                ],

            }
            echarts2.setOption(echarts2Option)


            // ---------------饼状图---------
            // 3）1、基于准备好的dom，初始化echart1实例,通过$refs获取当前的dom结点，及图表所在的div
            const echarts3 = echarts.init(this.$refs.echarts3)
            // 指定图表配置项和数据
            const { videoData } = data.data //解构userData

            const echarts3Option = {
                // 提示框
                tooltip: {
                    trigger: 'item',
                },
                color: [
                    "#0f87f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: "pie",
                    }
                ]

            }
            echarts3.setOption(echarts3Option)


        })
    },
}
</script>

<style lang="less" scoped>
.user {
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}

.num {
    display: flex;
    /* 当内容超出边界，强制换行 */
    flex-wrap: wrap;
    /* 两边对齐 */
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }

    .detail {
        margin-left: 15px;
        display: flex;
        /* 改变主轴上下排列显示 */
        flex-direction: column;
        /* 主轴居中 */
        justify-content: center;

        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;

        }

        .desc {
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

.r-graph {
    margin-top: 20px;
    display: flex;
    /* 左右贴边 */
    justify-content: space-between;

    .el-card {
        width: 48%;
    }
}
</style>