<template>
    <div>
        <HeadersBox />
        <div class="comparison">
            <div style="cursor:pointer;z-index: 999;" @click="back">
            <div style="display: inline-block;position: absolute;left: 20px;top: -80px;"><img src="../assets/return.svg"
                    alt=""></div>
            <div style="display: inline-block;position: absolute;left: 39px;top: -80px;color: #fff;">戻る</div>
        </div>
        <div id="charts"></div>
    </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import sensor from '../static/传感器.json';
import HeadersBox from "../components/Headers.vue";
import { resizeMyCharts } from "../static/echarts自适应.js"

export default ({
    data() {
        return {
            name: "",
            echartsData: {
                xAxisData: [], name: [], value1: [], value2: [],color:"white"
            },
            date: '',
            time: '',
            week: '',
            last: '',
            now: ''
        }
    },
    components: {
        HeadersBox,
    },
    mounted() {
        console.log(this.$route.query);
        this.now = this.$route.query.now
        this.name = this.$route.query.name
        this.last = this.$route.query.last
        this.dispose()
        this.currentTime()
        this.tempType(this.echartsData)
        setInterval(() => {
            this.currentTime()
        }, 500)

    },
    methods: {
        back() {
            if (typeof (this.name) == "undefined") {
                this.$router.push("/");

            } else {
                this.$router.push({ path: "/conter", query: { name: this.now, last: this.last } });
            }
        },
        tempType(item) {
            var chartDom = document.getElementById('charts');
            var myChart = echarts.init(chartDom);
            resizeMyCharts(myChart)
            var option;
            option = {
                title: {
                    text: '两天内的数据对比',
                    textStyle: {
                        color: item.color
                    }
                },
                legend: {
                    data: item.name
                },
                grid: {
                    top: "5%",
                    left: "3%",
                    right: "3%",
                    bottom: '5%',
                },
                xAxis: {
                    type: 'category',
                    data: item.xAxisData,
                    axisLabel: {
                        //x轴文字的配置
                        show: true,
                        textStyle: {
                            color: item.color,
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: item.color
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: item.color
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        //x轴文字的配置
                        show: true,
                        textStyle: {
                            color: item.color,
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: item.color
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: item.color
                        }
                    }
                },
                series: [
                    {
                        name: item.name[0],
                        type: 'line',
                        stack: 'Total',
                        data: item.value1,
                        lineStyle: {
                            color: "blue"
                        }
                    },
                    {
                        name: item.name[1],
                        type: 'line',
                        stack: 'Total',
                        data: item.value2,
                        lineStyle: {
                            color: "orange"
                        }
                    }
                ]
            }
            option && myChart.setOption(option);
        },
        //时间处理事件
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
        //图表数据处理
        dispose() {
            sensor.forEach(item => {
                if (item.equipmentName == this.name) {
                    if (this.echartsData.name.indexOf(item.updateTime.split(" ")[0].slice(-5)) == -1) {
                        this.echartsData.name.push(item.updateTime.split(" ")[0].slice(-5))
                    }
                    if (this.echartsData.xAxisData.indexOf(item.updateTime.split(" ")[1]) == -1) {
                        this.echartsData.xAxisData.push(item.updateTime.split(" ")[1])
                    }
                    if (this.echartsData.name[0] == item.updateTime.split(" ")[0].slice(-5)) {
                        this.echartsData.value1.push(item.value)
                    } else {
                        this.echartsData.value2.push(item.value)
                    }
                }
            })
            console.log(this.echartsData);
        }
    },
    computed: {
        newtheme() {
            return this.$store.state.theme
        }
    },
    watch: {
        newtheme: {
            handler(val) {
                if (val == "light") {
                    this.echartsData.color = 'black'
                    this.tempType(this.echartsData)
                } else {
                    this.echartsData.color = 'white'
                    this.tempType(this.echartsData)
                }
            }
        }
    }
})
</script>

<style scoped>
.comparison {
    height: calc(100vh - 114px);
    width: 100%;
    color: white;
    position: absolute;
    top:114px;
    display: flex;
}

#charts {
    width: 70%;
    height: 75%;
    margin: 2% auto;
    border: 1px solid #0a1720;
}
</style>