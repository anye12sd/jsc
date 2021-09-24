<template>
  <div id="town">
    <div class="bigtit">
      <div class="tag"></div>
      <div>乡镇平安指数</div>
    </div>
    <div class="content">
      <div class="content-title">上月乡镇平安指数</div>
      <div class="town-score-box flex">
        <template v-for="(item, index) in townData">
          <div class="town-score" :class="index >= 9 ? 'town-score1' : ''" :key="index">
            <div class="rank">{{item.rank}}</div>
            <div class="town-score-name">{{ item.departmentName }}</div>
            <div class="town-score-detail">{{ item.score }}</div>
          </div>
        </template>
      </div>
      <div class="content-title">近一年乡镇平安指数综合排名</div>
      <div class="town-rank-box">
        <template v-for="(item, index) in yearData">
          <div class="town-rank-content flex" :key="index">
            <div class="town-rank-content-left flex-1">NO.{{index + 1}}</div>
            <div class="town-rank-content-right flex-1">{{ item.departmentName }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "town",
  data(){
    return {
      townData: [],
      yearData: []
    }
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      let data = btoa('http://jczl.giscloud.cx/zhzlApi/jsc/jscIndex/safetyAllIndexForCX')
      let url = process.env.NODE_ENV == "development" ? '/api/zhzlApi/jsc/jscIndex/safetyAllIndexForCX' : 'url?url=' + data
      this.$axios({
        method: "get",
        url: url,
      })
          .then((res) => {
            let optionsdata = res.data.data.data;
            // let optionsdata = res.data.data; // 本地环境用这个变量
            this.townData = optionsdata.townSafety
            this.yearData = optionsdata.yearTopFive
          })
          .catch((err) => {
            console.log(err);
          });
    },
  }
}
</script>

<style scoped>
#town {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.bigtit{
  height: 5%;
}
.flex{
  display: flex;
  flex-wrap: wrap;
}
.flex-1{
  flex: 1;
}
.content{
  margin-top: 8px;
  height: 91%;
}
.town-score-box{
  color: #fff;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 44%;
  overflow: auto;
}
.town-score{
  width: 32.5%;
  margin-right: 0.8%;
  background: #114787;
  margin-top: 3px;
  padding: 8px 0;
  text-align: center;
  position: relative;
}
.town-score:before{
  content: '';
  display: block;
  width: 12%;
  height: 2px;
  background: #8EC6FF;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 0px;
}
.town-score-box .town-score .rank{
  position: absolute;
  top: -1px;
  left: 4px;
  font-size: 1.6rem;
  color: #fff;
}
.town-score-box .town-score1 .rank{
  position: absolute;
  top: -1px;
  left: 0px;
  font-size: 1.6rem;
  color: #fff;
}
.town-score-box .town-score{
  background-image: url("../../../assets/subpage/top4@1x.png");
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 16px;
}
.town-score-box .town-score:nth-child(1){
  background-image: url("../../../assets/subpage/top1@1x.png");
}
.town-score-box .town-score:nth-child(2){
  background-image: url("../../../assets/subpage/top2@1x.png");
}
.town-score-box .town-score:nth-child(3){
  background-image: url("../../../assets/subpage/top3@1x.png");
}
.town-score-name{
  margin: 0 auto;
  width: 60%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.town-score-detail{
  margin-top: 3px;
  color: #FFE26E;
  font-size: 2rem;
}
.town-rank-box{
  margin: 0 20px;
  margin-top: 5px;
  height: 44%;
  overflow: auto;
}
.town-rank-content{
  border: 1px solid #94C1FF;
  margin-top: 2px;
  background: #114787;
}
.town-rank-content:nth-child(odd){
  border: 1px solid #94C1FF;
  margin-top: 2px;
  background: #2257a0;
}
.town-rank-content-left{
  padding-left: 30px;
  color: #32C5FF;
}
.town-rank-content-right{
  text-align: right;
  padding-right: 50px;
  color: #bde2fc;
}
</style>