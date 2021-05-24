<template>
  <div class="marriage">
    <div class="tit">婚姻</div>
    <div class="main" v-if="cnzt_hy">
      <div>
        <div>结婚登记数量</div>
        <div>{{ cnzt_hy.jhrs }}<span>对</span></div>
      </div>
      <div>
        <div>较上年</div>
        <div :class="cnzt_hy.jhrsjsn.slice(0, 1) == '+' ? 'cyzj' : 'cyzj1'">
          {{ cnzt_hy.jhrsjsn }}
        </div>
      </div>
      <div>
        <div>离婚数量</div>
        <div>{{ cnzt_hy.lhrs }}<span>对</span></div>
      </div>
      <div>
        <div>较上年</div>
        <div :class="cnzt_hy.jhrsjsn.slice(0, 1) == '+' ? 'cyzj' : 'cyzj1'">
          {{ cnzt_hy.lhrsjsn }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 婚姻
export default {
  name: "marriage",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      cnzt_hy: null,
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/cnzt_hy",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.cnzt_hy = optionsdata.data[0];
            // console.log("婚姻", this.cnzt_hy);
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
.marriage {
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
  .main {
    display: flex;
    flex-wrap: wrap;
    .cyzj {
      background-image: url("../../assets/subpage/ss.png");
      background-repeat: no-repeat;
      background-size: 34% 100%;
      background-position: 48% 50%;
    }
    .cyzj1 {
      background-image: url("../../assets/subpage/xj.png");
      background-repeat: no-repeat;
      background-size: 34% 100%;
      background-position: 48% 50%;
    }
  }
  .main > div {
    width: 50%;
    text-align: center;
    margin-top: 45px;
    div {
      margin-top: 20px;
    }
  }
  .main > div > div:nth-of-type(2) {
    padding: 2% 0;
  }
}
</style>