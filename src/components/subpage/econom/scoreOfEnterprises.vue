<template>
  <div class="scoreOfEnterprises">
    <div class="tit">企业综合评分</div>
    <div class="qyzhpf">
      <div class="fistdiv">
        <div>上年评分总企业数</div>
        <div>{{ qyzh_qypf.qys }}</div>
      </div>
      <div class="seconddiv">
        <el-progress
          type="circle"
          :width="90"
          :percentage="100"
          :show-text="false"
        ></el-progress>
        <div>800-1000分</div>
        <div class="yuannei">{{ qyzh_qypf.one }}</div>
      </div>
      <div class="seconddiv">
        <el-progress
          type="circle"
          :width="90"
          :percentage="70"
          :show-text="false"
        ></el-progress>
        <div>600-800分</div>
        <div class="yuannei">{{ qyzh_qypf.two }}</div>
      </div>
      <div class="seconddiv">
        <el-progress
          type="circle"
          :width="90"
          :percentage="60"
          :show-text="false"
        ></el-progress>
        <div>600-以下</div>
        <div class="yuannei">{{ qyzh_qypf.three }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 企业综合评分
export default {
  name: "scoreOfEnterprises",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      qyzh_qypf:{}
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_qypf"
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.qyzh_qypf = optionsdata.data[0][0];
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
.scoreOfEnterprises {
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
  .qyzhpf {
    display: flex;
    margin: 10% 0;
    align-items: center;
    .fistdiv {
      width: 220px;
      > div:nth-child(1) {
        font-family: SourceHanSansCN-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
      }
      > div:nth-child(2) {
        font-family: DINAlternate-Bold;
        font-size: 26px;
        color: #fff;
        margin-top: 20px;
        letter-spacing: 0;
        text-align: center;
      }
    }
    .seconddiv {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      > div:nth-child(2) {
        margin: 6% 0;
        font-family: PingFangSC-Regular;

        font-size: 20px;
        color: #ffffff;
        text-align: center;
      }
      > div:nth-child(3) {
        // margin: 6% 0;
        position: absolute;
        top: 25%;
        font-family: PingFangSC-Regular;
        width: 50px;
        font-size: 20px;
        color: #ffffff;
        text-align: center;
      }
    }
  }
}
</style>