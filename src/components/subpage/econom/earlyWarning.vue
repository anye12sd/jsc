<template>
  <div class="earlyWarning">
    <div class="tit">企业评分预警</div>
    <vue-seamless-scroll
      v-if="qyzh_pfyj.length > 0"
      :data="qyzh_pfyj.length > 0 ? qyzh_pfyj : ''"
      class="aaa"
      :class-option="ccccc"
    >
      <div class="command-table">
        <div v-for="(item, index) in qyzh_pfyj" class="table-row1" :key="index">
          <el-row class="row-style">
            <el-col :span="2" class="col-top">
              <div class="table-dizhii"></div>
            </el-col>
            <el-col :span="22" class="col-between">
              <div :title="item.yj">{{ item.yj }}</div>
              <div class="qypftime">{{ item.sj }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
// 企业评分预警
export default {
  name: "earlyWarning",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      qyzh_pfyj: [],
    };
  },
  mounted() {
    this.getdata();
  },
  computed: {
    ccccc() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 6, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_pfyj",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.qyzh_pfyj = optionsdata.data[0];
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
.earlyWarning {
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
  .aaa {
    overflow: hidden;
    height: 90%;
    margin: 10px auto 0 auto;
    width: 94%;
  }
  .command-table {
    overflow: hidden;
    .table-row1 {
      margin: 10px 0;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      .table-dizhii {
        background-image: url("../../../assets/subpage/yj1.png");
        background-size: 100% 100%;
        height: 30px;
        width: 30px;
      }
      .col-between > div {
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        overflow: hidden;
      }
      .qypftime {
        opacity: 0.5;
        font-family: Helvetica;
        font-size: 16px;
        color: #ffffff;
        // letter-spacing: 1.93px;
      }
      // text-align: center;
    }
  }
}
</style>