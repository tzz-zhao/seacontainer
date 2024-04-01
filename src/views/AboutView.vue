<template>
  <div class="home">
    <HeadersBox />
    <div style="cursor: pointer; z-index: 999" class="go-back" @click="back">
      <div
        style="display: inline-block; position: absolute; left: 20px; top: 30px;display: flex;align-items: center;justify-content: center;">
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
    <div class="main">
      <div class="container-box">
        <div class="leftboxtitle">
          <div class="arrows1">
            <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%" />
          </div>
          <div class="lefttext">コンテナ情報</div>
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
            <input v-model="search" type="text" placeholder="コンテナ番号を入力してください" class="searchtext" />
          </div>
          <div class="searchbutton" @click="shipsearch">検索</div>
        </div>
        <div class="listbox">
          <div class="listtitle">
            <div class="listson">コンテナ番号</div>
            <div class="listson">状態</div>
            <div class="listson">操作</div>
          </div>
          <div>
            <div v-for="(item, index) in containerarr" :key="index" class="shipmessage">
              <div class="messageson">
                {{ item.number }}
              </div>
              <div class="messageson" :style="getColor(item)"
                v-text="item.status === 0 ? '正常' : item.status === 1 ? '警告 ' : '异常'"></div>
              <div class="messageson underline" style="cursor: pointer" :data-v="item.number" @click="gosensor">確認</div>
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
          <div class="lefttext">船舶情報</div>
        </div>
        <div class="title">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="18" viewBox="0 0 32 18" fill="none">
              <path
                d="M1.51864 12.78C1.01243 14.535 0.506215 16.245 0 18H28.6011C29.1435 15.345 30.3367 12.735 32 10.215C21.948 12.51 11.7514 13.05 1.51864 12.78ZM17.1028 13.86C17.2836 13.86 17.3921 14.04 17.3921 14.22C17.3921 14.445 17.2475 14.58 17.1028 14.58C16.922 14.58 16.8136 14.4 16.8136 14.22C16.8136 14.04 16.922 13.86 17.1028 13.86ZM21.2249 8.235H22.7797C22.9243 8.235 23.0328 8.37 23.0328 8.55V10.215C23.0328 10.395 22.9243 10.53 22.7797 10.53H21.2249C21.0802 10.53 20.9718 10.395 20.9718 10.215V8.55C20.9718 8.37 21.0802 8.235 21.2249 8.235ZM4.80904 8.325H6.36384C6.47232 8.325 6.54463 8.415 6.54463 8.55V9.855C6.54463 9.99 6.47232 10.08 6.36384 10.08H4.80904C4.70056 10.08 4.62825 9.99 4.62825 9.855V8.55C4.62825 8.46 4.70056 8.325 4.80904 8.325ZM7.12316 8.325H8.67797C8.78644 8.325 8.85876 8.415 8.85876 8.55V9.855C8.85876 9.99 8.78644 10.08 8.67797 10.08H7.12316C7.01469 10.08 6.94237 9.99 6.94237 9.855V8.55C6.94237 8.46 7.05085 8.325 7.12316 8.325ZM9.54576 8.325H11.1006C11.209 8.325 11.2814 8.415 11.2814 8.55V9.855C11.2814 9.99 11.209 10.08 11.1006 10.08H9.54576C9.43729 10.08 9.36497 9.99 9.36497 9.855V8.55C9.32881 8.46 9.43729 8.325 9.54576 8.325ZM14.2102 8.505C14.2463 8.505 14.3186 8.55 14.3548 8.55C14.391 8.595 14.391 8.64 14.391 8.73V11.745C14.391 11.79 14.3548 11.88 14.3548 11.88C14.2825 11.97 14.2463 11.97 14.2102 11.97H13.0893C13.0531 11.97 12.9808 11.925 12.9446 11.925C12.9085 11.88 12.9085 11.835 12.9085 11.79V8.775C12.9085 8.73 12.9446 8.64 12.9446 8.595C12.9808 8.55 13.0169 8.55 13.0893 8.55H14.2102V8.505ZM16.4158 8.235H17.9706C18.1153 8.235 18.2237 8.37 18.2237 8.55V10.215C18.2237 10.395 18.1153 10.53 17.9706 10.53H16.4158C16.2712 10.53 16.1627 10.395 16.1627 10.215V8.55C16.1627 8.37 16.2712 8.235 16.4158 8.235ZM18.8384 8.235H20.4294C20.574 8.235 20.6825 8.37 20.6825 8.55V10.215C20.6825 10.395 20.574 10.53 20.4294 10.53H18.8746C18.7299 10.53 18.6215 10.395 18.6215 10.215V8.55C18.5853 8.37 18.6938 8.235 18.8384 8.235ZM20.0678 13.86C20.2486 13.86 20.3571 14.04 20.3571 14.22C20.3571 14.445 20.2124 14.58 20.0678 14.58C19.887 14.58 19.7785 14.4 19.7785 14.22C19.7785 14.04 19.887 13.86 20.0678 13.86ZM18.6215 13.86C18.8023 13.86 18.9107 14.04 18.9107 14.22C18.9107 14.445 18.7661 14.58 18.6215 14.58C18.4407 14.58 18.3322 14.4 18.3322 14.22C18.3322 14.04 18.4768 13.86 18.6215 13.86ZM2.78418 6.615H11.2452V4.365H11.0644V3.465L10.3051 0H11.896L13.1616 3.105H19.7785V4.365H19.0554L18.5853 6.615H26.5401V8.235H26.4678L26.7209 9.09C27.5164 9 28.3119 8.865 29.1073 8.685C29.9028 8.505 30.6983 8.325 31.4938 8.1L31.6384 8.055V9.855L31.4215 9.9V8.37C31.096 8.46 30.7706 8.55 30.4814 8.64V10.08L30.2644 10.125V8.685C29.939 8.775 29.6497 8.82 29.3243 8.91V10.305L29.1073 10.35V8.955C28.7819 9 28.4927 9.09 28.1672 9.135V10.53L27.9503 10.575V9.18C27.5887 9.225 27.2271 9.315 26.8294 9.36L27.2271 10.71C27.0102 10.755 26.8294 10.8 26.6124 10.8L26.3232 9.81L26.1785 10.89L25.9616 10.935L26.2147 9.315L25.9254 8.28H23.9006V11.295C20.8271 11.745 17.7537 12.015 14.6441 12.195C14.7164 12.105 14.7525 11.97 14.7525 11.79V8.775C14.7525 8.595 14.7164 8.46 14.6079 8.37C14.5356 8.28 14.391 8.19 14.2825 8.19H13.1616C13.0169 8.19 12.9085 8.235 12.8362 8.37C12.7638 8.46 12.6915 8.64 12.6915 8.775V11.79C12.6915 11.97 12.7277 12.105 12.8362 12.195L12.9085 12.285C10.0158 12.42 7.12316 12.465 4.19435 12.42H3.65198C3.25424 12.42 2.8565 12.42 2.45876 12.375L3.32655 8.28H2.92881V6.615H2.78418ZM12.113 6.615H13.7401V4.365H12.113V6.615ZM14.391 6.615H16.1627V4.365H14.391V6.615ZM16.8136 6.615H17.9706L18.4407 4.365H16.8136V6.615Z"
                :fill="theme === 'black' ? '#fff' : '#36366f'" />
            </svg>
            <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;display: inline-block;"
              :title="receive">船舶名：{{ this.receive }}</span>
          </div>
          <span>移動</span>
        </div>
        <div class="titleSec">
          <div>
            <span>{{ Trajectoryinformation?.polName }}</span>
            <span>ETD:{{ Trajectorydata.receipt?.atd }}</span>
          </div>
          <div>
            <img src="../assets/Group 39.svg" />
          </div>
          <div>
            <span>{{ Trajectoryinformation.podName }}</span>
            <span>ETA: {{ Trajectorydata.delivery?.ata }}</span>
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
            <span>起运港：{{ Trajectorydata.receipt?.name }}</span>
          </div>
          <div>
            <div>
              <div v-for="(item, index) in this.Trajectorydata.status" :key="index">
                <div>{{ item.descriptionCn }}</div>
                <div>{{ item.eventTime }}</div>
              </div>
            </div>
          </div>
          <div>
            <img src="../assets/Check.svg" alt="" />
            <span>到达港：{{ Trajectorydata.delivery?.name }}</span>
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
import A05 from "../static/定位563201600.json";
import locationdata from '../static/定位.json'
import W178 from "../static/定位636021814.json";
// import proj4 from 'proj4';
import { convertToBD09 } from "../static/经纬切换";
import HeadersBox from "../components/Headers.vue";
import { mapState } from "vuex";
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
      Trajectorydata: {},
      A05: A05,
      W178: W178,
      path: [],
      patharr: [],
      start: [],
      end: [],
      locationdata: locationdata,
      msi: '',

    };
  },
  components: {
    HeadersBox,
  },
  computed: {
    ...mapState(["theme"]),
  },
  methods: {
    datatreating() {
      // console.log(A05,"船舶路线");
      // this.A05.forEach((item) => {
      //   const latDecimal = item.lat / 1e6;
      //   const lonDecimal = item.lon / 1e6;
      //   console.log(latDecimal);

      //   const location = convertToBD09(Number(lonDecimal), Number(latDecimal));
      //   this.path.push({ coures: item.course, location: location, posTime: item.posTime });

      // })
      // this.W178.forEach((item, index) => {
      //   const latDecimal = item.lat / 1e6;
      //   const lonDecimal = item.lon / 1e6;
      //   // console.log(latDecimal);

      //   const location = convertToBD09(Number(lonDecimal), Number(latDecimal));

      //   this.path.push({ coures: item.course, location: location, posTime: item.posTime });


      //   if (index == 0) {
      //     this.start.push({ coures: item.course, location: [Number(lonDecimal), Number(latDecimal)], posTime: item.posTime })
      //   }
      //   if (index == this.W178.length - 1) {
      //     this.end.push({ coures: item.course, location: [Number(lonDecimal), Number(latDecimal)], posTime: item.posTime })
      //   }
      // });

      console.log(this.receive, "接收的船名");

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
          this.msi = item.mmsi
        }
      });
      console.log(this.msi, '点击货船的mmsi');

      console.log(this.shipnamearr, "船只数据");
      this.ship.forEach((item) => {
        if (item.nameEn == this.receive) {
          this.Trajectoryinformation = item;
        }
      });
      console.log(this.Trajectoryinformation, "右侧信息");
      console.log(this.locationdata, "所有定位信息");
      this.locationdata.forEach((item) => {
        if (this.msi == item.mmsi) {
          for (let i = 0; i < item.data.length; i++) {
            const latDecimal = item.data[i].lat / 1e6;
            const lonDecimal = item.data[i].lon / 1e6;
            // console.log(latDecimal);

            const location = convertToBD09(Number(lonDecimal), Number(latDecimal));

            this.path.push({ coures: item.data[i].course, location: location, posTime: item.data[i].posTime });


            if (i == 0) {
              this.start.push({ coures: item.data[i].course, location: [Number(lonDecimal), Number(latDecimal)], posTime: item.data[i].posTime })
            }
            if (i == item.data.length - 1) {
              this.end.push({ coures: item.data[i].course, location: [Number(lonDecimal), Number(latDecimal)], posTime: item.data[i].posTime })
            }
          }
        }
      });
      console.log(this.start, this.end);
      console.log(this.path, "船舶路线");
      this.path.forEach((item) => {
        this.patharr.push(item.location);
      });
      this.shiptracking.forEach((item) => {
        if (item.nameEn == this.receive) {
          this.Trajectorydata = item;
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
            lang: "en",
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 2, // 初始化地图级别
            center: [116.397428, 39.90923], // 初始化地图中心点位置
          });
          // console.log("123==>", this.path);
          if (this.patharr.length > 0) {
            this.polyline = new AMap.Polyline({
              path: this.patharr, // 设置轨迹线的坐标点数组
              strokeColor: "#3366FF", // 线颜色
              strokeWeight: 4, // 线宽度
              strokeOpacity: 1, // 线透明度
              strokeStyle: "solid", // 线样式
              showDir: true, // 显示方向箭头
            });
            this.polyline.setMap(this.map);
          }

          // 自动调整地图视野，使整条轨迹可见
          this.map.setFitView(this.polyline);
          console.log(this.start[0]?.location, '开始');
          console.log(this.end[0]?.location, '终点');
          var startMarker = new AMap.Marker({
            position: this.start[0]?.location, // 起点经纬度坐标
            content: `<div style="width:30px;font-size:15px;background:#84AF9B;color">起点<div>`,
            title: '起点', // 起点标识文本
            // offset: new AMap.Pixel(0, 0),
          });
          var endMarker = new AMap.Marker({
            position: this.end[0]?.location, // 终点经纬度坐标
            content: `<div style="width:30px;font-size:15px;background:#84AF9B;">终点<div>`,
            title: '终点',// 终点标识文本
            // offset: new AMap.Pixel(0, -50),
          });
          this.map.add([startMarker, endMarker]);
          for (let i = 0; i < this.shipnamearr.length; i++) {

            var marker = new AMap.Marker({
              position: this.shipnamearr[i]?.location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              map: this.map,

              content: `<img src=${require("../assets/ship.png")} />`,
              offset: new AMap.Pixel(0, -40),
            });

            marker.on("mouseover", (mapEvent) => {
              // if (this.infoWindow) {
              //   this.infoWindow.close();
              // }
              if (mapEvent.originEvent.target.className !== "marker") return;
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
    getColor(item) {
      return {
        color: item.status === 0 ? ((this.theme || "") === "black" ? "#fff" : "#36366f") : item.status === 1 ? "yellow" : "red",
      };
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

.container-box {
  width: 21%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid #98E7FC;
  box-sizing: border-box;
  padding: 0.5% 0.2%;
}

.maincenter {
  width: 55%;
  height: 100%;
}

.leftboxtitle {
  width: 97%;
  height: 30px;
  margin: 0 auto;
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

.searchimg svg {
  width: 18px;
  height: 18px;
}

.searchtext {
  width: 93%;
  height: 26px;
  background: #031027;
  opacity: 0.3;
  color: #fff;
  font-weight: bold;
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

.listbox {
  width: 97%;
  margin: 0 auto;
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
  width: 33%;
  font-size: 14px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shipmessage {
  width: 100%;
  margin: 2% 0;
  display: flex;
  color: #fff;
  font-size: 14px;
  opacity: 0.8;
}

.messageson {
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  opacity: 0.8;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
}

.active {
  background: rgba(255, 255, 255, 0.12);
}

.underline {
  text-decoration: underline;
}

.title {
  width: 94%;
  height: 32px;
  display: flex;
  box-sizing: border-box;
  margin: 3%;
  background-color: #2FBAFF3F;
  color: white;
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: 400;
  justify-content: space-between;
  align-items: center;
}

.title>div {
  display: flex;
  align-items: center;
}

.title>div>span {
  margin-left: 10px;
}

.title>span {
  margin-right: 10px;
}

.titleSec {
  width: 94%;
  margin: 0 3%;
  font-family: Microsoft YaHei;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-bottom:2%;
  border-bottom:1px solid #d0d0d0;
}
.titleSec>div{
  display: flex;
  flex-direction: column;
  color: white;
}
.titleSec>div:nth-child(2){
  margin: 0 1%;
}
.listArticle {
  box-sizing: border-box;
  margin: 3%;
  padding: 0 1%;
  height: 90%;
  overflow: auto;
  color: white;
  font-size: 16px;
}

.listArticle>div:nth-child(1) {
  display: flex;
  align-items: center;
}

.listArticle>div:nth-child(1)>img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-right: 1%;
}

.listArticle>div:nth-child(2) {
  height: 3%;
  border-left: 1px solid #2ce7e7;
  margin-left: 3%;
}

.listArticle>div:nth-child(3) {
  display: flex;
  align-items: center;
}

.listArticle>div:nth-child(3)>img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-right: 1%;
}

.listArticle>div:nth-child(4) {
  border-left: 1px solid #2ce7e7;
  margin-left: 3%;
}

.listArticle>div:nth-child(4)>div {
  padding: 1% 4%;
}

.listArticle>div:nth-child(4)>div>div {
  height: 18px;
  padding: 4% 0;
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
  margin-right: 1%;
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