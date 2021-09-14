<template>
  <div class="disease">
    <div class="bigtit" style="height: 6%">
      <div class="tag"></div>
      <div>疾病</div>
    </div>
    <div class="jb">
      <div class="left">
        <div class="lefttit">老年疾病排行TOP10</div>
        <div class="list" ref="jblist">
          <div v-for="(p, index) in lnzt_st" :key="index">
            <div>
              {{ `TOP${p.ph.length == 1 ? "0" + p.ph : p.ph}` }}
            </div>
            <div>{{ p.mc }}</div>
            <div>{{ p.rs }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="sg">
          <div>
            <div>高血压人数</div>
            <div>{{ lnzt_st2.gxyrs }}</div>
          </div>
          <div>
            <div>高血脂人数</div>
            <div>{{ lnzt_st2.gxzrs }}</div>
          </div>
          <div>
            <div>高血糖人数</div>
            <div>{{ lnzt_st2.gxtrs }}</div>
          </div>
        </div>
        <div id="sgrslnbhqk"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 疾病
export default {
  name: "disease",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      lnzt_st: [],
      lnzt_st2: {},
      lnzt_st3: [],

      chart: null,
    };
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.itMyChart5);
  },
  mounted() {
    this.getdata();
    window.addEventListener("resize", this.itMyChart5);
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
            // console.log("disease", optionsdata);
            this.lnzt_st = optionsdata.data[0].slice(0, 10);
            this.lnzt_st2 = optionsdata.data[1][0];
            this.lnzt_st3 = optionsdata.data[2].reverse();
            this.itMyChart5();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itMyChart5() {
      if (this.chart) {
        this.chart.dispose();
      }
      let sgrslnbhqk = this.$echarts.init(
        document.getElementById("sgrslnbhqk")
      );
      this.chart = sgrslnbhqk;
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
          axisPointer: {
            //鼠标触发时显示方式
            type: "line", //鼠标触发时显示灰色方框
            lineStyle: {
              width: 2,
            },
          },
          textStyle: {
            color: "#fff",
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
          formatter: "{a0}: {c0}<br/>{a1}: {c1}<br/>{a2}: {c2}",
        },
        legend: {
          width: "100%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
          icon: "circle",
          // right: "0",
          top: "4%",
        },
        grid: {
          top: "25%",
          left: "1%",
          right: "1%",
          bottom: "20%",
          // containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: false,
              symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
              symbolSize: [7, 10],
              symbolOffset: [0, 8],
              lineStyle: {
                color: "#rgba(0,145,255,1)",
                fontSize: (14 / 1080) * document.body.scrollHeight,
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
                fontSize: (14 / 1080) * document.body.scrollHeight,
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
                fontSize: (14 / 1080) * document.body.scrollHeight,
              },
            },
            symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
            //  symbolSize:[7,10],
            //  symbolOffset:[0,8],
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: false,
              symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
              symbolSize: [7, 10],
              symbolOffset: [0, 8],
              lineStyle: {
                color: "#979797",
                fontSize: (14 / 1080) * document.body.scrollHeight,
              },
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#979797",
                fontSize: (14 / 1080) * document.body.scrollHeight,
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
                fontSize: (14 / 1080) * document.body.scrollHeight,
              },
            },
            itemStyle: {
              normal: {
                color: "#4BF0FF",
                fontSize: (14 / 1080) * document.body.scrollHeight,
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
                fontSize: (14 / 1080) * document.body.scrollHeight,
              },
            },
            itemStyle: {
              normal: {
                color: "#50EB45",
                fontSize: (14 / 1080) * document.body.scrollHeight,
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
                fontSize: (14 / 1080) * document.body.scrollHeight,
              },
            },
            itemStyle: {
              normal: {
                color: "#F7B500",
                fontSize: (14 / 1080) * document.body.scrollHeight,
              },
            },

            data: y3,
          },
        ],
      };

      sgrslnbhqk.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
.disease {
  width: 100%;
  color: #fff;
  box-sizing: border-box;
  position: relative;
  .hide {
    visibility: hidden;
  }

  .jb {
    height: 94%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .left {
      height: 48%;
      width: 100%;
      > div {
        width: 80%;
        margin: 0 auto;
      }
      .lefttit {
        background: rgba(32, 97, 188, 0.31);
        border: 1px solid rgba(148, 193, 255, 0.31);
        font-family: MicrosoftYaHei;
        font-size: 1.4rem;
        color: #bcf6ff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10%;
      }
      .list {
        margin-top: 0.5rem;
        height: calc(90% - 1rem);
        cursor: s-resize;
        overflow-y: scroll;
        > div {
          display: flex;
          height: calc(19% - 0.5rem);
          margin-bottom: 0.5rem;
          background: rgba(49, 127, 239, 0.27);
          border: 1px solid #94c1ff;
          overflow: hidden;
          > div {
            flex: 2;
            display: flex;
            align-items: center;
          }
          > div:nth-child(1) {
            font-family: MicrosoftYaHei;
            font-size: 1.4rem;
            color: #32c5ff;
            justify-content: center;
          }
          > div:nth-child(2) {
            flex: 3;
            font-family: MicrosoftYaHei;
            font-size: 1.4rem;
            color: #bde2fc;
            text-align: center;
          }
          > div:nth-child(3) {
            font-family: DINPro-Medium;
            font-size: 1.4rem;
            color: #fdc239;
            text-align: center;
          }
        }
      }
    }
    .right {
      height: 50%;
      width: 100%;
      .sg {
        display: flex;
        justify-content: space-around;
        height: 20%;
        > div {
          > div:nth-child(1) {
            font-family: MicrosoftYaHei;
            font-size: 1.6rem;
            color: #ffffff;
          }
          > div:nth-child(2) {
            font-family: DINPro-Medium;
            font-size: 2.6rem;
            color: #00eaff;
          }
        }
      }
      #sgrslnbhqk {
        height: 80%;
      }
    }
  }
}
</style>