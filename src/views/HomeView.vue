<template>
  <div class="home">
    <div class="head">
      <div class="headtitle">货运管理平台</div>
      <div class="headtext">
        <span class="headtime">
          2023-12-16
        </span>
        <span class="headtime" style="margin-left: 25px;">
          周四
        </span>
        <span class="headtime">
          上午10:15
        </span>
      </div>
    </div>
    <div class="main">
      <div class="mainleft">
        <div class="leftbox" style="background: #031027;position: relative;">
          <div class="leftboxtitle">
            <div class="arrows">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%;">
            </div>
            <div class="lefttext">
              货船统计
            </div>
          </div>
          <div class="shiplegend">
            <div>
              <div style="background-color: #5b8ff9;width: 8px;height: 8px;display: inline-block;"> </div>
              <div style="display: inline-block;margin-left: 5px;">锚泊</div>
            </div>
            <div style="margin-left:30px ;">
              <div style="background-color: #4EC09A;width: 8px;height: 8px;display: inline-block;"> </div>
              <div style="display: inline-block;margin-left: 5px;">靠泊</div>
            </div>
            <div style="margin-left:30px ;">
              <div style="background-color:  #CBD1D7;;width: 8px;height: 8px;display: inline-block;"> </div>
              <div style="display: inline-block;margin-left: 5px;">在航</div>
            </div>
            <div style="margin-left:30px ;">
              <div style="background-color: #D3AA22;width: 8px;height: 8px;display: inline-block;"> </div>
              <div style="display: inline-block;margin-left: 5px;">其他</div>
            </div>
          </div>
          <div id="shipbar" :style="myChartStyle" style="margin-left: 15px;">

          </div>
        </div>
        <div class="leftbotbox" style="background: #031027;position: relative;">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%;">
            </div>
            <div class="lefttext">
              货船信息
            </div>
          </div>
          <div class="shipsearch">
            <div class="searchdiv">
              <div class="searchimg"><img src="../assets/search.svg" alt=""></div>
              <!-- <div class="searchtext">请输入船名</div> -->
              <input type="text" placeholder="请输入船名" v-model="search" class="searchtext">
            </div>
            <div class="searchbutton" @click="shipsearch">
              搜索
            </div>
          </div>
          <div class="listbox">
            <div class="listtitle">
              <div class="listone listson">
                集装箱编号
              </div>
              <div class="listtwo listson">
                状态
              </div>
              <div class="listthree listson">
                操作
              </div>
            </div>

            <div style="overflow-x:hidden;height: 200px;position: absolute;width: 332px;">
              <div class="shipmessage" style="top: 0px;" v-for="(item, index) in this.shipnamearr" :key=index>
                <div class="messageson" style="left: 33px;">
                  {{ item.name }}
                </div>
                <div class="messageson" style="left: 196px;color: red;">

                </div>
                <div class="messageson underline" style="left: 271px;" @click="look" :data-v=item.name>
                  查看
                </div>
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
        <div class="leftbox" style="background: #031027;">
          <div class="leftboxtitle">
            <div class="arrows">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%;">
            </div>
            <div class="lefttext">
              新闻咨询
            </div>
          </div>
          <div class="searchdiv " style="margin-left: 24px;margin-top: 30px;">
            <div style="width: 332px;height: 56px;" class="active">
              <div style="margin: 10px 15px 2.53px 15px ;position: absolute;width: 302px;font-size: 14px;opacity: 0.9;">
                <div>
                  <div style="width: 100%;position: absolute;left: 0;top: 0;">
                    台湾国际港口升级高雄码头设施
                  </div>
                  <div style="position: absolute;left: 0;top: 23px;">
                    2024年3月22日
                  </div>
                  <div style="position: absolute;right: 0;top: 11px;" class="underline">
                    详情
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 332px;height: 56px;">
              <div style="margin: 10px 15px 2.53px 15px ;position: absolute;width: 302px;font-size: 14px;opacity: 0.9;">
                <div>
                  <div style="width: 100%;position: absolute;left: 0;top: 0;">
                    台湾国际港口升级高雄码头设施
                  </div>
                  <div style="position: absolute;left: 0;top: 23px;">
                    2024年3月22日
                  </div>
                  <div style="position: absolute;right: 0;top: 11px;" class="underline">
                    详情
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 332px;height: 56px;" class="active">
              <div style="margin: 10px 15px 2.53px 15px ;position: absolute;width: 302px;font-size: 14px;opacity: 0.9;">
                <div>
                  <div style="width: 100%;position: absolute;left: 0;top: 0;">
                    台湾国际港口升级高雄码头设施
                  </div>
                  <div style="position: absolute;left: 0;top: 23px;">
                    2024年3月22日
                  </div>
                  <div style="position: absolute;right: 0;top: 11px;" class="underline">
                    详情
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 332px;height: 56px;">
              <div style="margin: 10px 15px 2.53px 15px ;position: absolute;width: 302px;font-size: 14px;opacity: 0.9;">
                <div>
                  <div style="width: 100%;position: absolute;left: 0;top: 0;">
                    台湾国际港口升级高雄码头设施
                  </div>
                  <div style="position: absolute;left: 0;top: 23px;">
                    2024年3月22日
                  </div>
                  <div style="position: absolute;right: 0;top: 11px;" class="underline">
                    详情
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="leftbotbox">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%;">
            </div>
            <div class="lefttext">
              天气预报
            </div>
          </div>
          <div class="listbox">
            <div class="listtitle">
              <div class="listone listson" style="left: 28px;">
                预报时效（小时）
              </div>
              <div class="listtwo listson" style="left: 156px;">
                天气现象
              </div>
              <div class="listthree listson" style="left: 256px;">
                风向
              </div>
            </div>
            <div class="shipmessage" style="top: 0px;">
              <div class="messageson" style="left: 28px;">
                00-12
              </div>
              <div class="messageson" style="left: 156px;">
                阴
              </div>
              <div class="messageson underline" style="left: 256px;">
                南风
              </div>
            </div>
            <div class="shipmessage active">
              <div class="messageson" style="left: 28px;">
                12-24
              </div>
              <div class="messageson" style="left: 156px;">
                阴
              </div>
              <div class="messageson underline" style="left: 256px;">
                东北风
              </div>
            </div>
            <div class="shipmessage" style="top: 0px;">
              <div class="messageson" style="left: 28px;">
                00-12
              </div>
              <div class="messageson" style="left: 156px;">
                阴
              </div>
              <div class="messageson underline" style="left: 256px;">
                南风
              </div>
            </div>
            <div class="shipmessage active">
              <div class="messageson" style="left: 28px;">
                12-24
              </div>
              <div class="messageson" style="left: 156px;">
                阴
              </div>
              <div class="messageson underline" style="left: 256px;">
                东北风
              </div>
            </div>
            <div class="shipmessage" style="top: 0px;">
              <div class="messageson" style="left: 28px;">
                00-12
              </div>
              <div class="messageson" style="left: 156px;">
                阴
              </div>
              <div class="messageson underline" style="left: 256px;">
                南风
              </div>
            </div>
            <div class="shipmessage active">
              <div class="messageson" style="left: 28px;">
                12-24
              </div>
              <div class="messageson" style="left: 156px;;">
                阴
              </div>
              <div class="messageson underline" style="left: 256px;">
                东北风
              </div>
            </div>
            <div class="shipmessage" style="top: 0px;">
              <div class="messageson" style="left: 28px;">
                00-12
              </div>
              <div class="messageson" style="left: 156px;">
                阴
              </div>
              <div class="messageson underline" style="left: 256px;">
                南风
              </div>
            </div>
            <div class="shipmessage active">
              <div class="messageson" style="left: 28px;">
                12-24
              </div>
              <div class="messageson" style="left: 156px;">
                阴
              </div>
              <div class="messageson underline" style="left: 256px;">
                东北风
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="ftleft">
        <div class="leftboxtitle">
          <div class="arrows1">
            <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%;">
          </div>
          <div class="lefttext">
            报警信息
          </div>
        </div>

        <div class="listtitle" style="width: 876px;height: 32px;margin-left: 24px;position: relative;">
          <div class="listone listson" style="left: 33px;">
            序号
          </div>
          <div class="listtwo listson" style="left: 98px;">
            所属货船
          </div>
          <div class="listthree listson" style="left: 234px;">
            报警内容
          </div>
          <div class="listthree listson" style="left:737px ;">
            报警属性
          </div>
          <div class="listthree listson" style="left: 809px;">
            操作
          </div>
        </div>
        <div>
          <div style="width: 876px;height: 32px;margin-left: 24px;position: relative;">
            <div class="listone listson" style="left: 33px;">
              1
            </div>
            <div class="listtwo listson" style="left: 98px;">
              SHSM1L797700
            </div>
            <div class="listthree listson" style="left: 234px;">
              "冷藏舱温度异常！当前温度超出安全范围，请立即检查并调整。"
            </div>
            <div class="listthree listson" style="left:737px ;">
              温度
            </div>
            <div class="listthree listson underline" style="left: 809px;">
              查看
            </div>
          </div>
          <div style="width: 876px;height: 32px;margin-left: 24px;position: relative;" class="active">
            <div class="listone listson" style="left: 33px;">
              2
            </div>
            <div class="listtwo listson" style="left: 98px;">
              SHSM1L797701
            </div>
            <div class="listthree listson" style="left: 234px;">
              "湿度异常报警！冷藏舱湿度超出设定范围，请及时处理以避免货物受潮。"
            </div>
            <div class="listthree listson" style="left:737px ;">
              湿度
            </div>
            <div class="listthree listson underline" style="left: 809px;">
              查看
            </div>
          </div>
          <div style="width: 876px;height: 32px;margin-left: 24px;position: relative;">
            <div class="listone listson" style="left: 33px;">
              3
            </div>
            <div class="listtwo listson" style="left: 98px;">
              SHSM1L797702
            </div>
            <div class="listthree listson" style="left: 234px;">
              "位置异常报警！集装箱位置偏离计划路线，请尽快核实并调整航行方向。"
            </div>
            <div class="listthree listson" style="left:737px ;">
              位置
            </div>
            <div class="listthree listson underline" style="left: 809px;">
              查看
            </div>
          </div>
          <div style="width: 876px;height: 32px;margin-left: 24px;position: relative;" class="active">
            <div class="listone listson" style="left: 33px;">
              4
            </div>
            <div class="listtwo listson" style="left: 98px;">
              SHSM1L797701
            </div>
            <div class="listthree listson" style="left: 234px;">
              "通风系统故障报警！集装箱内通风系统发生故障，请立即检查并修复。"
            </div>
            <div class="listthree listson" style="left:737px ;">
              通风
            </div>
            <div class="listthree listson underline" style="left: 809px;">
              查看
            </div>
          </div>
          <div style="width: 876px;height: 32px;margin-left: 24px;position: relative;">
            <div class="listone listson" style="left: 33px;">
              5
            </div>
            <div class="listtwo listson" style="left: 98px;">
              SHSM1L797702
            </div>
            <div class="listthree listson" style="left: 234px;">
              "供电系统故障！冷藏设备停止运行，请立即检查供电系统并采取应急措施。"
            </div>
            <div class="listthree listson" style="left:737px ;">
              供电
            </div>
            <div class="listthree listson underline" style="left: 809px;">
              查看
            </div>
          </div>
        </div>

      </div>
      <div>

      </div>
      <div class="ftright">
        <div class="leftboxtitle">
          <div class="arrows1">
            <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%;">
          </div>
          <div class="lefttext">
            传感器异常数量
          </div>
        </div>
        <div :style="myChartStyle1" id="line">

        </div>
        <div class="linespan">
          <div>
            <div style="background-color: #5B8FF9;;width: 8px;height: 8px;display: inline-block;"> </div>
            <div style="display: inline-block;margin-left: 5px;">传感器</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import AMapLoader from '@amap/amap-jsapi-loader';
import * as echarts from 'echarts';
import ship from '../static/船舶.json'
import shiptracking from '../static/船舶跟踪.json'
import freighttrack from '../static/货物跟踪.json'
export default {
  watch: {
    '$route': 'reloadChartsAndMap'
  },
  name: "map-view",
  data() {
    return {
      xData: ["锚泊", "靠泊", "在航", "其他"], //横坐标
      yData: [750, 900, 600, 250], //数据
      xData1: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], //横坐标
      yData1: [600, 300, 200, 350, 250, 650, 750, 450, 750, 550, 750, 650], //数据
      myChartStyle: { float: "left", width: "95%", height: "290px" }, //图表样式
      myChartStyle1: { float: "left", width: "90%", height: "200px" },//图表样式
      ship: ship,
      shiptracking: shiptracking,
      freighttrack: freighttrack,
      shipnamearr: [],
      search: '',
      thisshop: ''
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
        this.shipnamearr.push({ name: item.nameEn, num: num, location: [item.lon, item.lat] })
      });


      console.log(this.shipnamearr);

    },
    initEcharts() {
      // 基本柱状图
      const option = {
        // legend: { data: ["锚泊", "靠泊", "在航", "其他"] },
        xAxis: {
          type: 'category',
          data: ["锚泊", "靠泊", "在航", "其他"],

          axisLabel: {//x轴文字的配置
            show: true,
            textStyle: {
              color: "#fff",
            }
          }
        },
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        yAxis: {
          min: 0,
          max: 1000,
          interval: 250,

          axisLabel: {//x轴文字的配置
            show: true,
            textStyle: {
              color: "#fff",
            }
          }
        },
        series: [

          {
            name: '',
            type: 'bar',
            data: [750, 950, 550, 250],
            //设置柱子的宽度
            barWidth: 30,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['#5AD8A6', '#5B8FF9', '#ECECEC', '#F6BD16'];
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          },






        ]
      };
      const myChart = echarts.init(document.getElementById("shipbar"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    lineEcharts() {
      const option = {
        xAxis: {

          axisLine: {
            lineStyle: {
              color: "#ffffff",
            },
            textStyle: {
              color: '#ccc'
            }

          },
          type: 'category',
          boundaryGap: true,
          data: this.xData1,
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '6%',
          top: '8%',
          containLabel: true
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#f7f7f7",
            },
            textStyle: {
              color: '#ccc'
            }

          },
          min: 0,
          max: 1000,
          interval: 250,

          type: 'value'
        },
        series: [
          {
            data: this.yData1,
            type: 'line',
            areaStyle: {},
            symbol: 'none'
          }
        ]
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
              position: this.shipnamearr[i].location,                                        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              map: this.map,
              content: `
                  <div class="my_marker" style>
                        <div class="marker" style="color:#fff;background:#0060B5 ;border-radius:50%;height:22px;width:22px;font-size:10px;  text-align: center;line-height:22px;" @click='shipmessage' data-id="${this.shipnamearr[i].name}">
                           ${this.shipnamearr[i].num}
                        </div>
                        
                        
                  </div>`,
              offset: new AMap.Pixel(-15, -20),

            });
            marker.on('click', mapEvent => {
              console.log(mapEvent.target.dom.getElementsByClassName('marker')[0].getAttribute('data-id'))
              this.$router.push({ name: 'about', params: { name: mapEvent.target.dom.getElementsByClassName('marker')[0].getAttribute('data-id') } })
            })
            marker.on('mouseover', mapEvent => {
              if (this.infoWindow) {
                this.infoWindow.close();
              }
              var info = []
              info.push(`<div style="color:#000;font-size:10px">${mapEvent.target.dom.getElementsByClassName('marker')[0].getAttribute('data-id')}</div>`)
              this.infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(-3, -16),
                content: info.join("")//使用默认信息窗体框样式，显示信息内容
              })
              this.infoWindow.open(this.map, mapEvent.target.getPosition())
              console.log(mapEvent.target.dom.getElementsByClassName('marker')[0].getAttribute('data-id'));

            })
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
    look(e) {
      console.log(e.target.dataset.v);
      this.$router.push({ name: 'about', params: { name: e.target.dataset.v } })
    },
    // showInfoWindow(shipName, lnglat) {
    //   const infoWindow = new AMap.InfoWindow({
    //     content: `
    //       <div class="info-window">
    //         <h3>${shipName}</h3>
    //         <p>其他相关信息...</p>
    //       </div>
    //     `,
    //     position: lnglat,
    //     offset: new AMap.Pixel(0, -30) // 设置信息窗体相对于标点的偏移量，使其不会覆盖标点
    //   });
    //   infoWindow.open(this.map);
    // }
    // shipmessage(e){
    //   console.log(e.target.dataset.id);
    // }

  },
  mounted() {
    this.initEcharts();
    this.lineEcharts();
    this.initAMap();
    console.log("船舶信息", this.ship);
    console.log("船舶跟踪", this.shiptracking);
    console.log("货物跟踪", this.freighttrack);
    this.datasearch()
  },
  unmounted() {
    this.map?.destroy();
  },
  beforeDestroy() {
    // 销毁地图实例
    if (this.map) {
      this.map.destroy();
    }
  }


}
</script>
<style scoped>
.home {
  position: relative;
  overflow: hidden;
  background-color: #1E6BA3;
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

.headtext {
  padding-top: 5px;
  text-align: center;
}

.headtime {
  color: #FFF;
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

.main>div {
  display: inline-block;
}

.leftbox {
  width: 380px;
  height: 329px;
  flex-shrink: 0;

  border: 1px solid #98E7FC;
  background-color: #031027;

  line-height: 1;
  background: rgba(0, 0, 0, 0.2) none repeat scroll !important;
}

.maincenter {
  /* background-image: url(../assets/ditu.png); */
  width: 1062px;
  height: 674px;
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
  border: 1px solid #98E7FC;
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
  background: linear-gradient(270deg, rgba(47, 186, 255, 0.00) 0%, rgba(77, 210, 255, 0.80) 63.77%, rgba(84, 216, 255, 0.80) 86.69%, rgba(92, 222, 255, 0.00) 100%);
  margin: 16px 16px 16px 16px;
  position: relative;

}

.lefttext {
  position: absolute;
  color: #FFF;
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
  color: #FFF;
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
  background-color: #15517A;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  line-height: 30px;
  color: #FFF;

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
  stroke: rgba(255, 255, 255, 0.00);

}

.listson {
  display: inline-block;
  position: absolute;
  top: 6px;
  color: #FFF;
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
  border: 1px solid #98E7FC;



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
  border: 1px solid #98E7FC;


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
  background-color: #0060B5;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 5px
}

.circletext {
  line-height: 22px;
}

.marker {

  height: 22px;
  width: 22px;
}

.my_marker {}

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