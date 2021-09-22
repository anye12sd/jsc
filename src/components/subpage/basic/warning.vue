<template>
  <div id="warning">
    <div class="bigtit">
      <div class="tag"></div>
      <div>今日预警</div>
    </div>
    <div class="content flex" v-if="warning.length">
      <div class="warning-box">
        <div class="header-img1"></div>
        <div class="warning-content flex">
          <div class="warning-content-left flex-4">{{ warning[4].name }}</div>
          <div class="warning-content-right flex-1">{{ warning[4].count }}</div>
        </div>
      </div>
      <div class="warning-box">
        <div class="header-img2"></div>
        <div class="warning-content flex">
          <div class="warning-content-left flex-4">{{ warning[3].name }}</div>
          <div class="warning-content-right flex-1">{{ warning[3].count }}</div>
        </div>
      </div>
      <div class="warning-box">
        <div class="header-img3"></div>
        <div class="warning-content flex">
          <div class="warning-content-left flex-4">{{ warning[1].name }}</div>
          <div class="warning-content-right flex-1">{{ warning[1].count }}</div>
        </div>
      </div>
      <div class="warning-box">
        <div class="header-img4"></div>
        <div class="warning-content flex">
          <div class="warning-content-left flex-4">{{ warning[0].name }}</div>
          <div class="warning-content-right flex-1">{{ warning[0].count }}</div>
        </div>
      </div>
      <div class="warning-box">
        <div class="header-img5"></div>
        <div class="warning-content flex">
          <div class="warning-content-left flex-4">{{ warning[2].name }}</div>
          <div class="warning-content-right flex-1">{{ warning[2].count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "warning",
  data(){
    return {
      warning: [
        {count: 1},
        {count: 1},
        {count: 1},
        {count: 1},
        {count: 1},
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$axios({
        method: "post",
        url: "api/zhzlApi/jsc/jscIndex/jryj",
      })
          .then((res) => {
            let optionsdata = res.data.data;
            this.warning = optionsdata.iconData
          })
          .catch((err) => {
            console.log(err);
          });
    },
  }
}
</script>

<style scoped>
#warning {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  position: relative;
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
.flex-4{
  flex: 4;
}
.warning-box{
  width: 48%;
  margin-right: 1%;
  background: #114787;
  padding: 15px 0;
  margin-top: 8px;
  border-radius: 5px;
}
.header-img1{
  background: url("../../../assets/subpage/warning1@1x.png") no-repeat 15px;
  background-size: 24px;
  height: 24px;
  padding: 0 15px
}
.header-img2{
  background: url("../../../assets/subpage/warning2@1x.png") no-repeat 15px;
  background-size: 24px;
  height: 24px;
  padding: 0 15px
}
.header-img3{
  background: url("../../../assets/subpage/warning3@1x.png") no-repeat 15px;
  background-size: 24px;
  height: 24px;
  padding: 0 15px
}
.header-img4{
  background: url("../../../assets/subpage/warning4@1x.png") no-repeat 15px;
  background-size: 24px;
  height: 24px;
  padding: 0 15px
}
.header-img5{
  background: url("../../../assets/subpage/warning5@1x.png") no-repeat 15px;
  background-size: 24px;
  height: 24px;
  padding: 0 15px
}
.warning-content{
  padding: 0 15px;
  margin-top: 22px;
  font-size: 1.8rem;
}
.warning-content-right{
  text-align: right;
  color: #00EAFF;
  font-size: 2.2rem;
}
</style>