<template>
  <div id="enterpriseRisk">
    <div class="bigtit">
      <div class="tag"></div>
      <div>企业异常风险排行</div>
    </div>
    <div class="risk-box">
      <div class="menu">
        <div :class="active == 3 ? 'active' : ''" @click="swit(3)">
          年度
        </div>
        <div :class="active == 2 ? 'active' : ''" @click="swit(2)">
          季度
        </div>
        <div :class="active == 1 ? 'active' : ''" @click="swit(1)">
          月度
        </div>
      </div>
      <div class="risk-box-content">
        <div class="risk-header flex">
          <div class="risk-header-left flex-1">企业名称</div>
          <div class="risk-header-right">处罚次数</div>
        </div>
        <div class="risk-content-outer">
          <template v-if="active == 3">
            <div class="risk-content flex" v-for="(item, index) in list" :key="index">
              <div class="risk-content-left flex-1">{{ item.firm_name }}</div>
              <div class="risk-content-right">{{ item.num }}</div>
            </div>
          </template>
          <template v-else-if="active == 2">
            <div class="risk-content flex" v-for="(item, index) in list" :key="index">
              <div class="risk-content-left flex-1">{{ item.firm_name }}</div>
              <div class="risk-content-right">{{ item.num }}</div>
            </div>
          </template>
          <template v-else>
            <div class="risk-content flex" v-for="(item, index) in list" :key="index">
              <div class="risk-content-left flex-1">{{ item.firm_name }}</div>
              <div class="risk-content-right">{{ item.num }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "enterpriseRisk",
  data(){
    return{
      active: 3,
      baseUrl: 'http://10.21.197.236:9000',
      list: {}
    }
  },
  mounted() {
    this.getData(this.active)
  },
  methods: {
    getData(type){
      this.$axios({
        method: "get",
        url: this.baseUrl + "/index/economic/qyzh_qydt_v2?type=" + type,
      }).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.data[0]
        }
      });
    },
    swit(val) {
      if(val == this.active) return
      this.active = val;
      this.getData(val)
    },
  }
}
</script>

<style scoped>
#enterpriseRisk {
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
.risk-box{
  margin-top: 8px;
  position: relative;
  height: 80%;
}
.menu {
  position: absolute;
  top: -30px;
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
.risk-box-content{
  margin: 0 5%;
  height: 100%;
}
.risk-header{
  color: #7291CD;
  padding: 0 10px
}
.risk-header-right, .risk-content-right{
  width: 50px;
  text-align: center;
}
.risk-content{
  padding: 0 8px;
  height: 25px;
  line-height: 25px;
  margin-top: 5px;
  background: linear-gradient(270deg, rgba(142,176,255,0.00) 0%, rgba(2,192,253,0.42) 99%);;
}
.risk-content-outer{
  max-height: calc(100% - 20px);
  overflow: auto;
}
.risk-content-outer .risk-content:nth-child(1) .risk-content-right{
  color: #FF4747;
}
.risk-content-outer .risk-content:nth-child(2) .risk-content-right{
  color: #FF6600;
}
.risk-content-outer .risk-content:nth-child(3) .risk-content-right{
  color: #FFE047;
}
</style>