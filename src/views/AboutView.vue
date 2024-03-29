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
        <div class="back">
          <img src="../assets/return.svg" style="width: 18px; position: absolute; top: 2px;cursor:pointer" /><span @click="back"
            style="font-size: 14px; position: absolute; top: 2px; width: 50px; left: 11px;cursor:pointer">返回</span>
        </div>
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
            <input v-model="search" type="text" placeholder="请输入集装箱编号" class="searchtext" />
          </div>
          <div class="searchbutton" @click="shipsearch">搜索</div>
        </div>
        <div class="listbox">
          <div class="listtitle">
            <div class="listone listson">集装箱编号</div>
            <div class="listtwo listson">状态</div>
            <div class="listthree listson">操作</div>
          </div>

          <div style="overflow-x: hidden; position: absolute; width: 332px; height: 602px">
            <div v-for="(item, index) in containerarr" :key="index" class="shipmessage" style="top: 0px">
              <div class="messageson" style="left: 33px">
                {{ item.number }}
              </div>
              <div class="messageson" style="left: 196px"
                :style="{ color: item.status === 0 ? '#fff' : item.status === 1 ? 'yellow' : 'red' }"
                v-text="item.status === 0 ? '正常' : item.status === 1 ? '警告 ' : '异常'"></div>
              <div class="messageson underline" style="left: 271px; cursor: pointer" :data-v="item.number"
                @click="gosensor">查看</div>
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
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="18" viewBox="0 0 32 18" fill="none">
              <path
                d="M1.51864 12.78C1.01243 14.535 0.506215 16.245 0 18H28.6011C29.1435 15.345 30.3367 12.735 32 10.215C21.948 12.51 11.7514 13.05 1.51864 12.78ZM17.1028 13.86C17.2836 13.86 17.3921 14.04 17.3921 14.22C17.3921 14.445 17.2475 14.58 17.1028 14.58C16.922 14.58 16.8136 14.4 16.8136 14.22C16.8136 14.04 16.922 13.86 17.1028 13.86ZM21.2249 8.235H22.7797C22.9243 8.235 23.0328 8.37 23.0328 8.55V10.215C23.0328 10.395 22.9243 10.53 22.7797 10.53H21.2249C21.0802 10.53 20.9718 10.395 20.9718 10.215V8.55C20.9718 8.37 21.0802 8.235 21.2249 8.235ZM4.80904 8.325H6.36384C6.47232 8.325 6.54463 8.415 6.54463 8.55V9.855C6.54463 9.99 6.47232 10.08 6.36384 10.08H4.80904C4.70056 10.08 4.62825 9.99 4.62825 9.855V8.55C4.62825 8.46 4.70056 8.325 4.80904 8.325ZM7.12316 8.325H8.67797C8.78644 8.325 8.85876 8.415 8.85876 8.55V9.855C8.85876 9.99 8.78644 10.08 8.67797 10.08H7.12316C7.01469 10.08 6.94237 9.99 6.94237 9.855V8.55C6.94237 8.46 7.05085 8.325 7.12316 8.325ZM9.54576 8.325H11.1006C11.209 8.325 11.2814 8.415 11.2814 8.55V9.855C11.2814 9.99 11.209 10.08 11.1006 10.08H9.54576C9.43729 10.08 9.36497 9.99 9.36497 9.855V8.55C9.32881 8.46 9.43729 8.325 9.54576 8.325ZM14.2102 8.505C14.2463 8.505 14.3186 8.55 14.3548 8.55C14.391 8.595 14.391 8.64 14.391 8.73V11.745C14.391 11.79 14.3548 11.88 14.3548 11.88C14.2825 11.97 14.2463 11.97 14.2102 11.97H13.0893C13.0531 11.97 12.9808 11.925 12.9446 11.925C12.9085 11.88 12.9085 11.835 12.9085 11.79V8.775C12.9085 8.73 12.9446 8.64 12.9446 8.595C12.9808 8.55 13.0169 8.55 13.0893 8.55H14.2102V8.505ZM16.4158 8.235H17.9706C18.1153 8.235 18.2237 8.37 18.2237 8.55V10.215C18.2237 10.395 18.1153 10.53 17.9706 10.53H16.4158C16.2712 10.53 16.1627 10.395 16.1627 10.215V8.55C16.1627 8.37 16.2712 8.235 16.4158 8.235ZM18.8384 8.235H20.4294C20.574 8.235 20.6825 8.37 20.6825 8.55V10.215C20.6825 10.395 20.574 10.53 20.4294 10.53H18.8746C18.7299 10.53 18.6215 10.395 18.6215 10.215V8.55C18.5853 8.37 18.6938 8.235 18.8384 8.235ZM20.0678 13.86C20.2486 13.86 20.3571 14.04 20.3571 14.22C20.3571 14.445 20.2124 14.58 20.0678 14.58C19.887 14.58 19.7785 14.4 19.7785 14.22C19.7785 14.04 19.887 13.86 20.0678 13.86ZM18.6215 13.86C18.8023 13.86 18.9107 14.04 18.9107 14.22C18.9107 14.445 18.7661 14.58 18.6215 14.58C18.4407 14.58 18.3322 14.4 18.3322 14.22C18.3322 14.04 18.4768 13.86 18.6215 13.86ZM2.78418 6.615H11.2452V4.365H11.0644V3.465L10.3051 0H11.896L13.1616 3.105H19.7785V4.365H19.0554L18.5853 6.615H26.5401V8.235H26.4678L26.7209 9.09C27.5164 9 28.3119 8.865 29.1073 8.685C29.9028 8.505 30.6983 8.325 31.4938 8.1L31.6384 8.055V9.855L31.4215 9.9V8.37C31.096 8.46 30.7706 8.55 30.4814 8.64V10.08L30.2644 10.125V8.685C29.939 8.775 29.6497 8.82 29.3243 8.91V10.305L29.1073 10.35V8.955C28.7819 9 28.4927 9.09 28.1672 9.135V10.53L27.9503 10.575V9.18C27.5887 9.225 27.2271 9.315 26.8294 9.36L27.2271 10.71C27.0102 10.755 26.8294 10.8 26.6124 10.8L26.3232 9.81L26.1785 10.89L25.9616 10.935L26.2147 9.315L25.9254 8.28H23.9006V11.295C20.8271 11.745 17.7537 12.015 14.6441 12.195C14.7164 12.105 14.7525 11.97 14.7525 11.79V8.775C14.7525 8.595 14.7164 8.46 14.6079 8.37C14.5356 8.28 14.391 8.19 14.2825 8.19H13.1616C13.0169 8.19 12.9085 8.235 12.8362 8.37C12.7638 8.46 12.6915 8.64 12.6915 8.775V11.79C12.6915 11.97 12.7277 12.105 12.8362 12.195L12.9085 12.285C10.0158 12.42 7.12316 12.465 4.19435 12.42H3.65198C3.25424 12.42 2.8565 12.42 2.45876 12.375L3.32655 8.28H2.92881V6.615H2.78418ZM12.113 6.615H13.7401V4.365H12.113V6.615ZM14.391 6.615H16.1627V4.365H14.391V6.615ZM16.8136 6.615H17.9706L18.4407 4.365H16.8136V6.615Z"
                fill="white" />
            </svg>
            <span>船名：{{ this.receive }}</span>
          </div>
          <span>在航</span>
        </div>
        <div class="titleSec">
          <div>
            <span>{{ Trajectoryinformation?.polName }}</span>
            <span>ETD:{{ Trajectoryinformation?.atd }}</span>
          </div>
          <div>
            <img src="../assets/Group 39.svg" />
          </div>
          <div>
            <span>{{ Trajectoryinformation.podName }}</span>
            <span>ETA: {{ Trajectoryinformation.ata }}</span>
          </div>
        </div>
        <div class="listArticle">
          <div>
            <img src="../assets/Check-one.svg" alt="" />
            <span>接货地：{{ Trajectorydata.receipt?.name }}</span>
          </div>
          <div></div>
          <div>
            <img src="../assets/Check-one.svg" alt="" />
            <span>起运港：SHANGHAI</span>
          </div>
          <div>
            <div>
              <div>
                <div>提箱</div>
                <div>2023-12-12 21:00(周一)</div>
              </div>
              <div>
                <div>进场</div>
                <div>2023-12-13 21:00(周二)</div>
              </div>
              <div>
                <div>海放</div>
                <div>2023-12-14 21:00(周三)</div>
              </div>
              <div>
                <div>码放</div>
                <div>2023-12-14 21:00(周三)</div>
              </div>
              <div>
                <div>配载</div>
                <div>2023-12-14 21:00(周三)</div>
              </div>
              <div>
                <div>装货</div>
                <div>2023-12-14 21:00(周三)</div>
              </div>
              <div>
                <div>离开</div>
                <div>2023-12-14 21:00(周三)</div>
              </div>
            </div>
          </div>
          <div>
            <img src="../assets/Check.svg" alt="" />
            <span>起运港：{{ Trajectorydata.delivery?.name }}</span>
          </div>
          <div>
            <div>
              <div>
                <div>到达</div>
                <div>2023-12-12 21:00(周一)</div>
              </div>
              <div>
                <div>停泊</div>
                <div>2023-12-13 21:00(周二)</div>
              </div>
              <div>
                <div>卸货</div>
                <div>2023-12-14 21:00(周三)</div>
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
// import * as echarts from "echarts";
import ship from "../static/船舶.json";
import shiptracking from "../static/船舶跟踪.json";
import freighttrack from "../static/货物跟踪.json";
import containerdata from "../static/集装箱.json";
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
      containerdata: containerdata,
      shipnamearr: [],
      search: "",
      thisshop: "",
      date: "",
      time: "",
      week: "",
      receive: "",
      containerarr: [],
      trackPoints: [
        // [159.457591, 24.336610], // 示例坐标点1
        // [162, 55.90809],  // 示例坐标点2
        // [116.40529, 39.90038],  // 示例坐标点3
        // 添加更多坐标点...
      ],
      polyline: null,
      Trajectoryinformation: {},
      Trajectorydata: {}
    };
  },
  methods: {
    datatreating() {
      console.log(this.receive,"接收的船名");
     
      this.ship.forEach((item) => {
        if (this.receive == item.nameEn) {
          let num = 0;
          for (let i = 0; i < this.freighttrack.length; i++) {
            if (this.freighttrack[i].vessel == item.nameEn) {
              num++;
             
            }
          }
          // this.shipnamearr.push({ name: item.nameEn, num: num, location: [item.lon, item.lat] });
          this.shipnamearr.push({ name: item.nameEn, num: num, location: [item.lon, item.lat], flagName: item.flagName, dest: item.dest, status: item.navStatus });
        } 
      });

      console.log(this.shipnamearr,"船只数据");
      this.ship.forEach((item) => {
        if (item.nameEn == this.receive) {
          this.Trajectoryinformation = item
        }
      })
      console.log(this.Trajectoryinformation, "右侧信息");

      this.shiptracking.forEach((item) => {
        if (item.nameEn == this.receive) {
          this.Trajectorydata = item
        }
      });
      console.log(this.Trajectorydata, "获得的右侧数据");
      this.trackPoints = [];

      const x1 = this.Trajectorydata.receipt?.lon;
      const y1 = this.Trajectorydata.receipt?.lat;
      const x2 = this.Trajectorydata.delivery?.lon;
      const y2 = this.Trajectorydata.delivery?.lat;
      if (x1 && y1) {
        this.trackPoints.push([x1, y1]);
      }
      if (x2 && y2) {
        this.trackPoints.push([x2, y2]);
      }
      this.freighttrack.forEach((item) => {
        if (item.vessel == this.receive) {
          const currentcontainerList = this.containerdata.filter((p) => p.containerNumber == item.containerNumber) || [];
          console.log("当前绑定", currentcontainerList);
          this.containerarr.push({
            number: item.containerNumber,
            status: currentcontainerList.length !== 0 ? currentcontainerList[currentcontainerList?.length - 1]?.status || 0 : 0,
          });
        }
      });

      console.log(this.containerarr, "船只关联货物");
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

    gosensor(e) {
      console.log(e.target.dataset.v);
      this.$router.push({ path: "conter", query: { name: e.target.dataset.v, last: this.receive } });
    },

    
    initAMap() {
      
      // let arr = [[174.10, 24.52], [-123.6, 49.18], [113.474725, 30.692175]];
      AMapLoader.load({
        key: "	0046e0eb262c30e4372c3034d350a6c4", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            lang:'en',
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 2, // 初始化地图级别
            center: [116.397428, 39.90923], // 初始化地图中心点位置
          });
          console.log("123==>", this.trackPoints);
          // if (this.trackPoints.length > 0) {
          //   this.polyline = new AMap.Polyline({
          //     path: this.trackPoints, // 设置轨迹线的坐标点数组
          //     strokeColor: "#3366FF", // 线颜色
          //     strokeWeight: 4, // 线宽度
          //     strokeOpacity: 1, // 线透明度
          //     strokeStyle: "solid", // 线样式
          //     showDir: true, // 显示方向箭头
          //   });
          //   this.polyline.setMap(this.map);
          // }

          // 自动调整地图视野，使整条轨迹可见
          // this.map.setFitView(this.polyline);
          for (let i = 0; i < this.shipnamearr.length; i++) {
            let backgroundColor = this.shipnamearr[i].status == 0 ? '#5ad8a6' : (this.shipnamearr[i].status == 1 ? '#CBD1D7' : (this.shipnamearr[i].status == 5 ? '#5B8FF9' : '#D3AA22'));
            var marker = new AMap.Marker({
              position: this.shipnamearr[i]?.location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              map: this.map,
              content: `<div class="marker" style="color:#fff;background:${backgroundColor} ;border-radius:50%;height:22px;width:22px;font-size:10px;  text-align: center;line-height:22px;color='#fff'" @click='shipmessage' data-id="${this.shipnamearr[i].name}">${this.shipnamearr[i].num} </div> `,
              offset: new AMap.Pixel(0,-15),
            });
         
            marker.on("mouseover", (mapEvent) => {
              // if (this.infoWindow) {
              //   this.infoWindow.close();
              // }
              if (mapEvent.originEvent.target.className !== 'marker') return
              if (this.infoWindow && mapEvent.originEvent.target.dataset.id) {
                this.infoWindow.close();
              }
              var info = [];
              info.push(`<div style="color:#000;font-size:10px">${mapEvent.originEvent.target.dataset.id}</div>`);
              this.infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(11, -9),
                content: info.join(""), //使用默认信息窗体框样式，显示信息内容
              });
              if (mapEvent.originEvent.target.dataset.id) {
                this.infoWindow.open(this.map, mapEvent.target.getPosition());

              }
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
      for (let i = 0; i < this.containerarr.length; i++) {
        if (this.search === this.containerarr[i].number) {
          arr.push(this.containerarr[i]);
          console.log(this.containerarr);
        }
      }

      this.containerarr = arr;
      console.log("search", this.containerarr);
    },
    back() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.receive = this.$route.query.name;
    this.currentTime();
    setInterval(() => {
      this.currentTime();
    }, 500);


    this.datatreating();
    // this.datasearch();
    this.initAMap();
    console.log("船舶信息", this.ship);
    console.log("船舶跟踪", this.shiptracking);
    console.log("集装箱", this.containerdata);
    console.log("货物跟踪", this.freighttrack);
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
  beforeCreate() {
    console.log(this.$route.query.name, "接受信息");
    
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
  height: 774px;
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
  height: 774px;
  background: rgba(0, 0, 0, 0.2) none repeat scroll !important;
  border: 1px solid #98e7fc;
  box-sizing: border-box;
}

.title {
  margin: 20px 16px;
  width: 348px;
  height: 32px;
  background-color: #2fbaff3f;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title>div>span {
  margin: 0 15px;
}

.titleSec {
  width: 348px;
  margin: 20px 16px;
  font-size: 14px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebebeb;
}

.titleSec>div {
  display: flex;
  flex-direction: column;
}

.titleSec>div>img {
  width: 60px;
  height: 8.8px;
  margin: 0 10px;
}

.listArticle {
  box-sizing: border-box;
  margin: 20px 16px;
  padding: 0 15px;
  height: 544px;
  overflow: auto;
}

.listArticle>div:nth-child(1) {
  display: flex;
  align-items: center;
}

.listArticle>div:nth-child(1)>img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-right: 15px;
}

.listArticle>div:nth-child(2) {
  height: 26px;
  border-left: 1px solid #2ce7e7;
  margin-left: 10px;
}

.listArticle>div:nth-child(3) {
  display: flex;
  align-items: center;
}

.listArticle>div:nth-child(3)>img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-right: 15px;
}

.listArticle>div:nth-child(4) {
  border-left: 1px solid #2ce7e7;
  margin-left: 10px;
}

.listArticle>div:nth-child(4)>div {
  margin: 20px 29px;
}

.listArticle>div:nth-child(4)>div>div {
  height: 18px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

.listArticle>div:nth-child(5) {
  display: flex;
  align-items: center;
}

.listArticle>div:nth-child(5)>img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-right: 15px;
}

.listArticle>div:nth-child(6) {
  border-left: 1px solid #d0d0d0;
  margin-left: 10px;
}

.listArticle>div:nth-child(6)>div {
  margin: 20px 29px;
}

.listArticle>div:nth-child(6)>div>div {
  height: 18px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

.back {
  position: absolute;
  left: 30px;
  top: 25px;
}

.amap-marker-content {
        width: 22px!important; /* 设置宽度 */
        height: 22px!important; /* 设置高度 */
    }
//     /deep/ .amap-marker-content {
//     width: 100px;
//     height: 100px;
// }
</style>
