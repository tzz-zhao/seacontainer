<template>
  <div class="home">
    <div class="head">
      <div class="headtitle">货运管理平台</div>
      <div class="headtext">
        <span class="headtime"> 2023-12-16 </span>
        <span class="headtime" style="margin-left: 25px"> 周四 </span>
        <span class="headtime"> 上午10:15 </span>
      </div>
    </div>
    <div class="main">
      <div class="container-box">
        <div class="leftboxtitle">
          <div class="arrows1">
            <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
          </div>
          <div class="lefttext">集装箱信息</div>
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
            <div class="listone listson">集装箱编号</div>
            <div class="listtwo listson">状态</div>
            <div class="listthree listson">操作</div>
          </div>

          <div style="overflow-x: hidden; position: absolute; width: 332px; height: 552px">
            <div v-for="(item, index) in 20" :key="index" class="shipmessage" style="top: 0px">
              <div class="messageson" style="left: 33px">
                {{ "集装箱" + index.toString().padStart(4, "0") }}
              </div>
              <div class="messageson" style="left: 196px" :style="{ color: index % 4 === 0 ? 'red' : '#fff' }" v-text="index % 4 === 0 ? '异常' : '正常'"></div>
              <div class="messageson underline" style="left: 271px" :data-v="item.name">查看</div>
            </div>
          </div>
        </div>
      </div>
      <div class="maincenter" id="container"></div>
      <div class="container-box">
        <div class="leftboxtitle">
          <div class="arrows1">
            <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
          </div>
          <div class="lefttext">货船信息</div>
        </div>
        <div class="title">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="18" viewBox="0 0 32 18" fill="none">
            <path
              d="M1.51864 12.78C1.01243 14.535 0.506215 16.245 0 18H28.6011C29.1435 15.345 30.3367 12.735 32 10.215C21.948 12.51 11.7514 13.05 1.51864 12.78ZM17.1028 13.86C17.2836 13.86 17.3921 14.04 17.3921 14.22C17.3921 14.445 17.2475 14.58 17.1028 14.58C16.922 14.58 16.8136 14.4 16.8136 14.22C16.8136 14.04 16.922 13.86 17.1028 13.86ZM21.2249 8.235H22.7797C22.9243 8.235 23.0328 8.37 23.0328 8.55V10.215C23.0328 10.395 22.9243 10.53 22.7797 10.53H21.2249C21.0802 10.53 20.9718 10.395 20.9718 10.215V8.55C20.9718 8.37 21.0802 8.235 21.2249 8.235ZM4.80904 8.325H6.36384C6.47232 8.325 6.54463 8.415 6.54463 8.55V9.855C6.54463 9.99 6.47232 10.08 6.36384 10.08H4.80904C4.70056 10.08 4.62825 9.99 4.62825 9.855V8.55C4.62825 8.46 4.70056 8.325 4.80904 8.325ZM7.12316 8.325H8.67797C8.78644 8.325 8.85876 8.415 8.85876 8.55V9.855C8.85876 9.99 8.78644 10.08 8.67797 10.08H7.12316C7.01469 10.08 6.94237 9.99 6.94237 9.855V8.55C6.94237 8.46 7.05085 8.325 7.12316 8.325ZM9.54576 8.325H11.1006C11.209 8.325 11.2814 8.415 11.2814 8.55V9.855C11.2814 9.99 11.209 10.08 11.1006 10.08H9.54576C9.43729 10.08 9.36497 9.99 9.36497 9.855V8.55C9.32881 8.46 9.43729 8.325 9.54576 8.325ZM14.2102 8.505C14.2463 8.505 14.3186 8.55 14.3548 8.55C14.391 8.595 14.391 8.64 14.391 8.73V11.745C14.391 11.79 14.3548 11.88 14.3548 11.88C14.2825 11.97 14.2463 11.97 14.2102 11.97H13.0893C13.0531 11.97 12.9808 11.925 12.9446 11.925C12.9085 11.88 12.9085 11.835 12.9085 11.79V8.775C12.9085 8.73 12.9446 8.64 12.9446 8.595C12.9808 8.55 13.0169 8.55 13.0893 8.55H14.2102V8.505ZM16.4158 8.235H17.9706C18.1153 8.235 18.2237 8.37 18.2237 8.55V10.215C18.2237 10.395 18.1153 10.53 17.9706 10.53H16.4158C16.2712 10.53 16.1627 10.395 16.1627 10.215V8.55C16.1627 8.37 16.2712 8.235 16.4158 8.235ZM18.8384 8.235H20.4294C20.574 8.235 20.6825 8.37 20.6825 8.55V10.215C20.6825 10.395 20.574 10.53 20.4294 10.53H18.8746C18.7299 10.53 18.6215 10.395 18.6215 10.215V8.55C18.5853 8.37 18.6938 8.235 18.8384 8.235ZM20.0678 13.86C20.2486 13.86 20.3571 14.04 20.3571 14.22C20.3571 14.445 20.2124 14.58 20.0678 14.58C19.887 14.58 19.7785 14.4 19.7785 14.22C19.7785 14.04 19.887 13.86 20.0678 13.86ZM18.6215 13.86C18.8023 13.86 18.9107 14.04 18.9107 14.22C18.9107 14.445 18.7661 14.58 18.6215 14.58C18.4407 14.58 18.3322 14.4 18.3322 14.22C18.3322 14.04 18.4768 13.86 18.6215 13.86ZM2.78418 6.615H11.2452V4.365H11.0644V3.465L10.3051 0H11.896L13.1616 3.105H19.7785V4.365H19.0554L18.5853 6.615H26.5401V8.235H26.4678L26.7209 9.09C27.5164 9 28.3119 8.865 29.1073 8.685C29.9028 8.505 30.6983 8.325 31.4938 8.1L31.6384 8.055V9.855L31.4215 9.9V8.37C31.096 8.46 30.7706 8.55 30.4814 8.64V10.08L30.2644 10.125V8.685C29.939 8.775 29.6497 8.82 29.3243 8.91V10.305L29.1073 10.35V8.955C28.7819 9 28.4927 9.09 28.1672 9.135V10.53L27.9503 10.575V9.18C27.5887 9.225 27.2271 9.315 26.8294 9.36L27.2271 10.71C27.0102 10.755 26.8294 10.8 26.6124 10.8L26.3232 9.81L26.1785 10.89L25.9616 10.935L26.2147 9.315L25.9254 8.28H23.9006V11.295C20.8271 11.745 17.7537 12.015 14.6441 12.195C14.7164 12.105 14.7525 11.97 14.7525 11.79V8.775C14.7525 8.595 14.7164 8.46 14.6079 8.37C14.5356 8.28 14.391 8.19 14.2825 8.19H13.1616C13.0169 8.19 12.9085 8.235 12.8362 8.37C12.7638 8.46 12.6915 8.64 12.6915 8.775V11.79C12.6915 11.97 12.7277 12.105 12.8362 12.195L12.9085 12.285C10.0158 12.42 7.12316 12.465 4.19435 12.42H3.65198C3.25424 12.42 2.8565 12.42 2.45876 12.375L3.32655 8.28H2.92881V6.615H2.78418ZM12.113 6.615H13.7401V4.365H12.113V6.615ZM14.391 6.615H16.1627V4.365H14.391V6.615ZM16.8136 6.615H17.9706L18.4407 4.365H16.8136V6.615Z"
              fill="white" />
          </svg>
          <span>船名：TTNU8832427</span>
          <span>在航</span>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="ftleft">
        <div class="leftboxtitle">
          <div class="arrows1">
            <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
          </div>
          <div class="lefttext">报警信息</div>
        </div>

        <div class="listtitle" style="width: 876px; height: 32px; margin-left: 24px; position: relative">
          <div class="listone listson" style="left: 33px">序号</div>
          <div class="listtwo listson" style="left: 98px">所属货船</div>
          <div class="listthree listson" style="left: 234px">报警内容</div>
          <div class="listthree listson" style="left: 737px">报警属性</div>
          <div class="listthree listson" style="left: 809px">操作</div>
        </div>
        <div>
          <div style="width: 876px; height: 32px; margin-left: 24px; position: relative">
            <div class="listone listson" style="left: 33px">1</div>
            <div class="listtwo listson" style="left: 98px">SHSM1L797700</div>
            <div class="listthree listson" style="left: 234px">"冷藏舱温度异常！当前温度超出安全范围，请立即检查并调整。"</div>
            <div class="listthree listson" style="left: 737px">温度</div>
            <div class="listthree listson underline" style="left: 809px">查看</div>
          </div>
          <div style="width: 876px; height: 32px; margin-left: 24px; position: relative" class="active">
            <div class="listone listson" style="left: 33px">2</div>
            <div class="listtwo listson" style="left: 98px">SHSM1L797701</div>
            <div class="listthree listson" style="left: 234px">"湿度异常报警！冷藏舱湿度超出设定范围，请及时处理以避免货物受潮。"</div>
            <div class="listthree listson" style="left: 737px">湿度</div>
            <div class="listthree listson underline" style="left: 809px">查看</div>
          </div>
          <div style="width: 876px; height: 32px; margin-left: 24px; position: relative">
            <div class="listone listson" style="left: 33px">3</div>
            <div class="listtwo listson" style="left: 98px">SHSM1L797702</div>
            <div class="listthree listson" style="left: 234px">"位置异常报警！集装箱位置偏离计划路线，请尽快核实并调整航行方向。"</div>
            <div class="listthree listson" style="left: 737px">位置</div>
            <div class="listthree listson underline" style="left: 809px">查看</div>
          </div>
          <div style="width: 876px; height: 32px; margin-left: 24px; position: relative" class="active">
            <div class="listone listson" style="left: 33px">4</div>
            <div class="listtwo listson" style="left: 98px">SHSM1L797701</div>
            <div class="listthree listson" style="left: 234px">"通风系统故障报警！集装箱内通风系统发生故障，请立即检查并修复。"</div>
            <div class="listthree listson" style="left: 737px">通风</div>
            <div class="listthree listson underline" style="left: 809px">查看</div>
          </div>
          <div style="width: 876px; height: 32px; margin-left: 24px; position: relative">
            <div class="listone listson" style="left: 33px">5</div>
            <div class="listtwo listson" style="left: 98px">SHSM1L797702</div>
            <div class="listthree listson" style="left: 234px">"供电系统故障！冷藏设备停止运行，请立即检查供电系统并采取应急措施。"</div>
            <div class="listthree listson" style="left: 737px">供电</div>
            <div class="listthree listson underline" style="left: 809px">查看</div>
          </div>
        </div>
      </div>
      <div></div>
      <div class="ftright">
        <div class="leftboxtitle">
          <div class="arrows1">
            <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
          </div>
          <div class="lefttext">传感器异常数量</div>
        </div>
        <div :style="myChartStyle1" id="line"></div>
        <div class="linespan">
          <div>
            <div style="background-color: #5b8ff9; width: 8px; height: 8px; display: inline-block"></div>
            <div style="display: inline-block; margin-left: 5px">传感器</div>
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
export default {
  watch: {},
  name: "map-view",
  data() {
    return {
      xData: ["锚泊", "靠泊", "在航", "其他"], //横坐标
      yData: [750, 900, 600, 250], //数据
      xData1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], //横坐标
      yData1: [600, 300, 200, 350, 250, 650, 750, 450, 750, 550, 750, 650], //数据
      myChartStyle: { float: "left", width: "95%", height: "290px" }, //图表样式
      myChartStyle1: { float: "left", width: "90%", height: "200px" }, //图表样式
      ship: ship,
      shiptracking: shiptracking,
      freighttrack: freighttrack,
      shipnamearr: [],
      search: "",
      thisshop: "",
    };
  },
  methods: {
    reloadChartsAndMap() {
      // 在这里执行重新加载 ECharts 和地图控件的逻辑
      // 例如，重新初始化 ECharts 实例和地图控件
      // 注意：这里的代码需要根据你的具体情况来实现

      // 重新加载 ECharts
      this.initECharts();
      this.lineEcharts();
      this.datasearch();
      // 重新加载地图控件
      this.initMap();
    },
    datasearch() {
      this.ship.forEach((item) => {
        //  this.shipnamearr.push(item.nameEn)
        console.log(item);
        let num = 0;
        for (let i = 0; i < this.freighttrack.length; i++) {
          if (this.freighttrack[i].vessel == item.nameEn) {
            num++;
          }
        }
        this.shipnamearr.push({ name: item.nameEn, num: num, location: [item.lon, item.lat] });
      });

      console.log(this.shipnamearr);
    },
    lineEcharts() {
      const option = {
        xAxis: {
          axisLine: {
            lineStyle: {
              color: "#ffffff",
            },
            textStyle: {
              color: "#ccc",
            },
          },
          type: "category",
          boundaryGap: true,
          data: this.xData1,
        },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "6%",
          top: "8%",
          containLabel: true,
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#f7f7f7",
            },
            textStyle: {
              color: "#ccc",
            },
          },
          min: 0,
          max: 1000,
          interval: 250,

          type: "value",
        },
        series: [
          {
            data: this.yData1,
            type: "line",
            areaStyle: {},
            symbol: "none",
          },
        ],
      };
      const myChart = echarts.init(document.getElementById("line"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    initAMap() {
      // let arr = [[174.10, 24.52], [-123.6, 49.18], [113.474725, 30.692175]];
      AMapLoader.load({
        key: "	0046e0eb262c30e4372c3034d350a6c4", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 3, // 初始化地图级别
            center: [116.397428, 39.90923], // 初始化地图中心点位置
          });
          for (let i = 0; i < this.shipnamearr.length; i++) {
            var marker = new AMap.Marker({
              position: this.shipnamearr[i].location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              map: this.map,
              content: `
                  <div class="my_marker" style>
                        <div class="marker" style="color:#fff;background:#0060B5 ;border-radius:50%;height:22px;width:22px;font-size:10px;  text-align: center;line-height:22px;" @click='shipmessage' data-id="${this.shipnamearr[i].name}">
                           ${this.shipnamearr[i].num}
                        </div>
                        
                        
                  </div>`,
              offset: new AMap.Pixel(-15, -20),
            });
            marker.on("click", (mapEvent) => {
              console.log(mapEvent.target.dom.getElementsByClassName("marker")[0].getAttribute("data-id"));
              this.$router.push({ name: "about", params: { name: mapEvent.target.dom.getElementsByClassName("marker")[0].getAttribute("data-id") } });
            });
            marker.on("mouseover", (mapEvent) => {
              if (this.infoWindow) {
                this.infoWindow.close();
              }
              var info = [];
              info.push(`<div style="color:#000;font-size:10px">${mapEvent.target.dom.getElementsByClassName("marker")[0].getAttribute("data-id")}</div>`);
              this.infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(-3, -16),
                content: info.join(""), //使用默认信息窗体框样式，显示信息内容
              });
              this.infoWindow.open(this.map, mapEvent.target.getPosition());
              console.log(mapEvent.target.dom.getElementsByClassName("marker")[0].getAttribute("data-id"));
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
      console.log(this.search);
    },
  },
  mounted() {
    this.lineEcharts();
    this.initAMap();
    console.log("船舶信息", this.ship);
    console.log("船舶跟踪", this.shiptracking);
    console.log("货物跟踪", this.freighttrack);
    this.datasearch();
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
  height: 1080px;
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
  top: 60px;
  /* padding:0 24px; */
}

.main > div {
  display: inline-block;
}

.leftbox {
  width: 380px;
  height: 329px;
  flex-shrink: 0;

  border: 1px solid #98e7fc;
  background-color: #031027;

  line-height: 1;
  background: rgba(0, 0, 0, 0.2) none repeat scroll !important;
}

.maincenter {
  align-self: flex-end;
  /* background-image: url(../assets/ditu.png); */
  width: 1062px;
  height: 674px;
  flex-shrink: 0;
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

.shiplegend > div {
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
  font-size: 14px;
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
  right: 41px;
  top: 139px;
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

.my_marker {
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

<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.container-box {
  flex-shrink: 0;
  width: 378px;
  height: 714px;
  background: rgba(0, 0, 0, 0.2) none repeat scroll !important;
  border: 1px solid #98e7fc;
  box-sizing: border-box;
}
.title {
  margin: 20px 16px;
  width: 348px;
  height: 32px;
  background-color: #2FBAFF3F;
  display: flex;
  align-items: center;
}
</style>
