<template>
  <div class="social">
    <div>低收入人群保障（迄今为止）</div>
    <el-row class="shbzdiv">
      <el-col :span="6">
        <div class="qyxxtitle">城镇低保</div>
        <div class="qyxxnumber">{{ lnzt_shbz.czdbs }}</div>
      </el-col>
      <el-col :span="6">
        <div class="qyxxtitle">农村低保</div>
        <div class="qyxxnumber">{{ lnzt_shbz.ncdbs }}</div>
      </el-col>
      <el-col :span="6">
        <div class="qyxxtitle">临时救助</div>
        <div class="qyxxnumber">{{ lnzt_shbz.lsjzs }}</div>
      </el-col>
      <el-col :span="6">
        <div class="qyxxtitle">养老机构</div>
        <div class="qyxxnumber">{{ lnzt_shbz.yljgs }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 社会保障，低收入人群保障
export default {
  name: "social",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      lnzt_shbz: [],
    };
  },
  mounted() {
      this.getdata()
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/lnzt_shbz",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.lnzt_shbz = optionsdata.data[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="less">
.social {
  width: 100%;
  height: 100%;
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
  .shbzdiv{
      text-align: center;
      margin-top: 30px;
  }
}
</style>