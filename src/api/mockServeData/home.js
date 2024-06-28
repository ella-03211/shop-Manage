// 1、mock数据模拟
import Mock from 'mockjs'


// 2、图表数据
// 3、在mock.js中导入home.js
let List = []
export default {
    getStatisticalData: () => {
        // Mock.Random.float 产生随机数,100-8000之间,保留小数最小0位，最大0位。
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    OPPO: Mock.Random.float(100, 8000, 0, 0),
                    华为: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }

        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [
                    {
                        name: '苹果',
                        value: 9999
                    },
                    {
                        name: '三星',
                        value: 4999
                    },
                    {
                        name: '小米',
                        value: 2999
                    },


                    {
                        name: 'vivo',
                        value: 2999
                    },
                    {
                        name: 'OPPO',
                        value: 1999
                    },
                    {
                        name: '华为',
                        value: 3999
                    },
                ],
                // 柱形图
                userData: [
                    {
                        date: '周一',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周二',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周三',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周四',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周五',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周六',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周七',
                        new: 5,
                        active: 200
                    },
                ],
                // 折线图
                orderData: {
                    date: ['20240301', '20240302', '20240303', '20240304', '20240305', '20240306', '20240307'],
                    data: List
                },
                tableData: [
                    {
                        name: "苹果",
                        todayBuy: 300,
                        monthBuy: 4000,
                        totalBuy: 9000,

                    },
                    {
                        name: "三星",
                        todayBuy: 300,
                        monthBuy: 400,
                        totalBuy: 900,
                    },
                    {
                        name: "小米",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "vivo",
                        todayBuy: 200,
                        monthBuy: 600,
                        totalBuy: 1000,
                    },
                    {
                        name: "oppo",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "华为",
                        todayBuy: 400,
                        monthBuy: 800,
                        totalBuy: 1000,
                    },


                ]
            }
        }

    }
}