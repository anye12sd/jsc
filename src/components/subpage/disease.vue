<template>
  <div class="disease">
    <div class="bigtit">
      <div class="tag"></div>
      <div>老年主题</div>
      <div class="tabs">
        <div :class="active == 0 ? 'active' : ''" @click="change(0)">疾病</div>
        <div :class="active == 1 ? 'active' : ''" @click="change(1)">寿命</div>
        <div :class="active == 2 ? 'active' : ''" @click="change(2)">
          社会保障
        </div>
      </div>
    </div>
    <div :class="'jb'+(active == 0 ? '':' hide')">
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
    <life :class="active == 1 ? '' :'hide'"></life>
    <social :class="active == 2 ? '' :'hide'"></social>
  </div>
</template>

<script>
// 疾病
import life from './life.vue'
import social from './social.vue'
export default {
  name: "disease",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      lnzt_st: [],
      lnzt_st2: {},
      lnzt_st3: [],
      active: 0,
      chart:null,
    };
  },
  components:{
    life,social
  },
  mounted() {
    this.getdata();
    window.addEventListener("resize", () => {
      this.itMyChart5();
    });
  },
  methods: {
    change(val) {
      this.active = val;
    },
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
      this.chart = sgrslnbhqk
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
          top: "0%",
          margin: [15, 0],
        },
        grid: {
          top: "20%",
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
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  position: relative;
  .hide{
    visibility: hidden;
  }
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
  .jb {
    display: flex;
    height: 89%;
    width: 100%;
    position: absolute;
    > div {
      width: 50%;
    }
    .left {
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