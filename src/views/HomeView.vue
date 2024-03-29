<template>
  <div class="home">
    <div class="head">
      <div class="headtitle">货运管理平台</div>
      <div class="headtext">
        <span class="headtime">
          {{ date }}
        </span>
        <span class="headtime" style="margin-left: 25px">
          {{ week }}
        </span>
        <span class="headtime">
          {{ time }}
        </span>
      </div>
    </div>
    <div class="main">
      <div class="mainleft">
        <div class="leftbox" style="background: #031027; position: relative">
          <div class="leftboxtitle">
            <div class="arrows">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
            </div>
            <div class="lefttext">货船统计</div>
          </div>
          <div class="shiplegend">
            <div>
              <div style="background-color: #cbd1d7; width: 8px; height: 8px; display: inline-block" />
              <div style="display: inline-block; margin-left: 5px">锚泊</div>
            </div>
            <div style="margin-left: 30px">
              <div style="background-color: #5b8ff9; width: 8px; height: 8px; display: inline-block" />
              <div style="display: inline-block; margin-left: 5px">靠泊</div>
            </div>
            <div style="margin-left: 30px">
              <div style="background-color: #5ad8a6; width: 8px; height: 8px; display: inline-block" />
              <div style="display: inline-block; margin-left: 5px">在航</div>
            </div>
            <div style="margin-left: 30px">
              <div style="background-color: #d3aa22; width: 8px; height: 8px; display: inline-block" />
              <div style="display: inline-block; margin-left: 5px">其他</div>
            </div>
          </div>

          <div id="shipbar" :style="myChartStyle" style="margin-left: 15px"></div>
        </div>
        <div class="leftbotbox" style="background: #031027; position: relative">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
            </div>
            <div class="lefttext">货船信息</div>
          </div>
          <div class="shipsearch">
            <div class="searchdiv">
              <div class="searchimg">
                <img src="../assets/search.svg" alt="" />
              </div>
              <!-- <div class="searchtext">请输入船名</div> -->
              <input v-model="search" type="text" placeholder="请输入船名" class="searchtext" />
            </div>
            <div class="searchbutton" @click="shipsearch">搜索</div>
          </div>
          <div class="listbox">
            <div class="listtitle">
              <div class="listone listson">船名</div>
              <div class="listtwo listson">船籍</div>
              <div class="listfour listson">目的地</div>
              <div class="listthree listson">操作</div>
            </div>

            <div style="overflow-x: hidden; height: 200px; position: absolute; width: 332px">
              <div class="shipmessage" style="top: 0px" v-for="(item, index) in shipnamearr" :key="index">
                <div class="messageson" style="left: 33px; font-size: 9px">
                  {{ item.name }}
                </div>
                <div class="messageson" style="left: 146px">
                  {{ item.flagName }}
                </div>
                <div class="messageson" style="left: 196px; font-size: 8px">
                  {{ item.dest }}
                </div>
                <div class="messageson underline" style="left: 271px; cursor: pointer" @click="look"
                  :data-v="item.name">查看</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="maincenter" id="container">
        <!-- <div class="circle" style="right: 274.37px;top: 76px;">
          <div class="circlecolor">
            <div class="circletext">
              12
            </div>
          </div>
        </div> -->
      </div>
      <div class="mainleft">
        <div class="leftbox" style="background: #031027">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
            </div>
            <div class="lefttext">报警信息</div>
          </div>

          <div class="listtitle"
            style="width: 348px; height: 32px; margin-left: 18px; position: relative; line-height: 20px; display: flex; align-items: center">
            <div class="listone listson" style="left: 10px">序号</div>
            <div class="listtwo listson" style="left: 58px">所属货船</div>
            <div class="listthree listson" style="left: 140px">时间</div>
            <div class="listthree listson" style="left: 220px">报警属性</div>
            <div class="listthree listson" style="left: 300px">操作</div>
          </div>
          <div style="height: 221px; position: absolute; overflow: auto">
            <div v-for="(item, index) in containerList.filter((p) => p.status !== 0)" :key="index"
              style="width: 348px; height: 32px; margin-left: 18px; position: relative; display: flex; align-items: center">
              <div class="listone listson" style="left: 10px; top: 0; height: 100%; display: flex; align-items: center">
                {{ index + 1 }}</div>
              <div class="listtwo listson"
                :title="freighttrack.find((p) => p.containerNumber === item.containerNumber)?.vessel"
                style="width: 80px; left: 58px; top: 0; height: 100%;line-height: 32px; font-size: 10px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
                {{ freighttrack.find((p) => p.containerNumber === item.containerNumber)?.vessel }}
              </div>
              <div class="listthree listson"
                style="left: 140px; top: 0; height: 100%; display: flex; align-items: center; font-size: 9px">
                {{ item.date.split(":")[0] + ":" + item.date.split(":")[1] }}
              </div>
              <div class="listthree listson"
                style="left: 235px; top: 0; height: 100%; display: flex; align-items: center">
                <span v-if="item.status == 1" style="color: yellow">警告</span><span v-if="item.status == 2"
                  style="color: red">异常</span>
              </div>

              <div class="listthree listson"
                style="left: 300px; top: 0; height: 100%; display: flex; align-items: center; cursor: pointer"
                @click="sensoralarm" :data-v="item.containerNumber">
                查看
              </div>
            </div>
          </div>
        </div>
        <div class="leftbotbox" style="position: relative">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
            </div>
            <div class="lefttext">货单统计</div>
          </div>
          <div class="shipsearch">
            <div class="searchdiv">
              <div class="searchimg">
                <img src="../assets/search.svg" alt="" />
              </div>
              <!-- <div class="searchtext">请输入船名</div> -->
              <input v-model="freightnumber" type="text" placeholder="请输入货单号" class="searchtext" />
            </div>
            <div class="searchbutton" @click="freightsearch">搜索</div>
          </div>
          <div class="listbox">
            <div class="listtitle">
              <div class="listone listson">船名</div>
              <div class="listtwo listson">单号</div>
              <div class="listfour listson">箱号</div>
              <div class="listthree listson">操作</div>
            </div>

            <div style="overflow-x: hidden; height: 200px; position: absolute; width: 332px">
              <div class="shipmessage" style="top: 0px" v-for="(item, index) in freightarr" :key="index">
                <div class="messageson" style="left: 33px; font-size: 9px">
                  {{ item.vessel }}
                </div>
                <div class="messageson"
                  style="left: 146px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width: 40px;" :title="item.billNumber" >
                  {{ item.billNumber }}
                </div>
                <div class="messageson"
                  style="left: 196px; font-size: 8px'text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
                  {{ item.containerNumber }}
                </div>
                <div class="messageson underline" style="left: 271px;cursor:pointer" @click="look"
                  :data-v="item.vessel">
                  查看</div>
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
export default {
  watch: {},
  name: "map-view",

  data() {
    return {
      xData: ["锚泊", "靠泊", "在航", "其他"], //横坐标
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
      date: "",
      time: "",
      week: "",
      freightnumber: '',
      freightarr: []
    };
  },
  methods: {
    freightsearch() {
      console.log(this.freightnumber);
    },
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
    //右侧报警信息跳转

    sensoralarm(e) {
      console.log(e.target.dataset.v);
      this.$router.push({ path: "conter", query: { name: e.target.dataset.v } });
    },
    datasearch() {
      this.freightarr = this.freighttrack
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
        this.shipnamearr.push({ name: item.nameEn, num: num, location: [item.lon, item.lat], flagName: item.flagName, dest: item.dest, status: item.navStatus });
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
          data: ["锚泊", "靠泊", "在航", "其他"],

          axisLabel: {
            //x轴文字的配置
            show: true,
            textStyle: {
              color: "#fff",
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
              color: "#fff",
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
            lang: 'en',
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 2, // 初始化地图级别
            center: [50, 40], // 初始化地图中心点位置
          });
          for (let i = 0; i < this.shipnamearr.length; i++) {
            let backgroundColor = this.shipnamearr[i].status == 0 ? '#5AD8A6' : (this.shipnamearr[i].status == 1 ? '#CBD1D7' : (this.shipnamearr[i].status == 5 ? '#5B8FF9' : '#D3AA22'));
            var marker = new AMap.Marker({
              position: this.shipnamearr[i].location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              map: this.map,
              lang: 'ja_JP',
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
              this.$router.push({ path: '/about', query: { name: mapEvent.originEvent.target.dataset.id } })
            });
            marker.on("mouseover", (mapEvent) => {
              if (mapEvent.originEvent.target.className !== 'marker') return
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
      this.$router.push({ path: "/about", query: { name: e.target.dataset.v } });
    },
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
    this.currentTime();
    setInterval(() => {
      this.currentTime();
    }, 500);
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
.home {
  position: relative;
  overflow: hidden;
  background-color: #1e6ba3;
  color: #ffffff;
  width: 1920px;
  height: 945px;
}

.head {
  background-image: url(../assets/编组\ 3.png);
  width: 1920px;
  height: 80px;
  position: absolute;
  top: 0;
}

.headtitle {
  color: #fff;
  text-align: center;
  font-family: "Microsoft YaHei";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 9px;
  padding-top: 10px;
}

.headtext {
  padding-top: 5px;
  text-align: center;
}

.headtime {
  color: #fff;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
}

.main {
  position: absolute;
  top: 114px;
  /* padding:0 24px; */
}

.main>div {
  display: inline-block;
}

.leftbox {
  width: 380px;
  height: 385px;
  flex-shrink: 0;

  border: 1px solid #98e7fc;
  background-color: #031027;

  line-height: 1;
  background: rgba(0, 0, 0, 0.2) none repeat scroll !important;
}

.maincenter {
  /* background-image: url(../assets/ditu.png); */
  width: 1062px;
  height: 774px;
  flex-shrink: 0;
  margin-bottom: 24px;
  position: relative;
  top: 0;
}

.leftbotbox {
  /* padding-top: 16px; */
  width: 378.01px;
  height: 361px;
  flex-shrink: 0;
  border: 1px solid #98e7fc;
  background: rgba(0, 0, 0, 0.2) none repeat scroll !important;
  margin: 24px 0;
}

.mainleft {
  padding: 0 23px;

}

.leftboxtitle {
  width: 348px;
  height: 30px;
  flex-shrink: 0;
  /* margin-top: 16px */
  background: linear-gradient(270deg, rgba(47, 186, 255, 0) 0%, rgba(77, 210, 255, 0.8) 63.77%, rgba(84, 216, 255, 0.8) 86.69%, rgba(92, 222, 255, 0) 100%);
  margin: 16px 16px 16px 16px;
  position: relative;
}

.lefttext {
  position: absolute;
  color: #fff;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 2px;
  top: 6px;
  left: 32px;
}

.arrows {
  width: 8px;
  height: 12px;
  position: absolute;
  top: 8px;
  left: 12px;
}

.shiplegend {
  position: absolute;
  top: 78px;
  padding: 0 54px;
  color: #fff;
  height: 12px;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  /* 85.714% */
}

.shiplegend>div {
  display: inline-block;
}

.arrows1 {
  width: 8px;
  height: 12px;
  position: absolute;
  top: 4px;
  left: 12px;
}

.shipsearch {
  width: 332px;
  height: 30px;
  margin-left: 22px;
  border: 0.8px solid rgba(255, 255, 255, 0.36);
  background: rgba(255, 255, 255, 0.12);
  position: relative;
}

.searchbutton {
  width: 82px;
  height: 30px;
  background-color: #15517a;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  line-height: 30px;
  color: #fff;

  font-family: "Microsoft YaHei";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}

.searchdiv {
  position: relative;
}

.searchtext {
  position: absolute;
  left: 36px;
  top: -1px;
  height: 26px;

  width: 206px;
  background: #031027;
  opacity: 0.3;
  color: #fff;
}

.searchimg {
  position: absolute;
  top: 7px;
  left: 11px;
  width: 18px;
  height: 18px;
  opacity: 0.8;
}

.listbox {
  width: 332px;
  position: relative;
  margin-left: 22px;
  margin-top: 14px;
}

.listtitle {
  width: 332px;
  height: 32px;
  flex-shrink: 0;
  background-color: rgba(47, 186, 255, 0.25);
  fill: #fff;
  stroke-width: 1px;
  stroke: rgba(255, 255, 255, 0);
}

.listson {
  display: inline-block;
  position: absolute;
  top: 6px;
  color: #fff;
  font-size: 14px;
  opacity: 0.8;
}

.listone {
  left: 33px;
}

.listtwo {
  left: 146px;
}

.listfour {
  left: 196px;
}

.listthree {
  left: 271px;
}

.shipmessage {
  position: relative;
  height: 31px;
  line-height: 31px;
}

.messageson {
  position: absolute;
  font-size: 10px;
  opacity: 0.8;
}

.active {
  background: rgba(255, 255, 255, 0.12);
}

.underline {
  text-decoration: underline;
}

.foot {
  position: relative;
  top: 810px;
  height: 300px;
  padding: 0 26px;
}

.ftleft {
  position: absolute;
  bottom: 24px;
  width: 924px;
  height: 260px;
  background: rgba(0, 0, 0, 0.2) none repeat scroll !important;
  background: #031027;
  margin-bottom: 24px;
  border: 1px solid #98e7fc;
}

.ftright {
  position: absolute;
  right: 26px;
  bottom: 24px;
  width: 924px;
  height: 260px;
  background: rgba(0, 0, 0, 0.2) none repeat scroll !important;
  background: #031027;
  margin-bottom: 24px;
  border: 1px solid #98e7fc;
}

.linespan {
  position: absolute;
  right: 170px;
  top: 64px;
  font-size: 14px;
}

.circle {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  fill: rgba(0, 96, 181, 0.28);
  background-image: url(../assets/yuan.svg);
  background-size: cover;
  filter: drop-shadow(0px 0px 7.3px rgba(0, 96, 181, 0.65));
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 96, 181, 0.65);
  border-radius: 50%;

  font-size: 10px;

  text-align: center;
}

.circlecolor {
  background-color: #0060b5;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 5px;
}

.circletext {
  line-height: 22px;
}

.marker {
  height: 22px;
  width: 22px;
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
