<template>
  <div class="peopleLiving">
    <div class="tit">民生诉求</div>
    <el-row class="shsqtop" style="padding: 6% 0">
      <el-col :span="6">
        <div class="qyxxtitle">热线受理</div>
        <div class="qyxxnumber">{{ cnzt_shsq1.rxsls }}</div>
      </el-col>
      <el-col :span="6">
        <div class="qyxxtitle">满意</div>
        <div class="qyxxnumber">{{ cnzt_shsq1.mys }}</div>
      </el-col>
      <el-col :span="6">
        <div class="qyxxtitle">不满意</div>
        <div class="qyxxnumber1">{{ cnzt_shsq1.bmys }}</div>
      </el-col>
      <el-col :span="6">
        <div class="qyxxtitle">满意度</div>
        <div class="qyxxnumber2">{{ cnzt_shsq1.myd }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 民生诉求
export default {
  naem: "peopleLiving",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      cnzt_shsq1:{}
    };
  },
  mounted() {
      this.getdata()
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/cnzt_shsq",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.cnzt_shsq1 = optionsdata.data[0][0];
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
.peopleLiving {
  width: 100%;
  height: 100%;
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
  .tit {
    font-family: SourceHanSansCN-Heavy;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    // margin-bottom: 0px;
  }
  .shsqtop{
      text-align: center;
  }
  .qyxxnumber1 {
    font-family: DINAlternate-Bold;
    color: #f7b500;
    letter-spacing: 0;
    text-align: center;
    padding: 10px 0;
  }
  .qyxxnumber2 {
    font-family: DINAlternate-Bold;
    color: #6dd400;
    letter-spacing: 0;
    text-align: center;
    padding: 10px 0;
  }
}
</style>