<template>
  <div class="life">
    <div class="left">
      <div>
        <div class="qyxxtitle4">上年全国平均寿命</div>
        <div class="qyxxnumber">{{ lnzt_sw.qgrjsm }}</div>
      </div>
      <div>
        <div class="qyxxtitle4">上年男平均寿命</div>
        <div class="qyxxnumber">{{ lnzt_sw.nxrjsm }}</div>
      </div>
      <div>
        <div class="qyxxtitle4">上年长兴人均寿命</div>
        <div class="qyxxnumber">{{ lnzt_sw.cxrjsm }}</div>
      </div>
      <div>
        <div class="qyxxtitle4">上年女平均寿命</div>
        <div class="qyxxnumber">{{ lnzt_sw.vxrjsm }}</div>
      </div>
    </div>
    <div class="right">
      <div id="pjnlbh"></div>
    </div>
  </div>
</template>

<script>
// 寿命
export default {
  naem: "life",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      lnzt_sw: {},
      lnzt_sw1: [],
      chart:null,
    };
  },
  mounted() {
    this.getdata();
    window.addEventListener("resize", this.drawing);
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.drawing)
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/lnzt_sw",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.lnzt_sw = optionsdata.data[0][0];
            this.lnzt_sw1 = optionsdata.data[1];
            this.drawing();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawing() {
      if (this.chart) {
        this.chart.dispose();
      }
      let pjnlbh = this.$echarts.init(document.getElementById("pjnlbh"));
      this.chart = pjnlbh
      var x = [];
      var y = [];
      var y2 = [];
      var y3 = [];
      // console.log(this.lnzt_st3,9863)
      this.lnzt_sw1.map((item, index) => {
        x.push(item.nx);
        y.push(item.cxrjsm);
        y2.push(item.nxrjsm);
        y3.push(item.vxrjsm);
      });

      var option = {
        title: {
          text: "历年平均年龄变化",
          x: "0%",
          y: "0%",

          textStyle: {
            color: "#fff",
            fontSize:(14 / 1080) * document.body.scrollHeight ,
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,.4)",
          textStyle: {
            color: "#fff",
            fontSize:(14 / 1080) * document.body.scrollHeight ,
          },
          // formatter: '{a}<br/>{c}' + '%',
        },
        grid: {
          top: "20%",
          left: "15%",
          right: "1%",
          bottom: "12%",
          // containLabel: true,
        },
        legend: {
          width: "100%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize:(14 / 1080) * document.body.scrollHeight ,
          },
          icon: "circle",
          // right: "0",
          top: "10%",
          padding: [0, 0],
          // itemGap: 40,
          // data: [
          //   "测量工",
          //   "电焊工",
          //   "钢筋工",
          //   "沥青工",
          //   "安装工",
          //   "起重工",
          //   "养护工",
          //   "其它",
          // ],
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
            type: "category",
            boundaryGap: false,
            // min: 0,
            // max: 140,
            // splitNumber: 7,
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
                color: "#d1e6eb",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],

        series: [
          {
            name: "长兴人均",
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
            name: "男性人均",
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
            name: "女性人均",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#F7B500", // 线条颜色
                //  color: "rgba(125,62,144,1)", // 线条颜色
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

      pjnlbh.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
.life {
  width: 100%;
  height: 89%;
  color: #fff;
  box-sizing: border-box;
  display: flex;
  position: absolute;
  .left {
    width: 45%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    > div {
      width: 50%;
      margin-bottom: 2rem;
      > div {
        padding-left: 10%;
      }
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
  }
  .right {
    width: 55%;
  }
  #pjnlbh {
    width: 100%;
    height: 94%;
    margin: 5px auto 0 auto;
  }
}
</style>