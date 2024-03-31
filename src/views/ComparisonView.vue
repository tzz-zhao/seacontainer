<template>
    <div class="comparison">
        <div class="header">
            <div class="headertitle">コンテナ監視システム</div>
            <div class="headertext">
                <span class="headtime">
                    {{ date }}
                </span>
                <span class="headtime" style="margin-left: 25px;">
                    {{ week }}
                </span>
                <span class="headtime">
                    {{ time }}
                </span>
            </div>
            <div><img src="../assets/return.svg"
                    style="width: 17px;height: 17px;position: absolute;top: -4px;cursor:pointer" /><span @click="back"
                    style="position: absolute;left: 20px;width: 40px;top: -4px;cursor:pointer">戻る</span></div>
        </div>
    </div>
</template>
<script>

export default ({
    data() {
        return {

        }
    },
    methods:{
        back(){
            this.$router.push('/conter')
        }
    }
})
</script>

<style scoped>
.comparison{
    background-color: #1E6BA3;
    height: 100vh;
    width: 100%;
}
.header {
    background-image: url(../assets/编组\ 3.png);
    background-size: 100% 100%;
    width: 100%;
    height: 80px;
    position: relative;
    top: 0;
}

.headertitle {
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

.headertext {
    padding-top: 5px;
    text-align: center;
}

.headertime {
    color: #FFF;
    font-family: "Microsoft YaHei";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
}

.header>div:nth-child(3) {
    position: absolute;
    top: 40%;
    left: 2%;
    cursor: pointer;
}

.header>div:nth-child(3)>img {
    width: 13.5px;
    height: 9.75px;
    margin-right: 10px;
}

.header>div:nth-child(3)>span {
    width: 30px;
    height: 18px;
    font-family: Microsoft YaHei;
    font-size: 14px;
    font-weight: 700;
    line-height: 18.48px;
    letter-spacing: 2px;
    text-align: left;
    color: white
}
</style>