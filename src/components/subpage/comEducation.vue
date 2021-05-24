<template>
  <div id="comEducation">
    <div class="bigtit">义务教育（上年）</div>
    <div class="first">
      <div>
        <div class="cycolor">小学数量</div>
        <div class="cynumber">{{ qnzt_ywzj1.XXSL }}</div>
      </div>
      <div>
        <div class="cycolor">中学数量</div>
        <div class="cynumber">{{ qnzt_ywzj1.ZXSL }}</div>
      </div>
      <div>
        <div class="cycolor">小学人数</div>
        <div class="cynumber">{{ qnzt_ywzj1.XXRS }}</div>
      </div>
      <div>
        <div class="cycolor">中学人数</div>
        <div class="cynumber">{{ qnzt_ywzj1.ZXRS }}</div>
      </div>

      <div>
        <div class="cycolor">老师总数</div>
        <div class="cynumber">{{ qnzt_ywzj2.jszs }}</div>
      </div>
      <div>
        <div class="cycolor">一级教师</div>
        <div class="cynumber">{{ qnzt_ywzj2.yjjs }}</div>
      </div>
      <div>
        <div class="cycolor">二级教师</div>
        <div class="cynumber">{{ qnzt_ywzj2.ejjs }}</div>
      </div>
      <div>
        <div class="cycolor">三级教师</div>
        <div class="cynumber">{{ qnzt_ywzj2.sjjs }}</div>
      </div>
    </div>
    <div class="second">
      <div class="tit">年纪人数</div>
      <div>
        <div class="cycolor">一年级</div>
        <div class="cynumber">{{ qnzt_ywzj3.NJ1 }}</div>
      </div>
      <div>
        <div class="cycolor">二年级</div>
        <div class="cynumber">{{ qnzt_ywzj3.NJ2 }}</div>
      </div>
      <div>
        <div class="cycolor">三年级</div>
        <div class="cynumber">{{ qnzt_ywzj3.NJ3 }}</div>
      </div>
      <div>
        <div class="cycolor">四年级</div>
        <div class="cynumber">{{ qnzt_ywzj3.NJ4 }}</div>
      </div>
      <div>
        <div class="cycolor">五年级</div>
        <div class="cynumber">{{ qnzt_ywzj3.NJ5 }}</div>
      </div>
      <div>
        <div class="cycolor">六年级</div>
        <div class="cynumber">{{ qnzt_ywzj3.NJ6 }}</div>
      </div>
      <div>
        <div class="cycolor">初一</div>
        <div class="cynumber">{{ qnzt_ywzj3.NJ7 }}</div>
      </div>
      <div>
        <div class="cycolor">初二</div>
        <div class="cynumber">{{ qnzt_ywzj3.NJ8 }}</div>
      </div>
      <div>
        <div class="cycolor">初三</div>
        <div class="cynumber">{{ qnzt_ywzj3.NJ9 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 义务教育
export default {
  name: "comEducation",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      qnzt_ywzj1: [],
      qnzt_ywzj2: [],
      qnzt_ywzj3: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/qnzt_ywzj",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            // console.log(optionsdata);
            this.qnzt_ywzj1 = optionsdata.data[0][0];
            this.qnzt_ywzj2 = optionsdata.data[1][0];
            this.qnzt_ywzj3 = optionsdata.data[2][0];
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
#comEducation {
  width: 100%;
  height: 100%;
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  * {
    box-sizing: border-box;
  }
  .bigtit {
    width: 100%;
    font-family: SourceHanSansCN-Heavy;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
  }
  .first {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .first > div {
    width: 25%;
    text-align: center;
    margin-top: 10px;
  }
  .second {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 10px;
    .tit {
      width: 100%;
      font-family: SourceHanSansCN-Heavy;
      font-size: 15px;
      text-align: left;
      margin-top: 10px;
    }
  }
  .second > div {
    width: 20%;
    text-align: center;
    margin-top: 10px;
  }
}
</style>