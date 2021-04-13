<template>
  <div class="job">
    <div class="tit">就业（上年）</div>
    <div class="cnztjy">
      <div>
        <div>总就业人数</div>
        <div>{{ cnzt_jy.zjyrs }}}</div>
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
        <div>已就业人数</div>
        <div>{{ cnzt_jy.yjyrs }}</div>
      </div>
      <div>
        <div>待就业人数</div>
        <div>{{ cnzt_jy.djyrs }}</div>
      </div>
    </div>
    <div class="qyxx">
      <div class="up">
        <div>
          <div>人才引进</div>
          <div>{{ cnzt_jy.rcyj }}</div>
        </div>
        <div>
          <div>较上年</div>
          <div
            v-if="cnzt_jy.rcyjsn"
            :class="cnzt_jy.rcyjsn > 0 ? 'cyzj' : 'cyzj1'"
          >
            {{ cnzt_jy.rcyjsn }}
          </div>
        </div>
        <div>
          <div>大学生本地就业</div>
          <div>{{ cnzt_jy.dxsbdjy }}</div>
        </div>
        <div>
          <div>较上年</div>
          <div
            v-if="cnzt_jy.dxssn"
            :class="cnzt_jy.dxssn > 0 ? 'cyzj' : 'cyzj1'"
          >
            {{ cnzt_jy.dxssn }}
          </div>
        </div>
      </div>
      <div class="down">
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
  </div>
</template>

<script>
// 就业
export default {
  name: "job",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      cnzt_jy: {},
      cnzt_jy1: {},
    };
  },
  mounted() {
    this.getdata();
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
  },
};
</script>

<style scoped lang="less">
.job {
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
  }
  .cnztjy {
    display: flex;
    flex-wrap: wrap;
    padding: 0 3%;
  }
  .cnztjy > div {
    width: 33.3%;
    margin-top: 20px;
    text-align: center;
  }
  .qyxx {
    text-align: center;
    margin-top: 40px;
    padding: 0 3%;
    .up {
      display: flex;
      justify-content: space-between;
      .cyzj {
        background-image: url("../../assets/subpage/ss.png");
        background-repeat: no-repeat;
        background-size: 74% 100%;
        background-position: 35% 50%;
      }
      .cyzj1 {
        background-image: url("../../assets/subpage/xj.png");
        background-repeat: no-repeat;
        background-size: 74% 100%;
        background-position: 35% 50%;
      }
    }
    .up > div {
      width: 20%;
    }
    .up>div>div:nth-of-type(2){
      padding: 2% 0;
    }
    .down {
      padding: 0 3%;
      margin-top: 20px;
      display: flex;
      justify-content: flex-start;
    }
    .down > div {
      width: 20%;
    }
    .down>div:nth-of-type(2){
      margin-left: 5.5%;
    }
  }
  .qyxx > div:nth-of-type(1) {
    display: flex;
  }
  .qyxx > div:nth-of-type(2) {
    display: flex;
  }
}
</style>