<template>
  <div class="home" :class="theme">
    <div class="head" :class="theme">
      <div class="headtitle">コンテナ監視システム</div>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeadersBox",
  data() {
    return {
      date: "",
      time: "",
      week: "",
    };
  },
  methods: {
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
  },
  computed: {
    ...mapState(["theme"]),
  },
  mounted() {
    this.currentTime();
    setInterval(() => {
      this.currentTime();
    }, 500);
  },
  watch: {
    theme: {
      handler(val) {
        console.log("触发一次CSS动态赋值");
        if(val === 'black'){
          import('../assets/style/blackTheme.css')
        }else{
          import('../assets/style/lightTheme.css')
        }
        // document.body.style =
        // var style = document.createElement("style");

        // 设置type属性
        // style.type = "text/css";

        // console.log(val);
        // 添加CSS规则
        // var cssContent = document.createTextNode(val === "black" ? require('../assets/style/blackTheme.css') :require('../assets/style/light.css') );
        // style.appendChild(cssContent);

        // 将style元素添加到head中
        // document.head.appendChild(style);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style></style>

<style scoped>
.home {
  position: relative;
  overflow: hidden;

  /* color: #ffffff; */
  width: 1920px;
  height: 945px;
  white-space: nowrap; /* 使文本不换行 */
}
.home.light {
  background-color: #eef1fb;
  color: #36366f;
}
.home.black {
  background-color: #0E457B;
  color: #fff;
}

.head {
  /* background-image: url(../assets/编组\ 3.png); */
  width: 1920px;
  height: 80px;
  position: absolute;
  top: 0;
}

.head.light {
  background-image: url("../assets/light.png");
}

.head.black {
  background-image: url(../assets/编组\ 3.png);
}

.headtitle {
  /* color: #fff; */
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
  /* color: #fff; */
  font-family: "Microsoft YaHei";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
}
</style>
