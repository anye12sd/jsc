<template>
  <div class="enterpriseNews">
    <div class="tit">企业动态</div>
    <vue-seamless-scroll
      v-if="qyzh_qydt.length > 0"
      :data="qyzh_qydt.length > 0 ? qyzh_qydt : ''"
      class="aaa"
      :class-option="ccccc"
    >
      <div class="command-table">
        <el-row
          v-for="(item, index) in qyzh_qydt"
          class="table-row"
          :key="index"
        >
          <el-col :span="5" class="col-top">
            <div class="table-dizhii">
              <i class="el-icon-time"></i>
              {{ item.sj.slice(0, 10) }}
            </div>
          </el-col>
          <el-col :span="18" class="col-between" :title="item.qydt">
            <div>{{ item.qydt }}</div>
          </el-col>
        </el-row>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
// 企业动态
export default {
  name: "enterpriseNews",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      qyzh_qydt: [],
    };
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
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_qydt",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.qyzh_qydt = optionsdata.data[0].slice(0, 20);
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
.enterpriseNews {
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
    // height: 280px;
    overflow: hidden;
    .table-row {
      padding: 4px 2px;
      background: rgba(73, 73, 73, 0.26);
      border: 1px solid #636363;
      border-radius: 4px;
      font-family: SourceHanSansCN-Regular;
      font-size: 15px;
      color: #ffffff;
      letter-spacing: 0;
      margin-top: 10px;
      // text-align: center;
    }
    .el-col {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .col-top {
      text-align: center;
    }
  }
}
</style>