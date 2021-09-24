<template>
  <div id="enterpriseRisk">
    <div class="bigtit">
      <div class="tag"></div>
      <div>{{ titleName }}</div>
    </div>
    <div class="risk-box">
      <div class="menu">
        <div @click="hideScore">返回</div>
      </div>
      <div class="risk-box-content">
<!--        <div class="risk-header flex">-->
<!--          <div class="risk-header-left flex-1">企业名称</div>-->
<!--          <div class="risk-header-right">处罚次数</div>-->
<!--        </div>-->
        <div class="risk-content-outer">
          <template>
            <div class="risk-content flex" v-for="(item, index) in list" :key="index">
              <div class="risk-content-left flex-6">{{ item.firm_name }}</div>
              <div class="risk-content-right flex-2">{{ item.zpf }}</div>
              <div class="risk-content-right flex-2" style="cursor:pointer;" @click="toDetail(item.firm_name)">查看详情</div>
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
  props: ['scoreValue'],
  data(){
    return{
      baseUrl: 'http://10.21.197.236:9000',
      list: {},
      score: "",
      titleName: ""
    }
  },
  watch: {
    scoreValue(newVal){
      this.score = newVal
      switch (newVal){
        case 600:
          this.titleName = '600分-以下'
              break;
        case 800:
          this.titleName = '600-800分'
          break;
        case 1000:
          this.titleName = '800-1000分'
          break;
      }
      this.getData(this.score)
    }
  },
  mounted() {
    this.score = this.scoreValue
    switch (this.scoreValue){
      case 600:
        this.titleName = '600分-以下'
        break;
      case 800:
        this.titleName = '600-800分'
        break;
      case 1000:
        this.titleName = '800-1000分'
        break;
    }
    this.getData(this.score)
  },
  methods: {
    getData(score){
      this.$axios({
        method: "get",
        url: this.baseUrl + "/index/economic/qyzh_qyzhpf?pf=" + score,
      }).then((res) => {
        if (res.data.code == 200) {
          console.log(res)
          this.list = res.data.data[0]
        }
      });
    },
    toDetail(name){
      this.$emit('showEnterprise', name)
    },
    hideScore(){
      this.$emit('hideScore')
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
.flex-2{
  flex: 2;
}
.flex-6{
  flex: 6;
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
  border-radius: 2px;
  font-family: MicrosoftYaHei;
  font-size: 1.3rem;
  color: #bcf6ff;
  padding: 2px 5px;
}
.risk-box-content{
  margin: 0 5%;
  height: 100%;
}
.risk-header{
  color: #7291CD;
  padding: 0 10px
}
.risk-content-left{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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