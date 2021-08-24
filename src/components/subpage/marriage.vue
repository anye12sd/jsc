<template>
  <div class="marriage">
    <div class="main" v-if="cnzt_hy">
      <div>
        <div>
          <img
            src="@/assets/subpage/number.png"
            alt="图片缺失"
            style="height: 100%; margin-right: 5%"
          />
        </div>
        <div>
          <div>结婚登记数量</div>
          <div>{{ cnzt_hy.jhrsjsn }}</div>
        </div>
        <div>
          <div>较上年</div>
          <div>
            <img
            :src="cnzt_hy.jhrsjsn.slice(0, 1) == '+' ? increase : reduce"
            alt="图片缺失"
          />
            <span>{{ cnzt_hy.jhrsjsn }}</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <img
            src="@/assets/subpage/number.png"
            alt="图片缺失"
            style="height: 100%; margin-right: 5%"
          />
        </div>
        <div>
          <div>离婚数量</div>
          <div>{{ cnzt_hy.lhrs }}</div>
        </div>
        <div>
          <div>较上年</div>
          <div>
            <img
            :src="cnzt_hy.lhrs.slice(0, 1) == '+' ? increase : reduce"
            alt="图片缺失"
          />
            <span>{{ cnzt_hy.lhrs }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 婚姻
import increase from "@/assets/subpage/increase.png";
import reduce from "@/assets/subpage/reduce.png";

export default {
  name: "marriage",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      cnzt_hy: null,
      increase,reduce
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
  height: 89%;
  color: #fff;
  box-sizing: border-box;
  .main {
    > div {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      margin-top: 3.5rem;
      > div:nth-child(1) {
        flex: 1;
        margin-right: 5%;
      }
      > div:nth-child(2) {
        flex: 3;
        > div:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 1.6rem;
          color: #ffffff;
        }
        > div:nth-child(2) {
          font-family: DINAlternate-Bold;
          font-size: 2.6rem;
          color: #00eaff;
        }
      }
      > div:nth-child(3) {
        flex: 2;
        > div:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 1.6rem;
          color: #ffffff;
        }
        > div:nth-child(2) {
          font-family: DINPro-Regular;
          font-size: 1.8rem;
          vertical-align: middle;
          img{
            vertical-align: middle;
            width: 2rem;
          }
        }
      }
    }
  }
}
</style>