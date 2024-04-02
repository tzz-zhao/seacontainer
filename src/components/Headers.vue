<template>
  <div class="home" :class="themeNow">
    <div class="head" :class="themeNow">
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
      
      
      <el-switch @change="changeHandler" class="el-switch-headers" style="position: absolute; right: 50px; bottom: 0" v-model="themeText" > </el-switch>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HeadersBox",
  data() {
    return {
      date: "",
      time: "",
      week: "",
      themeText: true,
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

      var week = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
      var strDate1 = year + "/" + dateArr[0] + "/" + dateArr[1];
      var date1 = new Date(strDate1);
      let w = week[date1.getDay()];
      this.week = w;
      this.time = strtime;
      this.date = strDate;
    },
    changeHandler(val) {
      if (val) {
        this.$store.commit("updateTheme", "black");
      } else {
        this.$store.commit("updateTheme", "light");
      }
    },

    loadTheme(theme) {
      const themeFileName = theme === "black" ? "blackTheme.css" : "lightTheme.css";
      const themeLink = document.querySelector("link#theme-style");

      if (themeLink) {
        // 如果已经存在主题样式表，则替换
        themeLink.href = `../assets/style/${themeFileName}`;
      } else {
        // 如果不存在主题样式表，则创建
        const newThemeLink = document.createElement("link");
        newThemeLink.rel = "stylesheet";
        newThemeLink.id = "theme-style";
        newThemeLink.href = `../assets/style/${themeFileName}`;
        document.head.appendChild(newThemeLink);
      }
    },
  },
  computed: {
    ...mapGetters(["themeNow"]),
  },
  mounted() {
    this.currentTime();
    setInterval(() => {
      this.currentTime();
    }, 500);
    this.$nextTick(() => {
      console.log(this.themeNow);
      this.themeText = this.themeNow === "black" ? true : false;
      this.loadTheme(this.themeNow);
    });
  },
  watch: {
    themeNow: {
      handler(val) {
        console.log(val);
        this.loadTheme(val);
      },
      deep: true,
      // immediate: true,
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
  width: 100%;
  height: 100vh;
  white-space: nowrap; /* 使文本不换行 */
}
.home.light {
  background-color: #eef1fb;
  color: #36366f;
}
.home.black {
  background-color: #0e457b;
  color: #fff;
}

.head {
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
}

.head.light {
  background-image: url("../assets/light.png");
  background-size: 100% 100%;
}

.head.black {
  background-image: url(../assets/编组\ 3.png);
  background-size: 100% 100%;
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
