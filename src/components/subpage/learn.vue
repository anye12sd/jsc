<template>
  <div class="learn">
    <div class="tit">升学</div>
    <div class="content">
      <div>
        <div class="cycolor">上年毕业人数</div>
        <div class="cynumber">{{ sxdata.byss }}</div>
      </div>
      <div>
        <div class="cycolor">上年本科人数</div>
        <div class="cynumber">{{ sxdata.bkss }}</div>
      </div>
      <div>
        <div class="cycolor">上年重点本科人数</div>
        <div class="cynumber">{{ sxdata.zdbkss }}</div>
      </div>
    </div>
    <div class="tit2">上年人气排行</div>
    <vue-seamless-scroll
      v-if="sxchart.length > 5"
      :data="sxchart.length > 5 ? sxchart : ''"
      class="aaa"
      :class-option="ccccca"
    >
      <div
        class="toppmdiv"
        v-for="(item, index) in sxchart"
        :key="index"
        :style="`background-image: linear-gradient(to right,#004864 0%,#004864 ${
          item.rq / 100
        }%,transparent ${item.rq / 100}%,transparent 100%);`"
      >
        <el-row>
          <el-col :span="20" class="toptitle"
            >{{ item.pm }}.{{ item.xxmc }}</el-col
          >
          <el-col :span="4" class="topnumber">
            {{ item.rq }}
          </el-col>
        </el-row>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
// 升学
export default {
  name: "learn",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
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
          console.log(optionsdata);
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
.learn {
  width: 100%;
  height: 100%;
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
  .content {
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
    div {
      text-align: center;
    }
  }
  .tit {
    font-family: SourceHanSansCN-Heavy;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
  }
  .toppmdiv {
    opacity: 0.9;
    box-shadow: inset 0 0 5px 0 #ffffff;
    border-radius: 4px;
    padding: 11px 9px;
    margin-top: 7px;
  }
  .aaa{
      height: 250px;
      overflow: hidden;
  }
}
</style>