<template>
    <div class="comparison">
        
        <div class="header">
            <div class="headertitle">コンテナ監視システム</div>
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
            <div><img src="../assets/return.svg"
                    style="width: 17px;height: 17px;position: absolute;top: -4px;cursor:pointer" /><span @click="back"
                    style="position: absolute;left: 20px;width: 40px;top: -4px;cursor:pointer">戻る</span></div>
        </div>
        <div id="charts" ></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import sensor from '../static/传感器.json';

export default ({
    data() {
        return {
            name: "",
            echartsData: {
                xAxisData:[],name:[],value1:[],value2:[]
            },
            date: '',
            time: '',
            week: '',
            last:'',
            now:''
        }
    },
    
    mounted() {
        console.log(this.$route.query);
        this.now=this.$route.query.now
        this.name = this.$route.query.name
        this.last = this.$route.query.last
        this.tttt()
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
                this.$router.push({ path: "/conter", query: { name: this.now,last:this.last } });
            }
        },
        tempType(item) {
            var chartDom = document.getElementById('charts');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                title: {
                    text: '两天内的数据对比',
                    textStyle:{
                        color:'white'
                    }
                },
                legend: {
                    data:item.name
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
                            color: "white",
                        },
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
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
                series: [
                    {
                        name: item.name[0],
                        type: 'line',
                        stack: 'Total',
                        data: item.value1,
                        lineStyle:{
                            color:"blue"
                        }
                    },
                    {
                        name:item.name[1],
                        type: 'line',
                        stack: 'Total',
                        data: item.value2,
                        lineStyle:{
                            color:"orange"
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
        tttt() {
            sensor.forEach(item => {
                if (item.equipmentName == this.name) {
                    if(this.echartsData.name.indexOf(item.updateTime.split(" ")[0].slice(-5)) == -1){
                        this.echartsData.name.push(item.updateTime.split(" ")[0].slice(-5))
                    }
                    if(this.echartsData.xAxisData.indexOf(item.updateTime.split(" ")[1])== -1){
                        this.echartsData.xAxisData.push(item.updateTime.split(" ")[1])
                    }
                    if(this.echartsData.name[0] == item.updateTime.split(" ")[0].slice(-5)){
                        this.echartsData.value1.push(item.value)
                    }else{
                        this.echartsData.value2.push(item.value)
                    }
                }
            })
            console.log(this.echartsData);
        }
    }
})
</script>

<style scoped>
.comparison {
    background-color: #1E6BA3;
    height: 100vh;
    width: 100%;
    color: white;
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
    cursor: pointer;
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

#charts {
    width: 70%;
    height: 75%;
    margin:2%  auto;
    border: 1px solid #0a1720;
}
</style>