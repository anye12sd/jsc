<template>
  <div class="attractInvestment">
    <div class="tit">招商引资</div>
    <div class="main">
      <div>
        <div>合同外资金额</div>
        <div>{{ cyhl_zsyz.htwzje }}&nbsp;亿美元</div>
        <div>实际到账金额</div>
        <div>{{ cyhl_zsyz.sjdzje }}&nbsp;亿美元</div>
      </div>
      <div id="zsyz"></div>
    </div>
  </div>
</template>

<script>
// 招商引资
export default {
  name: "attractInvestment",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      cyhl_zsyz: {},
      cyhl_zsyz1: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl+"/index/economic/cyhl_zsyz",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.cyhl_zsyz = optionsdata.data[0][0];
            this.cyhl_zsyz1 = optionsdata.data[1];
            console.log(this.cyhl_zsyz,this.cyhl_zsyz1)
          }
          this.drawing();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawing() {
      let zsyz = this.$echarts.init(document.getElementById("zsyz"));
      var x = [];
      var y = [];
      var y1 = [];
      this.cyhl_zsyz1.map((item, index) => {
        x.push(item.nx);
        y.push(item.htwzje);
        y1.push(item.sjdzje);
      });

      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: "外资历年情况",
          // "subtext": "BY MICVS",
          x: "0%",
          y: "0%",

          textStyle: {
            color: "#fff",
            fontSize: "16",
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "13",
          },
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
          top: "14%",
          padding: [0, 0],
        },
        tooltip: {},
        grid: {
          top: "27%",
          left: "1%",
          right: "11%",
          bottom: "8%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            name: "时间",
            nameTextStyle: {
              color: "#fff",
              fontSize: "14",
              // padding:[10,0,0 ,0]
            },
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
              symbolSize: [7, 10],
              symbolOffset: [0, 8],
              lineStyle: {
                color: "#90979c",
                fontSize: "18",
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
            // type: "value",
            type: "value",
            name: "亿美元",
            // // min: 0,
            // // max: 250,
            // position: 'right',
            min: 0,
            // max: 140,
            nameTextStyle: {
              color: "#fff",
              fontSize: "14",
              padding: [10, 0, 0, 0],
            },
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
              fontSize: "18",
              lineStyle: {
                color: "#90979c",
                fontSize: "18",
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
            name: "合同外资金额",
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
              borderColor: "#50EB45",
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
            tooltip: {
              show: false,
            },

            data: y,
          },
          {
            name: "实际到账金额",
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
              borderColor: "#50EB45",
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
            tooltip: {
              show: false,
            },

            data: y1,
          },
        ],
      };

      zsyz.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
.attractInvestment {
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
  .main {
    display: flex;
    margin-top: 20px;
    text-align: center;
    > div:nth-of-type(1) {
      width: 30%;
      > div:nth-of-type(2n) {
        padding: 10px 0 25px 0;
      }
      > div:nth-of-type(2n+1) {
        padding: 10px 0 0px 0;
      }
    }
    > div:nth-of-type(2) {
      width: 70%;
    }
    #zsyz{
      height: 220px;
    }
  }
}
</style>