<template>
  <div class="threeHigh">
    <div class="tit">三高人数（今年）</div>
    <el-row class="txt">
      <el-col :span="8">
        <div class="qyxxtitle">高血压人数</div>
        <div class="qyxxnumber">{{ lnzt_st2.gxyrs }}</div>
      </el-col>
      <el-col :span="8">
        <div class="qyxxtitle">高血糖人数</div>
        <div class="qyxxnumber">{{ lnzt_st2.gxtrs }}</div>
      </el-col>
      <el-col :span="8">
        <div class="qyxxtitle">高血脂人数</div>
        <div class="qyxxnumber">{{ lnzt_st2.gxzrs }}</div>
      </el-col>
    </el-row>
    <div class="topsxl">三高人数历年变化情况</div>
    <div id="sgrslnbhqk"></div>
  </div>
</template>

<script>
export default {
  name: "threeHigh",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      lnzt_st2: {},
      timeInterval: 2000,
      timer: null
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/lnzt_st",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.lnzt_st2 = optionsdata.data[1][0];
            this.lnzt_st3 = optionsdata.data[2].reverse();
            this.drawing();
          }
          //  console.log(optionsdata,88)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawing() {
      let sgrslnbhqk = this.$echarts.init(
        document.getElementById("sgrslnbhqk")
      );
      var x = [];
      var y = [];
      var y2 = [];
      var y3 = [];
      // console.log(this.lnzt_st3,9863)
      this.lnzt_st3.map((item, index) => {
        x.push(item.nx);
        y.push(item.gxtrs);
        y2.push(item.gxyrs);
        y3.push(item.gxzrs);
      });

      var option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,.4)",
          textStyle: {
            color: "#fff",
            fontSize: 13,
          },
          // formatter: '{a}<br/>{c}' + '%',
        },
        legend: {
          width: "100%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          icon: "circle",
          // right: "0",
          top: "0%",
          padding: [0, 0],
        },
        grid: {
          top: "10%",
          left: "1%",
          right: "1%",
          bottom: "12%",
          // containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
              symbolSize: [7, 10],
              symbolOffset: [0, 8],
              lineStyle: {
                color: "#rgba(0,145,255,1)",
              },
            },
            //箭头一端没效果,一端箭头
            //  symbolSize:[7,10],
            //  symbolOffset:[0,8],
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#d1e6eb",
                margin: 15,
              },
            },
            axisTick: {
              show: false,
            },
            data: x,
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#0a3256",
              },
            },
            symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
            //  symbolSize:[7,10],
            //  symbolOffset:[0,8],
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
              symbolSize: [7, 10],
              symbolOffset: [0, 8],
              lineStyle: {
                color: "#979797",
              },
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#979797",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "高血糖人数",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#4BF0FF", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
            itemStyle: {
              normal: {
                color: "#4BF0FF",
              },
            },

            data: y,
          },
          {
            name: "高血压人数",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#50EB45", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
            itemStyle: {
              normal: {
                color: "#50EB45",
              },
            },

            data: y2,
          },
          {
            name: "高血脂人数",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#F7B500", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
            itemStyle: {
              normal: {
                color: "#F7B500",
              },
            },

            data: y3,
          },
        ],
      };

      sgrslnbhqk.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        sgrslnbhqk.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % y.length;
        sgrslnbhqk.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });

        sgrslnbhqk.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: inda,
        });
      }, this.timeInterval);
      this.timer = timer
    },
  },
};
</script>

<style scoped lang="less">
.threeHigh {
  width: 100%;
  height: 100%;
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  .tit {
    font-family: SourceHanSansCN-Heavy;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    // margin-bottom: 0px;
  }
  .txt {
    text-align: center;
    margin-top: 20px;
    .qyxxnumber {
      margin-top: 10px;
    }
  }
  .topsxl {
    margin-top: 10px;
  }
  #sgrslnbhqk {
    width: 90%;
    margin: 5px auto 0 auto;
    height: 210px;
  }
}
</style>