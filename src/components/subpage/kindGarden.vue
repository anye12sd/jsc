<template>
  <div class="kindGarden">
    <div class="tit">幼儿园预警</div>
    <div class="content">
      <div>
        <div class="cycolor">下学期预计入学人数</div>
        <div class="cynumber">{{ yezt_yeyycyj1.yjryrs }}</div>
      </div>
      <div>
        <div class="cycolor">规划入园人数</div>
        <div class="cynumber">{{ yezt_yeyycyj1.lyrs }}</div>
      </div>
    </div>
    <vue-seamless-scroll
      v-if="yezt_yeyycyj2.length > 5"
      :data="yezt_yeyycyj2.length > 5 ? yezt_yeyycyj2 : ''"
      class="aaa"
      :class-option="ccccca"
    >
      <div v-for="(k, index) in yezt_yeyycyj2" :key="index" class="col">
        <div class="icon"></div>
        <div class="txt">
          <div>{{ k.yj }}</div>
          <div>{{ k.sj }}</div>
        </div>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
// 幼儿园预测预警
export default {
  name: "kindGarden",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      yezt_yeyycyj1: {},
      yezt_yeyycyj2: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/yezt_yeyycyj",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.yezt_yeyycyj1 = optionsdata.data[0][0];
            this.yezt_yeyycyj2 = optionsdata.data[1];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ccccca() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
};
</script>

<style scoped lang="less">
.kindGarden {
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
  .content {
    display: flex;
    justify-content: space-around;
    margin-top: 7px;
    div {
      text-align: center;
    }
  }
  .aaa {
    height: 260px;
    overflow: hidden;
    margin-top: 8px;
    .col {
      display: flex;
      align-items: center;
      height: 30px;
      margin-top: 5px;
      .icon {
        background-image: url("../../assets/subpage/yj1.png");
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        height: 30px;
        width: 30px;
        margin-right: 4px;
      }
      .txt {
        width: calc(100% - 20px);
      }
      .txt>div:nth-of-type(1){
          font-family: SourceHanSansCN-Regular;
          font-size: 12px;
      }
      .txt>div:nth-of-type(2){
        font-family: Helvetica;
        font-size: 9px;
        opacity: 0.9;
      }
    }
  }
}
</style>