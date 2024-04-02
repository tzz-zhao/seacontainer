<template>
  <div>
    <HeadersBox> </HeadersBox>
    <!-- <div style="cursor: pointer; z-index: 999" @click="back">
            <div
                style="display: inline-block; position: absolute; left: 20px; top: 30px; display: flex; align-items: center; justify-content: center">
                <svg t="1711938765168" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2398" width="16" height="16">
                    <path
                        d="M588.468659 257.265591H123.316451L371.227243 58.55359a31.947267 31.947267 0 1 0-39.614611-49.837737l-319.472671 255.578137v11.501016a30.669376 30.669376 0 0 0 0 4.472617v3.194727a30.669376 30.669376 0 0 0 0 4.472617v11.501016l319.472671 255.578137a31.947267 31.947267 0 1 0 40.253556-49.837737L123.316451 321.160125h465.152208C792.292223 321.160125 958.418011 464.283881 958.418011 640.632795s-166.125789 319.47267-369.949352 319.472671H95.841801a31.947267 31.947267 0 0 0 0 63.894534h492.626858C830.628943 1024 1022.312545 852.123703 1022.312545 640.632795s-191.683602-383.367205-433.843886-383.367204z"
                        :fill="$store.state.theme === 'black' ? '#fff' : '#36366f'" p-id="2399"></path>
                </svg>
            </div>
            <div style="display: inline-block; position: absolute; left: 39px; top: 28px; margin-left: 5px">戻る</div>
        </div> -->

    <div style="cursor: pointer; z-index: 999" class="go-back" @click="back">
      <div
        style="display: inline-block; position: absolute; left: 20px; top: 30px; display: flex; align-items: center; justify-content: center">
        <svg t="1711938765168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2398" width="16" height="16">
          <path
            d="M588.468659 257.265591H123.316451L371.227243 58.55359a31.947267 31.947267 0 1 0-39.614611-49.837737l-319.472671 255.578137v11.501016a30.669376 30.669376 0 0 0 0 4.472617v3.194727a30.669376 30.669376 0 0 0 0 4.472617v11.501016l319.472671 255.578137a31.947267 31.947267 0 1 0 40.253556-49.837737L123.316451 321.160125h465.152208C792.292223 321.160125 958.418011 464.283881 958.418011 640.632795s-166.125789 319.47267-369.949352 319.472671H95.841801a31.947267 31.947267 0 0 0 0 63.894534h492.626858C830.628943 1024 1022.312545 852.123703 1022.312545 640.632795s-191.683602-383.367205-433.843886-383.367204z"
            :fill="$store.state.theme === 'black' ? '#fff' : '#36366f'" p-id="2399"></path>
        </svg>
      </div>
      <div style="display: inline-block; position: absolute; left: 39px; top: 28px; margin-left: 5px"
        :class="$store.state.theme === 'black' ? 'light' : 'black'">戻る</div>
    </div>
    <div class="sensor">
      <div class="center">
        <div class="left-list">
          <div class="title">
            <div></div>
            <span>センサー情報</span>
          </div>
          <div class="list-search">
            <input placeholder="センサー名を入力してください" style="color: #fff" v-model="search" />
            <button @click="sensorsearch">検索</button>
          </div>
          <div class="list-table">
            <el-table :data="sensorarr" style="width: 100%"
              :header-cell-style="{ background: $store.state.theme === 'black' ? '#11517C' : '#fff', color: $store.state.theme === 'black' ? 'white' : '#36366f' }"
              :highlight-current-row="false" :row-class-name="tableRowClassName">
              <el-table-column prop="equipmentName" label="センサー名" width="180"> </el-table-column>
              <el-table-column prop="status" label="状態" width="180">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 0">正常</span>
                  <span v-if="scope.row.status == 1" style="color: orange">警告</span>
                  <span v-if="scope.row.status == 2" style="color: red">異常</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">確認</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right-echarts">
          <div class="echartTitle">
            <div class="title">
              <div></div>
              <span>センサー情報</span>
            </div>
            <button @click="exportToCSV">DL</button>
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
  </div>
</template>
<script>
import * as echarts from "echarts";
import sensor from "../static/传感器.json";
import sensorTimeDate from "../static/传感器日均.json";
import Papa from "papaparse";
import HeadersBox from "../components/Headers.vue";
import { resizeMyCharts } from "../static/echarts自适应.js";

/*sensorarr-传感器列表数据 
echartsData-面积图数据 
（data, time ,week）-时间 
search - 搜索框数据
sensor - 传感器数据
（name，last） - 跳转传参数据
*/
export default {
  data() {
    return {
      sensorarr: [],
      echartsData: [
        {
          title: "温度 ℃",
          type: "temperature",
          series: { data: [], type: "line" },
          xAxisData: [],
          yAxis: { name: "°C", type: "value"},
          pieces: { min: 0, max: 4 },
          color: "white",
        },
        {
          title: "湿度 %",
          type: "humidity",
          series: { data: [], type: "line" },
          xAxisData: [],
          yAxis: { name: "%rh", type: "value" },
          pieces: { min: 65, max: 98 },
          color: "white",
        },
        {
          title: "開閉",
          type: "open",
          series: { data: [], type: "line" },
          xAxisData: [],
          yAxis: { type: "category", data: ["閉", "開"] },
          pieces: { min: 0, max: 1 },
          color: "white",
        },
        {
          title: "振動 G",
          type: "vibration",
          series: { data: [], type: "line" },
          xAxisData: [],
          yAxis: { name: "G", type: "value" },
          pieces: { min: 0.05, max: 0.2 },
          color: "white",
        },
      ],
      date: "",
      time: "",
      week: "",
      name: "",
      last: "",
      sensordata: sensor,
      search: "",
    };
  },
  components: { HeadersBox },
  mounted() {
    this.name = this.$route.query.name;
    this.last = this.$route.query.last;
    if (this.$route.query.name == sensorTimeDate[0].containerNumber) {
      this.transmission();
    }
    this.echartsData.forEach((item) => {
      this.tempType(item);
    });
    this.datadispose();
    this.currentTime();
    setInterval(() => {
      this.currentTime();
    }, 500);
    if (this.$store.state.theme == "light") {
      this.echartsData.forEach((item) => {
        item.color = "black";
        this.tempType(item);
      });
    } else {
      this.echartsData.forEach((item) => {
        item.color = "white";
        this.tempType(item);
      });
    }
  },
  beforeCreate() {
    console.log(this.$route.query.name);
    console.log(this.$route.query.last);
  },
  methods: {
    //导出按钮
    exportToCSV() {
      const data = JSON.parse(JSON.stringify(sensorTimeDate));
      const jsonNewArr = [];
      data.forEach((item) => {
        let lineOne;
        let lineTwo;
        let lineThree;
        let lineFour;
        let lineFive;
        let lineSix;
        let lineSeven;
        for (const key in item) {
          if (Object.hasOwnProperty.call(item, key)) {
            if (key === "equipmentId") {
              lineOne = { 设备编号: item[key] };
            } else if (key === "equipmentName") {
              lineTwo = { 设备名称: item[key] };
            } else if (key === "equipmentType") {
              lineThree = { 设备类型: item[key] };
            } else if (key === "containerNumber") {
              lineFour = { 所属集装箱: item[key] };
            } else if (key === "updateTime") {
              lineFive = { 更新时间: item[key] };
            } else if (key === "value") {
              lineSix = { 值: item[key] };
            } else if (key === "status") {
              lineSeven = { 状态: item[key] };
            }
          }
        }
        const josnNew = {
          ...lineOne,
          ...lineTwo,
          ...lineThree,
          ...lineFour,
          ...lineFive,
          ...lineSix,
          ...lineSeven,
          所属货船: this.$route.query.last,
        };
        // console.log(josnNew);
        jsonNewArr.push(josnNew);
      });

      console.log("data =>", data);

      console.log(Papa);
      const csv = Papa.unparse(jsonNewArr);

      // 调用 saveCSV 方法将数据保存为CSV文件
      this.saveCSV(csv, "data.csv");
    },
    saveCSV(csv, fileName) {
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
    //获取列表数据
    datadispose() {
      this.sensordata.forEach((item) => {
        if (this.name == item.containerNumber) {
          this.sensorarr.push({ equipmentName: item.equipmentName, status: item.status });
        }
      });
      console.log(this.sensorarr);
      for (var i = 0; i < this.sensorarr.length; i++) {
        for (var j = i + 1; j < this.sensorarr.length; j++) {
          if (this.sensorarr[i].equipmentName == this.sensorarr[j].equipmentName) {
            //第一个等同于第二个，splice方法删除第二个
            // this.sensorarr.splice(j, 1);

            // this.$delete(this.sensorarr, j)
            this.$delete(this.sensorarr, i);
            j--;
          }
        }
      }
      console.log(this.sensorarr);
    },
    //返回
    back() {
      if (typeof this.last == "undefined") {
        this.$router.push("/");
      } else {
        this.$router.push({ path: "/about", query: { name: this.last, con: this.$route.query.con } });
      }
    },
    //列表搜索
    sensorsearch() {
      console.log(this.search);
      let arr = [];
      for (let i = 0; i < this.sensorarr.length; i++) {
        if (this.search === this.sensorarr[i].equipmentName) {
          arr.push(this.sensorarr[i]);
          console.log(this.sensorarr);
        }
      }

      this.sensorarr = arr;
      console.log("search", this.sensorarr);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0 && row) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    //面积图函数
    tempType(item) {
      var chartDom = document.getElementById(`${item.type}`);
      var myChart = echarts.init(chartDom);
      resizeMyCharts(myChart);
      var option;
      option = {
        xAxis: {
          type: "category",
          data: item.xAxisData,
          axisLabel: {
            //x轴文字的配置
            show: true,
            textStyle: {
              color: item.color,
            },
          },
          axisTick:{
            show:false
          },
          splitLine: {
            lineStyle: {
              color: item.color,
            },
          },
        },
        yAxis: {
          type: item.yAxis.type,
          name: item.yAxis.name,
          data: item.yAxis.data,
          nameTextStyle: {
            color: item.color,
          },
          axisLabel: {
            //y轴文字的配置
            show: true,
            textStyle: {
              color: item.color,
            },
          },
          splitLine: {
            lineStyle: {
              color: item.color,
            },
          },
        },
        visualMap: {
          type: "piecewise",
          show: false,
          hoverLink: false,
          pieces: [
            {
              lt: item.pieces.min,
              color: "rgba(250,0,0,0.5)",
            },
            {
              gte: item.pieces.min,
              lte: item.pieces.max,
              color: "rgba(57, 100, 145, 0.5)",
            },
            {
              gt: item.pieces.max,
              color: "rgba(250,0,0,0.5)",
            },
          ],
        },
        series: [
          {
            data: item.series.data,
            type: item.series.type,
            areaStyle: {
              origin: "start",
            },
          },
        ],
        grid: {
          // 让图表占满容器
          top: "40px",
          left: "30px",
          right: "30px",
          bottom: "20px",
        },
      };
      option && myChart.setOption(option);
    },
    //跳转
    handleClick(row) {
      this.$router.push({ path: "/comparison", query: { name: row.equipmentName, last: this.last, now: this.name, con: this.$route.query.con } });
    },
    //传导图表数据
    transmission() {
      sensorTimeDate.forEach((item) => {
        this.echartsData.forEach((item1) => {
          if (item.equipmentType === item1.type) {
            if (item.equipmentType == "open") {
              item1.series.data.push(item.value ? 1 : 0);
            } else if (item.equipmentType == "humidity") {
              item1.series.data.push(item.value * 100);
            } else {
              item1.series.data.push(item.value);
            }
            item1.xAxisData.push(item.updateTime.slice(-5));
          }
        });
      });
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
          this.echartsData.forEach((item) => {
            item.color = "black";
            this.tempType(item);
          });
        } else {
          this.echartsData.forEach((item) => {
            item.color = "white";
            this.tempType(item);
          });
        }
      },
    },
  },
};
</script>
<style scoped>
::v-deep .el-table td.el-table__cell {
  border-bottom: none;
}

::v-deep .el-table th.el-table__cell.is-leaf {
  border-bottom: none;
}

::v-deep .el-table::before {
  display: none;
}

.sensor {
  background-color: #0e457b;
  height: calc(100vh - 114px);
  width: 100%;
  position: absolute;
  top: 114px;
  display: flex;
}

.center {
  padding: 0 1%;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}

.left-list {
  width: 27%;
  height: 90%;
  border: 1px solid #98e7fc;
  background: #07365d;
  opacity: 0.6px;
  box-sizing: border-box;
  padding: 1%;
}

.title {
  background: linear-gradient(270deg, rgba(47, 186, 255, 0.0001) 0%, rgba(77, 210, 255, 0.8) 63.77%, rgba(84, 216, 255, 0.8) 86.69%, rgba(92, 222, 255, 0.0001) 100%);
  width: 70%;
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
  border-left: 8px solid #2ce7e7;
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
  width: 100%;
  height: 30px;
  border: 0.8px solid #ffffff5c;
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
  background: #15517a;
  border: none;
  color: white;
}

.list-table {
  margin-top: 11px;
  width: 100%;
  height: 90%;
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
  background-color: #07365d;
  border: none;
  color: white;
}

.right-echarts {
  width: 71%;
  height: 90%;
  border: 1px solid #98e7fc;
  background: #07365d;
  box-sizing: border-box;
  padding: 1%;
}

.echartTitle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 5%;
}

.echartTitle>button {
  width: 70px;
  height: 33px;
  background: linear-gradient(181.25deg, rgba(40, 125, 165, 0) -23.42%, #2499bc 98.94%, #17567c 98.94%);
  color: white;
  border: none;
  cursor: pointer;
}

.echartsTable {
  margin: 1%;
  width: 100%;
  height: 93%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.echartsTable>div {
  width: 48%;
  height: 49%;
  box-sizing: border-box;
  border: 1px solid #2499bc;
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
  line-height: 14px;
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

.black {
  color: #0a1720;
}

.light {
  color: white
}
</style>
