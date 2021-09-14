<template>
  <div class="job">
    <div class="bigtit">
      <div class="tag"></div>
      <div>成年主题</div>
      <div class="tabs">
        <div :class="active == 0 ? 'active' : ''" @click="change(0)">就业</div>
        <div :class="active == 1 ? 'active' : ''" @click="change(1)">婚嫁</div>
      </div>
    </div>
    <div :class="'jb se'+(active == 0?'':' hide')">
      <div class="sectit">
        <img
          src="@/assets/subpage/number.png"
          alt="图片缺失"
          style="height: 100%; margin-right: 5%"
        />
        <div style="margin-right: 5%">总就业人数</div>
        <div v-if="cnzt_jy.zjyrs">
          <span v-for="(k, idx) in cnzt_jy.zjyrs.split('')" :key="idx">{{
            k
          }}</span>
        </div>
      </div>
      <div class="main">
        <div>
          <div>已就业</div>
          <div>{{ cnzt_jy.yjyrs }}</div>
        </div>
        <div>
          <div>待就业</div>
          <div>{{ cnzt_jy.djyrs }}</div>
        </div>
        <div>
          <div>就业率</div>
          <div>{{ cnzt_jy.jyl }}</div>
        </div>
        <div>
          <div>失业率</div>
          <div>{{ cnzt_jy.syl }}</div>
        </div>

        <div>
          <div>人才引进</div>
          <br />
          <div>{{ cnzt_jy.rcyj }}</div>
          <div>
            <span class="tt">较上年</span><span :style="parseInt(cnzt_jy.dxssn)>0? 'color:#65FF4D;':'color: #FF4747;'">{{ cnzt_jy.rcyjsn }}</span>
          </div>
        </div>
        <div>
          <div>大学生本地就业</div>
          <div>{{ cnzt_jy.dxsbdjy }}</div>
          <div>
            <span class="tt">较上年</span><span :style="parseInt(cnzt_jy.dxssn)>0? 'color:#65FF4D;':'color: #FF4747;'">{{ cnzt_jy.dxssn }}</span>
          </div>
        </div>
        <div>
          <div>公积金新增</div>
          <div>{{ cnzt_jy1.gjjxz }}</div>
        </div>
        <div>
          <div>社保新增</div>
          <div>{{ cnzt_jy1.sbxz }}</div>
        </div>
      </div>
    </div>
    <marr :class="'se'+(active == 1?'': ' hide')"></marr>
  </div>
</template>

<script>
// 就业
import marr from './marriage.vue'

export default {
  name: "job",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      cnzt_jy: {},
      cnzt_jy1: {},
      active: 0,
    };
  },
  mounted() {
    this.getdata();
  },
  components:{
    marr
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/cnzt_jy",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.cnzt_jy = optionsdata.data[0][0];
            this.cnzt_jy1 = optionsdata.data[1][0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    change(val) {
      this.active = val;
    },
  },
};
</script>

<style scoped lang="less">
.job {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  position: relative;
  .bigtit {
    position: relative;
    .tabs {
      position: absolute;
      width: 35%;
      right: 1%;
      top: 0;
      text-align: right;
      > div {
        display: inline;
        background: #0f3264;
        border: 1px solid #2061bc;
        padding: 0.3rem 4%;
        font-family: MicrosoftYaHei;
        font-size: 1.4rem;
        color: #bcf6ff;
        text-align: center;
        cursor: pointer;
      }
      > div:nth-child(1) {
        border-radius: 2px 0 0 2px;
        border-right: none;
      }
      > div:nth-child(2) {
        border-radius: 2px;
      }
      > div:nth-child(3) {
        border-radius: 0 2px 2px 0;
        border-left: none;
      }
      > .active {
        background-image: linear-gradient(
          179deg,
          #3688ff 19%,
          #1a57ab 63%,
          #1c3e68 100%
        );
      }
    }
  }
  .hide{
    visibility: hidden;
  }
  .se{
    position: absolute;
  }
  .jb {
    height: 90%;
    .sectit {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15%;
      margin-bottom: 0.6rem;
      > div:nth-child(2) {
        font-family: MicrosoftYaHei;
        font-size: 1.8rem;
        color: #ffffff;
      }
      > div:nth-child(3) {
        white-space: nowrap;
        text-align: center;
        span {
          text-align: center;
          padding: 0 3px;
          background-image: linear-gradient(180deg, #007fff 0%, #012f99 100%);
          border-radius: 2px;
          margin-right: 4%;
          font-family: DINAlternate-Bold;
          font-size: 2.6rem;
          color: #ffffff;
        }
      }
    }
    .main {
      height: 85%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 90%;
      margin: 0 auto;

      > div {
        text-align: center;
        width: 23%;
        background: rgba(32, 97, 188, 0.31);
        border: 1px solid rgba(148, 193, 255, 0.31);
        border-radius: 2px;
        margin-bottom: 1rem;
        padding: 0.5rem 2% 0.4rem 2% ;
        box-sizing: border-box;
        > div:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.7);
        }
        > div:nth-child(2) {
          margin-top: 0.5rem;
          font-family: DINPro-Medium;
          font-size: 1.6rem;
          color: #ffffff;
        }
        .tt {
          color: rgba(255, 255, 255, 0.7);
          font-family: MicrosoftYaHei;
          font-size: 1.2rem;
        }
      }
    }
  }
}
@media screen and (max-height: 640px) {
  .job {
    .jb {
      .main {
        > div {
          padding: 0.7rem 2% 0.2rem 2% ;
        }
      }
    }
  }
}
</style>