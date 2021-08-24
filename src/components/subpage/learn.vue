<template>
  <div class="learn">
    <div class="bigtit">
      <div class="tag"></div>
      <div>升学</div>
    </div>
    <div class="content">
      <div>
        <div class="cynumber">{{ sxdata.byss }}</div>
        <div class="cycolor">上年毕业人数</div>
      </div>
      <div>
        <div class="cynumber">{{ sxdata.bkss }}</div>
        <div class="cycolor">上年本科人数</div>
      </div>
      <div>
        <div class="cynumber">{{ sxdata.zdbkss }}</div>
        <div class="cycolor">上年重点本科人数</div>
      </div>
    </div>
    <div class="tit2" style="color: #BCF6FF;">上年人气排行</div>
    <div
      class="toppmdiv"
      v-for="(item, index) in sxchart.slice(0, 4)"
      :key="index"
    >
      <div style="color: #32C5FF;">TOP0{{ index + 1 }}</div>
      <div style="color: #BDE2FC;">{{ item.xxmc }}</div>
      <div style="color: #FDC239;">{{ item.rq }}</div>
    </div>
  </div>
</template>

<script>
// 升学
export default {
  name: "learn",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      sxdata: {},
      sxchart: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/qnzt_sx",
        // data: data,
      })
        .then((res) => {
          let optionsdata = res.data;
          // console.log(optionsdata);
          if (optionsdata.code == 200) {
            this.sxdata = optionsdata.data[0][0];
            this.sxchart = optionsdata.data[1];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {},
};
</script>

<style scoped lang="less">
.learn {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  .content {
    display: flex;
    justify-content: center;
    height: 20%;
    .cynumber {
      font-family: DINAlternate-Bold;
      font-size: 2.22vh;
      color: #ffee72;
      letter-spacing: 0;
      text-shadow: 0 0 4px #ffee72;
    }
    .cycolor {
      font-family: MicrosoftYaHei;
      font-size: 1.4rem;
      color: #ffffff;
      letter-spacing: 0;
      padding: 0 4px;
      background-image: url("../../assets/subpage/group.png");
      background-size: 100% 100%;
    }
    > div {
      text-align: center;
      margin: 0 10px;
    }
  }
  .tit2 {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(32, 97, 188, 0.31);
    border: 1px solid rgba(148, 193, 255, 0.31);
    width: 85%;
    margin: 0 auto;
    margin-top: 0.8rem;
  }
  .toppmdiv {
    height: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 85%;
    margin: 0.45rem auto 0 auto;
    background: rgba(49, 127, 239, 0.1);
    border: 1px solid rgba(148, 193, 255, 0.2);
    >div{
      text-align: left;
      padding-left: 4%;
      flex: 2;
    }
    >div:nth-child(2){
      flex: 4;
      text-align: center;
    }
    >div:nth-child(3){
      text-align: center;
    }
  }
}
</style>