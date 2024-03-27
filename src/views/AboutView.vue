<template>
  <div class="home">
    <div class="head">
      <div class="back" @click="back">
        <div class="backimg">
          <img src="../assets/return.svg" alt="">
        </div>
        <div class="backtext">
          返回
        </div>
      </div>
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
      
       
        <div class="leftbox" style="background: #031027;position: relative;">
          <div class="leftboxtitle">
            <div class="arrows1">
              <img src="../assets/矩形备份 8.svg" alt="" style="width: 100%;">
            </div>
            <div class="lefttext">
              集装箱信息
            </div>
          </div>
          <div class="shipsearch">
            <div class="searchdiv">
              <div class="searchimg"><img src="../assets/search.svg" alt=""></div>
              <!-- <div class="searchtext">请输入船名</div> -->
              <input type="text" placeholder="请输入集装箱编号" v-model="search" class="searchtext">
            </div>
            <div class="searchbutton" @click="containersearch">
              搜索
            </div>
          </div>
          <div class="listbox">
            <div class="listtitle">
              <div class="listone listson">
                集装箱编号
              </div>
              <div class="listtwo listson">
               
              </div>
              <div class="listthree listson">
                操作
              </div>
            </div>
            
          <div style="overflow-x:hidden;height: 200px;position: absolute;width: 332px;">
            <div class="shipmessage" style="top: 0px;" v-for="(item,index) in this.dataarr" :key=index>
              <div class="messageson" style="left: 33px;">
                {{ item.billNumber }}
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
  </div>
</template>
<script>
// import AMapLoader from '@amap/amap-jsapi-loader';
import ship from '../static/船舶.json'
import shiptracking from '../static/船舶跟踪.json'
import freighttrack from '../static/货物跟踪.json'
export default{
  data(){
    return{
      name:'',
      ship:ship,
      shiptracking:shiptracking,
      freighttrack:freighttrack,
      dataarr:[],
      search:''
    }
  },
  methods:{
    back(){
      this.$router.replace('/')
    },
    namematching(){
      this.freighttrack.forEach((item) => {
        if(item.vessel==this.name){
          this.dataarr.push(item)
        }
      });
      console.log(this.dataarr);
    },
    containersearch(){
      console.log(this.search);
    }
  },
  mounted(){
      console.log(this.$route.params.name);
      this.name=this.$route.params.name
      this.namematching()
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
.back{
 position: absolute;
 top: 28px;
 left: 36px;
 width: 80px;
 height: 22px;
}
.back>div{
  display: inline-block;
}
.backimg{
height: 18px;
position: absolute;
top: 2px;
}
.backtext{
  position: absolute;
 left: 26px;
}
.leftbox{
  width: 380px;
height: 714px;
}
.leftboxtitle {
  width: 348px;
  height: 30px;
  flex-shrink: 0;
  /* margin-top: 16px */
  background: linear-gradient(270deg, rgba(47, 186, 255, 0.00) 0%, rgba(77, 210, 255, 0.80) 63.77%, rgba(84, 216, 255, 0.80) 86.69%, rgba(92, 222, 255, 0.00) 100%);
  margin: 16px 16px 16px 16px;
  position: relative;
top: 16px;
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

.arrows1 {
  width: 8px;
  height: 12px;
  position: absolute;
  top: 5px;
  left: 12px;

}
.main{
  position: absolute;
  top: 60px;
  padding:  0 24px;
}
.shipsearch {
  width: 332px;
  height: 30px;
  margin-left: 22px;
  border: 0.8px solid rgba(255, 255, 255, 0.36);
  background: rgba(255, 255, 255, 0.12);
  position: relative;
  top: 16px;
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
  top: 16px;
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

</style>