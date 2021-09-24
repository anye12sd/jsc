<template>
  <div id="enterpriseScore">
    <div class="bigtit">
      <div class="tag"></div>
      <div>企业评分</div>
    </div>
    <div class="score-box">
      <div class="menu">
        <div :class="active == 0 ? 'active' : ''" @click="swit(0)">
          综合评分
        </div>
        <div :class="active == 1 ? 'active' : ''" @click="swit(1)">
          TOP5排名
        </div>
      </div>
      <div class="enterprise-score" v-if="active == 0">
        <div class="enterprise-score-title">
          <div class="all-enterprise-score">
            <div>评分总企业数</div>
            <div style="font-weight: bold; color: #32C5FF">{{ qyzh_qypf.qys }}</div>
          </div>
          <div class="flex" style="font-size: 14px; margin-top: 12px; text-align: center">
            <div class="flex-1" style="position: relative; cursor: pointer" @click="toScore(1000)">
              <div class="circle1"></div>
              <div class="content">{{ qyzh_qypf.one }}</div>
              <div style="text-align: center; margin-top: 8px">800-1000分</div>
            </div>
            <div class="flex-1" style="position: relative; cursor: pointer" @click="toScore(800)">
              <div class="circle2"></div>
              <div class="content">{{ qyzh_qypf.two }}</div>
              <div style="text-align: center; margin-top: 8px">600-800分</div>
            </div>
            <div class="flex-1" style="position: relative; cursor: pointer" @click="toScore(600)">
              <div class="circle3"></div>
              <div class="content">{{ qyzh_qypf.three }}</div>
              <div style="text-align: center; margin-top: 8px">600分以下</div>
            </div>
          </div>
        </div>
      </div>
      <div class="enterprise-rank" v-if="active == 1">
        <div class="enterprise-rank-box">
          <template v-for="(item, index) in qyzh_qypm">
            <div class="enterprise-rank-content flex" :key="index">
              <div class="flex-6 enterprise-rank-name">{{ item.ph }}、{{ item.firm_name }}</div>
              <div class="flex-2 enterprise-rank-num">{{ item.zpf }}</div>
              <div class="enterprise-rank-detail" style="cursor:pointer;" @click="toDetail(item.firm_name)">查看详情</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "enterpriseScore",
  data(){
    return{
      active: 0,
      qyzh_qypf: [],
      qyzh_qypm: [],
      baseUrl: 'http://10.21.197.236:9000'
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    swit(val) {
      if(val == this.active) return
      this.active = val;
    },
    getData(){
      let year = new Date().getFullYear();
      let data1 = qs.stringify({
        nx: year - 1,
      });
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_qypf",
        data: data1,
      })
          .then((res) => {
            let optionsdata = res.data;
            if (optionsdata.code == 200) {
              this.qyzh_qypf = optionsdata.data[0][0];
            }
            else{
              this.$message.error("获取企业评分失败")
            }
          })
          .catch((err) => {
            console.log(err);
          });
      let data2 = qs.stringify({
        nx: 2020,
      });
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_qypm",
        data: data2,
      })
          .then((res) => {
            let optionsdata = res.data;
            if (optionsdata.code == 200) {
              this.qyzh_qypm = optionsdata.data[0].slice(0, 5);
              this.qyzh_qypm1 = optionsdata.data[0].slice(5, 10);
            }
            else{
              this.$message.error("获取企业Top5排名失败")
            }
            //   this.get_options11(this.qyzh_qypm[0].firm_name);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    toDetail(name){
      this.$emit('showEnterprise', name)
    },
    toScore(value){
      this.$emit('showScore', value)
    }
  }
}
</script>

<style scoped>
#enterpriseScore {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.flex{
  display: flex;
}
.flex-1{
  flex: 1;
}
.flex-2{
  flex: 2;
}
.flex-6{
  flex: 6;
}
.score-box{
  position: relative;
  height: 75%;
}
.menu {
  position: absolute;
  top: -38px;
  right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.menu div{
  cursor: pointer;
  background: #0f3264;
  border: 1px solid #2061bc;
  border-radius: 0 2px 2px 0;
  font-family: MicrosoftYaHei;
  font-size: 1.3rem;
  color: #bcf6ff;
  padding: 2px 5px;
}
.menu .active{
  background-image: linear-gradient(179deg,
  #3688ff 19%,
  #1a57ab 63%,
  #1c3e68 100%);
  border: 1px solid #94c1ff;
  border-radius: 2px 0 0 2px;
  font-family: MicrosoftYaHei;
  font-size: 1.4rem;
  color: #ffffff;
}
.all-enterprise-score{
  margin: 0 auto;
  margin-top: 16px;
  width: 85px;
  font-size: 14px;
  background: url("../../../assets/subpage/enterprise-score@1x.png")no-repeat left 0px;
  background-size: 38px;
  padding-left: 58px;
}
.circle1 {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  background: conic-gradient(rgba(2, 192, 153, 0),#11F8EE);
  border-radius: 50%;
  mask: radial-gradient(transparent 23px, #000 24px);
  text-align: center;
}
.circle2 {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  background: conic-gradient(rgba(2, 192, 153, 0),#11F8EE);
  border-radius: 50%;
  mask: radial-gradient(transparent 25px, #000 26px);
  transform:rotate(-90deg);
}
.circle3 {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  background: conic-gradient(rgba(2, 192, 153, 0),#11F8EE);
  border-radius: 50%;
  mask: radial-gradient(transparent 27px, #000 28px);
  transform:rotate(-180deg);
}
.content{
  position: absolute;
  font-weight: bold;
  left: 0;
  right: 0;
  font-size: 16px;
  top: 20px;
  text-align: center;
  background: transparent;
}
.enterprise-rank-box{
  margin: 0 20px;
  font-size: 12px;
}
.enterprise-rank-content{
  border: 1px solid rgba(148, 193, 255, .4);
  padding: 4px 12px;
  margin-bottom: 1%;
  border-radius: 2px;
}
.enterprise-rank-detail{
  width: 60px;
  text-align: right;
  color: #00F4FF;
}
.enterprise-rank-name{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: #BCF6FF;
}
.enterprise-rank-num{
  font-weight: bold;
  color: #FDC239;
}
.enterprise-rank{
  margin-top: 16px;
}
</style>