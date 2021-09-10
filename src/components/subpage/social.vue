<template>
  <div class="social">
    <div class="bot">
      <div>
        <img
          src="@/assets/subpage/number.png"
          alt="图片缺失"
          style="height: 100%; margin-right: 5%"
        />
      </div>
      <div class="old">
        <div class="qyxxtitle">养老机构</div>
        <div class="qyxxnumber">{{ lnzt_shbz.yljgs }}</div>
      </div>
    </div>
    <div class="ea">
      <div class="qyxxtitle">城镇低保</div>
      <div class="qyxxnumber">{{ lnzt_shbz.czdbs }}</div>
    </div>
    <div class="ea">
      <div class="qyxxtitle">农村低保</div>
      <div class="qyxxnumber">{{ lnzt_shbz.ncdbs }}</div>
    </div>
    <div class="ea">
      <div class="qyxxtitle">临时救助</div>
      <div class="qyxxnumber">{{ lnzt_shbz.lsjzs }}</div>
    </div>
  </div>
</template>

<script>
// 社会保障，低收入人群保障
export default {
  name: "social",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      lnzt_shbz: [],
    };
  },
  mounted() {
    this.getdata();
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
  height: 89%;
  color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  position: absolute;

  img {
    height: 3rem;
    margin: 0 10px;
  }
  > .bot {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    >div{
      display: inline-block;
    }
    > .old {
      margin-left: 20px;
      > div:nth-child(1) {
        font-family: MicrosoftYaHei;
        font-size: 1.6rem;
        color: #ffffff;
        
      }
      > div:nth-child(2) {
        font-family: DINPro-Medium;
        font-size: 2.6rem;
        color: #00eaff;
      }
    }
  }

  > .ea {
    padding: 3rem 20px;
    background: rgba(32, 97, 188, 0.31);
    border: 1px solid rgba(148, 193, 255, 0.31);
    border-radius: 2px;
    margin-left: 4%;
    > div:nth-child(1) {
      font-family: MicrosoftYaHei;
      font-size: 1.4rem;
      color: rgba(255, 255, 265, 0.7);
      text-align: center;
      white-space: nowrap;
    }
    > div:nth-child(2) {
      font-family: DINPro-Medium;
      font-size: 2rem;
      color: #ffffff;
      text-align: center;
      margin-top: 1.3rem;
    }
  }
}
</style>