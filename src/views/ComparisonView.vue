<template>
  <div>
    <HeadersBox />
    <div class="comparison">
      <div style="cursor: pointer; z-index: 999" class="go-back" @click="back">
        <div
          style="display: inline-block; position: absolute; left: 20px; top: -80px; display: flex; align-items: center; justify-content: center">
          <svg t="1711938765168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2398" width="16" height="16">
            <path
              d="M588.468659 257.265591H123.316451L371.227243 58.55359a31.947267 31.947267 0 1 0-39.614611-49.837737l-319.472671 255.578137v11.501016a30.669376 30.669376 0 0 0 0 4.472617v3.194727a30.669376 30.669376 0 0 0 0 4.472617v11.501016l319.472671 255.578137a31.947267 31.947267 0 1 0 40.253556-49.837737L123.316451 321.160125h465.152208C792.292223 321.160125 958.418011 464.283881 958.418011 640.632795s-166.125789 319.47267-369.949352 319.472671H95.841801a31.947267 31.947267 0 0 0 0 63.894534h492.626858C830.628943 1024 1022.312545 852.123703 1022.312545 640.632795s-191.683602-383.367205-433.843886-383.367204z"
              :fill="$store.state.theme === 'black' ? '#fff' : '#36366f'" p-id="2399"></path>
          </svg>
        </div>
        <div style="display: inline-block; position: absolute; left: 39px; top: -80px; margin-left: 5px">戻る</div>
      </div>
      <div id="charts"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import sensor from "../static/传感器.json";
import HeadersBox from "../components/Headers.vue";
import { resizeMyCharts } from "../static/echarts自适应.js";

export default {
  data() {
    return {
      name: "",
      echartsData: {
        xAxisData: [],
        yAxis: { name: "", type: "" },
        name: [],
        value1: [],
        value2: [],
        color: "white",
        title: "",
      },
      date: "",
      time: "",
      week: "",
      last: "",
      now: "",
    };
  },
  components: {
    HeadersBox,
  },
  mounted() {
    console.log(this.$route.query);
    this.now = this.$route.query.now;
    this.name = this.$route.query.name;
    this.last = this.$route.query.last;
    this.dispose();
    this.currentTime();
    this.tempType(this.echartsData);
    setInterval(() => {
      this.currentTime();
    }, 500);
  },
  methods: {
    back() {
      if (typeof this.last == "undefined") {
        this.$router.push("/");
      } else {
        this.$router.push({ path: "/conter", query: { name: this.now, last: this.last, con: this.$route.query.con } });
      }
    },
    tempType(item) {
      var chartDom = document.getElementById("charts");
      var myChart = echarts.init(chartDom);
      resizeMyCharts(myChart);
      var option;
      option = {
        title: {
          text: item.title,
          textStyle: {
            color: this.$store.state.theme == "light" ? "#36366f" : "#fff",
          },
        },
        legend: {
          data: item.name,
          textStyle: {
            color: this.$store.state.theme == "light" ? "#36366f" : "#fff",
          },
        },
        grid: {
          top: "5%",
          left: "3%",
          right: "3%",
          bottom: "5%",
        },
        xAxis: {
          type: "category",
          data: item.xAxisData,
          axisLabel: {
            //x轴文字的配置
            show: true,
            textStyle: {
              color: this.$store.state.theme == "light" ? "#36366f" : "#fff",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: this.$store.state.theme == "light" ? "#36366f" : "#fff",
            },
          },
          splitLine: {
            lineStyle: {
              color: this.$store.state.theme == "light" ? "#36366f" : "#fff",
            },
          },
        },
        yAxis: {
          namr: item.yAxis.name,
          type: item.yAxis.type,
          data: item.yAxis.data,
          axisLabel: {
            //x轴文字的配置
            show: true,
            textStyle: {
              color: this.$store.state.theme == "light" ? "#36366f" : "#fff",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: this.$store.state.theme == "light" ? "#36366f" : "#fff",
            },
          },
          splitLine: {
            lineStyle: {
              color: this.$store.state.theme == "light" ? "#36366f" : "#fff",
            },
          },
        },
        series: [
          {
            name: item.name[0],
            type: "line",
            data: item.value1,
            lineStyle: {
              color: "rgba(21, 241, 219, 1)",
            },
          },
          {
            name: item.name[1],
            type: "line",
            data: item.value2,
            lineStyle: {
              color: "orange",
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    //时间处理事件
    currentTime() {
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      var dateArr = [date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
      //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var strDate = year + "-" + dateArr[0] + "-" + dateArr[1];

      //此处可以拿外部的变量接收  strDate:2022-05-01 13:25:30
      //this.date = strDate;
      var strtime = dateArr[2] + ":" + dateArr[3] + ":" + dateArr[4];

      var week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var strDate1 = year + "/" + dateArr[0] + "/" + dateArr[1];
      var date1 = new Date(strDate1);
      let w = week[date1.getDay()];
      this.week = w;
      this.time = strtime;
      this.date = strDate;
    },
    //图表数据处理
    dispose() {
      sensor.forEach((item) => {
        if (item.equipmentName == this.name) {
          this.echartsData.title = item.equipmentName;
          if (this.echartsData.name.indexOf(item.updateTime.split(" ")[0].slice(-5)) == -1) {
            this.echartsData.name.push(item.updateTime.split(" ")[0].slice(-5));
          }
          if (this.echartsData.xAxisData.indexOf(item.updateTime.split(" ")[1]) == -1) {
            this.echartsData.xAxisData.push(item.updateTime.split(" ")[1]);
          }
          if (this.echartsData.name[0] == item.updateTime.split(" ")[0].slice(-5)) {
            item.equipmentType == "humidity"?this.echartsData.value1.push(parseFloat(item.value * 100).toFixed(0)) : this.echartsData.value1.push(item.value);
          } else {
            item.equipmentType == "humidity"?this.echartsData.value2.push(parseFloat(item.value * 100).toFixed(0)) : this.echartsData.value2.push(item.value);
          }
          if (item.equipmentType == "temperature") {
            this.echartsData.yAxis = { name: "℃", type: "value" };
          } else if (item.equipmentType == "humidity") {
            this.echartsData.yAxis = { name: "%", type: "value" };
          } else if (item.equipmentType == "open") {
            this.echartsData.yAxis = { name: "", type: "category", data: ["閉", "開"] };
          } else {
            this.echartsData.yAxis = { name: "g", type: "value" };
          }
        }
      });
      console.log(this.echartsData);
    },
  },
  computed: {
    newtheme() {
      return this.$store.state.theme;
    },
  },
  watch: {
    newtheme: {
      handler(val) {
        if (val == "light") {
          this.echartsData.color = "white";
          this.tempType(this.echartsData);
        } else {
          this.echartsData.color = "white";
          this.tempType(this.echartsData);
        }
      },
    },
  },
};
</script>

<style scoped>
.comparison {
  height: calc(100vh - 114px);
  width: 100%;
  color: white;
  position: absolute;
  top: 114px;
  display: flex;
}

.black {
  color: #0a1720;
}

.light {
  color: white;
}

#charts {
  width: 70%;
  height: 75%;
  margin: 2% auto;
  border: 1px solid transparent;
}
</style>
