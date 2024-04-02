<template>
  <div class="box">
    <HeadersBox></HeadersBox>
    <div class="main">
      <div class="mainleft">
        <div class="leftbox">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
            </div>
            <div class="lefttext">船舶集計</div>
          </div>
          <div class="shiplegend">
            <div>
              <div style="background-color: #cbd1d7; width: 8px; height: 8px; display: inline-block" />
              <div style="display: inline-block; margin-left: 5px">錨泊</div>
            </div>
            <div style="margin-left: 30px">
              <div style="background-color: #5b8ff9; width: 8px; height: 8px; display: inline-block" />
              <div style="display: inline-block; margin-left: 5px">係留</div>
            </div>
            <div style="margin-left: 30px">
              <div style="background-color: #5ad8a6; width: 8px; height: 8px; display: inline-block" />
              <div style="display: inline-block; margin-left: 5px">移動</div>
            </div>
            <div style="margin-left: 30px">
              <div style="background-color: #d3aa22; width: 8px; height: 8px; display: inline-block" />
              <div style="display: inline-block; margin-left: 5px">その他</div>
            </div>
          </div>
          <div id="shipbar" :style="myChartStyle"></div>
        </div>
        <div class="leftbotbox">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
            </div>
            <div class="lefttext">船舶情報</div>
          </div>
          <div class="shipsearch">
            <div class="searchdiv">
              <div class="searchimg">
                <svg t="1711877375552" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2412" width="200" height="200">
                  <path
                    d="M443.733333 776.533333c-179.2-25.6-307.2-192-281.6-375.466666 25.6-179.2 192-307.2 375.466667-281.6 179.2 25.6 307.2 192 281.6 375.466666-25.6 179.2-196.266667 307.2-375.466667 281.6M981.333333 938.666667l-213.333333-213.333334c59.733333-59.733333 98.133333-132.266667 110.933333-221.866666 29.866667-217.6-119.466667-413.866667-332.8-448-213.333333-29.866667-413.866667 119.466667-448 337.066666-29.866667 217.6 119.466667 413.866667 332.8 448 106.666667 17.066667 209.066667-12.8 285.866667-72.533333v4.266667l213.333333 213.333333c12.8 12.8 34.133333 12.8 46.933334 0s17.066667-34.133333 4.266666-46.933333"
                    p-id="2413"></path>
                </svg>
              </div>
              <input v-model="search" type="text" placeholder="船舶名を入力してください" class="searchtext" />
            </div>
            <div class="searchbutton" @click="shipsearch">検索</div>
          </div>
          <div class="listbox">
            <div class="listtitle">
              <div class="listson">船舶名</div>
              <div class="listson">船籍</div>
              <div class="listson">目的地</div>
              <div class="listson">操作</div>
            </div>

            <div>
              <div class="shipmessage" v-for="(item, index) in shipnamearr" :key="index">
                <div class="messageson" style="margin-left: 10px;">
                  {{ item.name }}
                </div>
                <div class="messageson">
                  {{ item.flagName }}
                </div>
                <div class="messageson">
                  {{ item.dest }}
                </div>
                <div class="messageson underline" @click="lookship" :data-v="item.name" style="cursor: pointer;">確認</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="maincenter" id="container"></div>
      <div class="mainleft">
        <div class="leftbox">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
            </div>
            <div class="lefttext">アラート</div>
          </div>
          <div class="ListTitle">
            <div>No</div>
            <div>船舶名</div>
            <div>集装箱号</div>
            <div>時間</div>
            <div>種類</div>
            <div>操作</div>
          </div>
          <div class="shipclass">
            <!-- sensor.filter((p) => p.status !== 0) -->
            <div v-for="(item, index) in getSensor()" :key="index">
              <div style="left: 10px; top: 0; height: 100%; display: flex; align-items: center">
                {{ index + 1 }}
              </div>
              <div :title="freighttrack.find((p) => p.containerNumber === item.containerNumber)?.vessel" style="margin-left:18px ;">
                {{ freighttrack.find((p) => p.containerNumber === item.containerNumber)?.vessel }}
              </div>
              <div :title="freighttrack.find((p) => p.containerNumber === item.containerNumber)?.vessel">
                {{ item.containerNumber }}
              </div>
              <div>
                {{  item.updateTime.split("-")[1]+ '-'+item.updateTime.split("-")[2] }}
              </div>
              <div>
                <span v-if="item.status == 1" style="color: orange">警告</span><span v-if="item.status == 2"
                  style="color: red">異常</span>
              </div>
              <div style="cursor: pointer" @click="sensoralarm" :data-v="item.equipmentName">
                確認
              </div>
            </div>
          </div>
        </div>
        <div class="leftbotbox">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
            </div>
            <div class="lefttext">BL情報</div>
          </div>
          <div class="shipsearch">
            <div class="searchdiv">
              <div class="searchimg">
                <svg t="1711877375552" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2412" width="200" height="200">
                  <path
                    d="M443.733333 776.533333c-179.2-25.6-307.2-192-281.6-375.466666 25.6-179.2 192-307.2 375.466667-281.6 179.2 25.6 307.2 192 281.6 375.466666-25.6 179.2-196.266667 307.2-375.466667 281.6M981.333333 938.666667l-213.333333-213.333334c59.733333-59.733333 98.133333-132.266667 110.933333-221.866666 29.866667-217.6-119.466667-413.866667-332.8-448-213.333333-29.866667-413.866667 119.466667-448 337.066666-29.866667 217.6 119.466667 413.866667 332.8 448 106.666667 17.066667 209.066667-12.8 285.866667-72.533333v4.266667l213.333333 213.333333c12.8 12.8 34.133333 12.8 46.933334 0s17.066667-34.133333 4.266666-46.933333"
                    p-id="2413"></path>
                </svg>
              </div>
              <input v-model="freightnumber" type="text" placeholder="BL番号を入力してください" class="searchtext" />
            </div>
            <div class="searchbutton" @click="freightsearch">搜索</div>
          </div>
          <div>
            <div class="hullNumber">
              <div>BL番号</div>
              <div>行き先</div>
              <div>操作</div>
            </div>
            <div style="overflow: auto;height: 250px;">
              <div class="hull" v-for="(item, index) in freightarr" :key="index">
                <div>
                  {{ item.billNumber }}
                </div>
                <div>
                  {{ item.pod }}
                </div>
                <div class="underline" style="cursor:pointer;" @click="look" :data-v="item.vessel" :data-con="item.containerNumber">確認</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import * as echarts from "echarts";
import ship from "../static/船舶.json";
import shiptracking from "../static/船舶跟踪.json";
import freighttrack from "../static/货物跟踪.json";
import sensor from "../static/传感器.json";
import containerList from "../static/集装箱.json";
import HeadersBox from "@/components/Headers.vue";

export default {
  watch: {},
  name: "map-view",

  data() {
    return {
      xData: ["錨泊", "係留", "移動", "その他"], //横坐标
      yData: [], //数据
      xData1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], //横坐标
      yData1: [600, 300, 200, 350, 250, 650, 750, 450, 750, 550, 750, 650], //数据
      myChartStyle: { float: "left", width: "95%", height: "290px" }, //图表样式
      myChartStyle1: { float: "left", width: "95%", height: "250px" }, //图表样式
      ship: ship,
      shiptracking: shiptracking,
      freighttrack: freighttrack,
      sensor: sensor,
      containerList: containerList,
      shipnamearr: [],
      search: "",
      thisshop: "",

      freightnumber: "",
      freightarr: [],
    };
  },
  components: { HeadersBox },

  methods: {
    freightsearch() {
      console.log(this.freightnumber);
    },

    //右侧报警信息跳转

    sensoralarm(e) {
      console.log(e.target.dataset.v);
      this.$router.push({ path: "comparison", query: { name: e.target.dataset.v } });
    },
    datasearch() {
      // this.freightarr = this.freighttrack;
      this.freighttrack.forEach((item) => {
        if (item.billNumber != null) {
          this.freightarr.push(item)
        }
      })
      let underway = 0;
      let mooring = 0;
      let mooralongside = 0;
      let or = 0;
      this.ship.forEach((item) => {
        //  this.shipnamearr.push(item.nameEn)
        console.log(item);
        let num = 0;
        for (let i = 0; i < this.freighttrack.length; i++) {
          if (this.freighttrack[i].vessel == item.nameEn) {
            num++;
          }
        }

        if (item.navStatus == 0) {
          underway++;
        } else if (item.navStatus == 1) {
          mooring++;
        } else if (item.navStatus == 5) {
          mooralongside++;
        } else {
          or++;
        }

        this.shipnamearr.push({ name: item.nameEn, num: num, location: [item.lon, item.lat], flagName: item.flagName, dest: item.dest, status: item.navStatus });
        // this.shipnamearr.push({ name: item.nameEn, num: num, location: [item.lon, item.lat], flagName: item.flagName, dest: item.dest, status: item.navStatus });
      });
      this.yData = [mooring, mooralongside, underway, or];
      console.log(this.yData);
      this.initEcharts();
      console.log(this.shipnamearr, "信息");
    },
    initEcharts() {
      // 基本柱状图
      const option = {
        // legend: { data: ["锚泊", "靠泊", "在航", "其他"] },
        //       legend: {
        //   show: true,
        //   data: ["锚泊", "靠泊", "在航", "其他"]
        // },
        xAxis: {
          type: "category",
          data: ["錨泊", "係留", "移動", "その他"],

          axisLabel: {
            //x轴文字的配置
            show: true,
            textStyle: {
              color: this.$store.state?.theme === "black" ? "#fff" : "#36366f",
            },
          },
        },

        yAxis: {
          min: 0,
          max: 10,
          interval: 2,

          axisLabel: {
            //x轴文字的配置
            show: true,
            textStyle: {
              color: this.$store.state?.theme === "black" ? "#fff" : "#36366f",
            },
          },
        },
        series: [
          {
            name: "靠泊",
            type: "bar",
            data: this.yData,
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ["#CBD1D7", "#5B8FF9", "#5AD8A6", "#D3AA22"];
                  return colorList[params.dataIndex];
                },
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      const myChart = echarts.init(document.getElementById("shipbar"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

    initAMap() {
      AMapLoader.load({
        key: "	0046e0eb262c30e4372c3034d350a6c4", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            lang: "en",
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 2, // 初始化地图级别
            center: [180, 40], // 初始化地图中心点位置
          });
          for (let i = 0; i < this.shipnamearr.length; i++) {
            let backgroundColor =
              this.shipnamearr[i].status == 0 ? "#5AD8A6" : this.shipnamearr[i].status == 1 ? "#CBD1D7" : this.shipnamearr[i].status == 5 ? "#5B8FF9" : "#D3AA22";
            var marker = new AMap.Marker({
              position: this.shipnamearr[i].location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              map: this.map,
              lang: "ja_JP",
              content: `<div class="marker" style="color:#fff;background:${backgroundColor} ;border-radius:50%;height:22px;width:22px;font-size:10px;  text-align: center;line-height:22px;" @click='shipmessage'
                         data-id="${this.shipnamearr[i].name}" >
                           ${this.shipnamearr[i].num}
                        </div>`,
              offset: new AMap.Pixel(-15, -20),
            });
            marker.on("click", (mapEvent) => {
              // console.log(mapEvent.originEvent.target.dataset.id);
              console.log(mapEvent.originEvent.target.dataset.id);
              // console.log(mapEvent.target.dom?.getElementsByClassName("marker")[0].getAttribute("data-id"));
              // this.$router.push({ path: "/about", query: { name: mapEvent.target.dom?.getElementsByClassName("marker")[0].getAttribute("data-id") } });
              this.$router.push({ path: "/about", query: { name: mapEvent.originEvent.target.dataset.id } });
            });
            marker.on("mouseover", (mapEvent) => {
              if (mapEvent.originEvent.target.className !== "marker") return;
              if (this.infoWindow && mapEvent.originEvent.target.dataset.id) {
                this.infoWindow.close();
              }
              var info = [];
              info.push(`<div style="color:#000;font-size:10px">${mapEvent.originEvent.target.dataset.id}</div>`);
              this.infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -25),
                content: info.join(""), //使用默认信息窗体框样式，显示信息内容
              });
              if (mapEvent.originEvent.target.dataset.id) {
                this.infoWindow.open(this.map, mapEvent.target.getPosition());
              }
              // console.log(mapEvent.target.dom?.getElementsByClassName("marker")[0].getAttribute("data-id"));
            });
            // marker.on('mouseout', () => {

            // this.infoWindow.close();

            // })

            // 将创建的点标记添加到已有的地图实例：
            this.map.add([marker]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    shipsearch() {
      console.log("search", this.search);
      let arr = [];
      for (let i = 0; i < this.shipnamearr.length; i++) {
        if (this.search === this.shipnamearr[i].name) {
          arr.push(this.shipnamearr[i]);
          console.log(this.shipnamearr);
        }
      }

      this.shipnamearr = arr;
      console.log("search", this.shipnamearr);
    },
    look(e) {
      console.log(e.target.dataset.v);
      console.log(e.target.dataset.con);
      this.$router.push({ path: "/about", query: { name: e.target.dataset.v,con:e.target.dataset.con } });
    },
    lookship(e){
      console.log(e.target.dataset.v);
      
      this.$router.push({ path: "/ship", query: { name: e.target.dataset.v } });
    },
    getSensor() {
      const data = JSON.parse(JSON.stringify(this.sensor))
      const sortedData = data.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));
      const filteredData = sortedData.reduce((acc, currentValue) => {
        const existingItem = acc.find(item => item.equipmentId === currentValue.equipmentId);
        if (!existingItem) {
          acc.push(currentValue);
        }
        return acc;
      }, []);
      console.log('filteredData ==>',filteredData);

      return filteredData.filter(p => p.status !== 0)
    }
  },
  mounted() {
    // this.$nextTick(() => {
    this.initEcharts();
    // this.lineEcharts();
    this.initAMap();
    // console.log("船舶信息", this.ship);
    // console.log("船舶跟踪", this.shiptracking);
    // console.log("货物跟踪", this.freighttrack);
    this.datasearch();

    // })
  },

  unmounted() {
    this.map?.destroy();
  },
  beforeDestroy() {
    // 销毁地图实例
    if (this.map) {
      this.map.destroy();
    }
  },
};
</script>
<style scoped>
body {
  overflow-x: auto;
}

.main {
  position: absolute;
  top: 70px;
  display: flex;
  width: 100%;
  height: calc(100% - 70px);
  align-items: center;
  justify-content: space-between;
  padding: 1%;
  box-sizing: border-box;
}

.mainleft {
  width: 21%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.maincenter {
  width: 55%;
  height: 100%;
}

.mainleft>div {
  width: 100%;
  height: 49%;
  border: 1px solid #98e7fc;
  box-sizing: border-box;
  padding: 3% 1%;
}

.leftboxtitle {
  width: 97%;
  height: 30px;
  margin: auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 3%;
  background: linear-gradient(270deg, rgba(47, 186, 255, 0) 0%, rgba(77, 210, 255, 0.8) 63.77%, rgba(84, 216, 255, 0.8) 86.69%, rgba(92, 222, 255, 0) 100%);
}

.lefttext {
  margin-left: 3%;
  color: #fff;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
}

.shiplegend {
  color: #fff;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  width: 90%;
  margin: 3% auto;
}

.shiplegend>div {
  display: inline-block;
}

#shipbar {
  width: 100%;
  height: 100%;
}

.shipsearch {
  width: 97%;
  height: 30px;
  margin: 3% auto;
  display: flex;
  border: 0.8px solid rgba(255, 255, 255, 0.36);
  background: rgba(255, 255, 255, 0.12);
}

.searchdiv {
  width: 76%;
  height: 30px;
  display: flex;
  align-items: center;
}

.searchimg {
  width: 10%;
  height: 30px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchtext {
  width: 93%;
  height: 26px;
  background: #031027;
  opacity: 0.3;
  color: #fff;
}

.searchbutton {
  width: 24%;
  height: 30px;
  background-color: #15517a;
  text-align: center;
  line-height: 30px;
  color: #fff;

  font-family: "Microsoft YaHei";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}

.searchimg svg {
  width: 18px;
  height: 18px;
}

.listbox {
  width: 97%;
  margin: auto;
}

.listtitle {
  width: 100%;
  height: 32px;
  background-color: rgba(47, 186, 255, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.listson {
  color: #fff;
  width: 25%;
  font-size: 14px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.listbox>div:nth-child(2) {
  width: 100%;
}

.shipmessage {
  width: 100%;
  margin: 3% 0;
  display: flex;
  line-height: 25px;
}

.shipmessage>div:nth-child(1) {
  display: block;
}

.messageson {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  opacity: 0.8;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
}

.ListTitle {
  width: 97%;
  margin: 3% auto;
  height: 32px;
  background-color: rgba(47, 186, 255, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.ListTitle>div {
  width: 20%;
  color: #fff;
  font-size: 14px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
}

.shipclass {
  width: 97%;
  margin: 3% auto;
}

.shipclass>div {
  width: 100%;
  font-size: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.shipclass>div>div {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
}

.shipclass>div>div:nth-child(1),
.ListTitle>div:nth-child(1) {
  width: 8%;
}

.ListTitle>div:nth-child(2),
.ListTitle>div:nth-child(3) {
  width: 25%;
}

.shipclass>div>div:nth-child(2),
.shipclass>div>div:nth-child(3) {
  width: 25%;
  display: block;
}

.shipclass>div>div:nth-child(4),
.ListTitle>div:nth-child(4) {
  width: 20%;
}

.ListTitle>div:nth-child(5),
.ListTitle>div:nth-child(6),
.shipclass>div>div:nth-child(5),
.shipclass>div>div:nth-child(6) {
  width: 10%;
}

.hullNumber {
  width: 100%;
  height: 32px;
  background-color: rgba(47, 186, 255, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hullNumber>div {
  width: 31%;
  color: #fff;
  font-size: 14px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
}

.hull {
  width: 100%;
  margin: 3% 0;
  font-size: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 25px
}

.hull>div {
  width: 31%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
}
.hull>div:nth-child(1){
  justify-content: flex-start;
}

.underline {
  text-decoration: underline;
}
</style>
