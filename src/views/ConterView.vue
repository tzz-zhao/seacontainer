<template>
    <div class="sensor">
        <div class="header">
            <div class="headertitle">货运管理平台</div>
            <div class="headertext">
                <span class="headtime">
                    {{ date }}
                </span>
                <span class="headtime" style="margin-left: 25px;">
                    {{ week }}
                </span>
                <span class="headtime">
                    {{ time }}
                </span>
            </div>
            <div><img src="../assets/return.svg" style="width: 17px;height: 17px;position: absolute;top: -4px;" /><span
                    @click="back" style="position: absolute;left: 20px;width: 40px;top: -4px;">返回</span></div>
        </div>
        <div class="center">
            <div class="left-list">
                <div class="title">
                    <div></div>
                    <span>传感器信息</span>
                </div>
                <div class="list-search">
                    <input placeholder="请输入传感器名称" style="color: #fff;" v-model="search" />
                    <button @click="sensorsearch">搜索</button>
                </div>
                <div class="list-table">
                    <el-table :data="sensorarr" style="width: 100%"
                        :header-cell-style="{ background: '#11517C', color: 'white' }" :highlight-current-row="false"
                        :row-class-name="tableRowClassName">
                        <el-table-column prop="equipmentName" label="传感器名称" width="180">
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="180">
                            <template slot-scope="scope">

                                <span v-if="scope.row.status == 0">正常</span>
                                <span v-if="scope.row.status == 1" style="color: yellow;">警告</span>
                                <span v-if="scope.row.status == 2" style="color: red;">异常</span>
                            </template>


                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="right-echarts">
                <div class="echartTitle">
                    <div class="title">
                        <div></div>
                        <span>传感器001</span>
                    </div>
                    <button>导出</button>
                </div>
                <div class="echartsTable">
                    <div v-for="(item, index) in echartsData" :key="index">
                        <div class="title">
                            <div></div>
                            <span>{{ item.title }}</span>
                        </div>
                        <div :id="item.type" class="echartImg"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import sensor from "../static/传感器.json";
export default {
    data() {
        return {
            tableData: [
                { id: "1", equipmentName: '传感器001', status: 2 },
                { id: "2", equipmentName: '传感器002', status: 2 },
                { id: "3", equipmentName: '传感器003', status: 2 },
                { id: "4", equipmentName: '传感器004', status: 1 },
                { id: "5", equipmentName: '传感器005', status: 1 },
            ],
            echartsData: [
                { title: "温度", type: "temperature", data: [-8, -33, -24, -30, -10, -12, -10, -8, 10, 5], y: { min: -50, max: 30, interval: 20 } },
                { title: "湿度", type: "humidity", data: [500, 150, 230, 200, 560, 580, 380, 600], y: { min: 0, max: 800, interval: 200 } },
                { title: "开关", type: "open", data: [50, 17, 23, 20, 56, 58, 38, 60], y: { min: 0, max: 80, interval: 20 } },

                { title: "震动", type: "vibration", data: [50, 17, 23, 20, 36, 38, 38, 40], y: { min: 0, max: 40, interval: 10 } },
            ],
            date: '',
            time: '',
            week: '',
            name: '',
            last: '',
            sensordata: sensor,
            sensorarr: [],
            search: ''

        }
    },
    mounted() {
        this.name = this.$route.query.name
        this.last = this.$route.query.last
        this.echartsData.forEach(item => {
            this.tempType(item)
        })
        this.datadispose()
        this.currentTime()
        setInterval(() => {
            this.currentTime()
        }, 500)
    },
    beforeCreate() {
        console.log(this.$route.query.name);
    },
    methods: {
        currentTime() {
            var date = new Date();
            var year = date.getFullYear(); //月份从0~11，所以加一
            var dateArr = [
                date.getMonth() + 1,
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
            ];
            //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
            for (var i = 0; i < dateArr.length; i++) {
                if (dateArr[i] >= 1 && dateArr[i] <= 9) {
                    dateArr[i] = "0" + dateArr[i];
                }
            }
            var strDate =
                year +
                "-" +
                dateArr[0] +
                "-" +
                dateArr[1]

            //此处可以拿外部的变量接收  strDate:2022-05-01 13:25:30
            //this.date = strDate;
            var strtime =
                dateArr[2] +
                ":" +
                dateArr[3] +
                ":" +
                dateArr[4];

            var week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            var strDate1 =
                year +
                "/" +
                dateArr[0] +
                "/" +
                dateArr[1]
            var date1 = new Date(strDate1)
            let w = week[date1.getDay()]
            this.week = w
            this.time = strtime
            this.date = strDate
        },
        datadispose() {
            this.sensordata.forEach((item) => {
                if (this.name == item.containerNumber) {
                    this.sensorarr.push({ equipmentName: item.equipmentName, status: item.status })
                }
            })
            console.log(this.sensorarr);
            for (var i = 0; i < this.sensorarr.length; i++) {
                for (var j = i + 1; j < this.sensorarr.length; j++) {
                    if (this.sensorarr[i].equipmentName == this.sensorarr[j].equipmentName) { //第一个等同于第二个，splice方法删除第二个
                        // this.sensorarr.splice(j, 1);

                        // this.$delete(this.sensorarr, j)
                        this.$delete(this.sensorarr, i)
                        j--;
                    }
                }
            }
            console.log(this.sensorarr);

        },
        back() {

            this.$router.push({ path: "/about", query: { name: this.last } });
        },
        sensorsearch() {
            console.log(this.search);
            let arr = []
            for (let i = 0; i < this.sensorarr.length; i++) {
                if (this.search === this.sensorarr[i].equipmentName) {
                    arr.push(this.sensorarr[i])
                    console.log(this.sensorarr);
                }
            }

            this.sensorarr = arr
            console.log('search', this.sensorarr);

        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 0 && row) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        // tableCell({ row, column, rowIndex, columnIndex }) {
        //     if (row.status == 2 && columnIndex === 1) {
        //         console.log(column, rowIndex);
        //         return "color:red"
        //     } else if (row.status == 1 && columnIndex === 1) {
        //         return "color:orange"
        //     }
        //     else {
        //         return "color:white"
        //     }
        // },
        tempType(item) {
            var chartDom = document.getElementById(`${item.type}`);
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                xAxis: {
                    type: 'category',
                    data: ['01', '02', '03', '04', '05', '06', '07', '08'],
                    // boundaryGap: false,
                    axisLabel: {
                        //x轴文字的配置
                        show: true,
                        textStyle: {
                            color: "white",
                        },
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    min: item.y.min,
                    max: item.y.max,
                    interval: item.y.interval,
                    axisLabel: {
                        //x轴文字的配置
                        show: true,
                        textStyle: {
                            color: "white",
                        }
                    },
                    axisLine: {
                        show: false
                    }
                },
                series: [
                    {
                        data: item.data,
                        type: 'line',
                        areaStyle: {
                            origin: 'start',
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#94C2FD' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#5B8FF9' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    }
                ],
                grid: { // 让图表占满容器
                    top: "20px",
                    left: "30px",
                    right: "30px",
                    bottom: "20px",
                },
            };
            option && myChart.setOption(option);
        },
        handleClick(row) {
            console.log(row.id);
        }
    }
}
</script>
<style scoped>
.sensor {
    background-color: #1E6BA3;
    height: 100vh;
    width: 100%;
}

.header {
    background-image: url(../assets/编组\ 3.png);
    background-size: 100% 100%;
    width: 100%;
    height: 80px;
    position: relative;
    top: 0;
}

.headertitle {
    color: #FFF;
    text-align: center;
    font-family: "Microsoft YaHei";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 9px;
    padding-top: 10px;
}

.headertext {
    padding-top: 5px;
    text-align: center;
}

.headertime {
    color: #FFF;
    font-family: "Microsoft YaHei";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
}

.header>div:nth-child(3) {
    position: absolute;
    top: 40%;
    left: 2%;
}

.header>div:nth-child(3)>img {
    width: 13.5px;
    height: 9.75px;
    margin-right: 10px;
}

.header>div:nth-child(3)>span {
    width: 30px;
    height: 18px;
    font-family: Microsoft YaHei;
    font-size: 14px;
    font-weight: 700;
    line-height: 18.48px;
    letter-spacing: 2px;
    text-align: left;
    color: white
}

.center {
    margin: 0 1%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.left-list {
    width: 529px;
    height: 90vh;
    border: 1px solid #98E7FC;
    background: #07365D !important;
    opacity: 0.6px;
    box-sizing: border-box;
    padding: 1%;
}

.title {
    background: linear-gradient(270deg, rgba(47, 186, 255, 0.0001) 0%, rgba(77, 210, 255, 0.8) 63.77%, rgba(84, 216, 255, 0.8) 86.69%, rgba(92, 222, 255, 0.0001) 100%);
    width: 348px;
    height: 30px;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 3%;
}

.title>div {
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid #2CE7E7;
    margin-right: 4%;
}

.title>span {
    font-family: Microsoft YaHei;
    font-size: 14px;
    font-weight: 700;
    line-height: 18.48px;
    letter-spacing: 2px;
    text-align: left;

}

.list-search {
    width: 472px;
    height: 30px;
    border: 0.8px solid #FFFFFF5C;
    margin-top: 18px;
}

.list-search>input {
    width: 80%;
    height: 28px;
    border: none;
    background-color: #234461;
    outline: none;
    box-sizing: border-box;
    padding: 0 15px;
}

.list-search>button {
    width: 20%;
    height: 30px;
    background: #15517A;
    border: none;
    color: white;
}

.list-table {
    margin-top: 11px;
    width: 463px;
    height: 720px;
    overflow-x: hidden;
}

::v-deep .el-table .el-table__body tr:hover>td {
    background-color: inherit;
    /* 继承父元素背景色或者指定为初始背景色 */
}

::v-deep .success-row,
.success-row:hover {
    background-color: #234968;
    color: white;
}

::v-deep .warning-row,
.warning-row:hover {
    background-color: #07365D;
    border: none;
    color: white;
}


.right-echarts {
    width: 1300px;
    height: 90vh;
    border: 1px solid #98E7FC;
    background: #07365D !important;
    box-sizing: border-box;
    padding: 1%;
}

.echartTitle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    ;
}

.echartTitle>button {
    width: 70px;
    height: 33px;
    background: linear-gradient(181.25deg, rgba(40, 125, 165, 0) -23.42%, #2499BC 98.94%, #17567C 98.94%);
    color: white;
    border: none;
}

.echartsTable {
    margin: 1%;
    width: 100%;
    height: 98%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.echartsTable>div {
    width: 48%;
    height: 49%;
    box-sizing: border-box;
    border: 1px solid #2499BC;
    padding: 1%;
}

.echartsTable>div .echartImg {
    height: 90%;
}

.headtime {
    color: #fff;
    font-family: "Microsoft YaHei";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px
}

div::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    /**/
}

div::-webkit-scrollbar-track {
    background: rgb(239, 239, 239);
    border-radius: 2px;
}

div::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
}

div::-webkit-scrollbar-thumb:hover {
    background: #333;
}

div::-webkit-scrollbar-corner {
    background: #179a16;
}
</style>