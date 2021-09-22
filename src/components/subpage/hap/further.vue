<template>
  <div class="further">
    <div class="bigtit">
      <div class="tag"></div>
      <div>学前</div>
    </div>
    <div class="content">
      <div>
        <div class="cynumber">{{ xueqiandata.yeysl }}</div>
        <div class="cycolor">全县幼儿园</div>
      </div>
      <div>
        <div class="cynumber">{{ xueqiandata.jssl }}</div>
        <div class="cycolor">幼儿园老师</div>
      </div>
      <div>
        <div class="cynumber">{{ xueqiandata.xssl }}</div>
        <div class="cycolor">幼儿园学生</div>
      </div>
    </div>
    <div id="zspblnqk"></div>
  </div>
</template>

<script>
// 学前
import echarts from "echarts";
export default {
  name: "further",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      xueqiandata: {},
      xueqianechart: [],
      chart:null,
      timeInterval: 2000,
      timer: null
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
        url: this.baseUrl + "/index/home/yezt_xq",
        // data: data,
      })
        .then((res) => {
          let optionsdata = res.data;
          //   console.log(optionsdata)
          if (optionsdata.code == 200) {
            this.xueqiandata = optionsdata.data[0][0];
            this.xueqianechart = optionsdata.data[1];
            // console.log(  optionsdata.data,44444)
            this.drawing();
          }
          //  console.log(optionsdata,88)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawing() {
      if (this.chart) {
        this.chart.dispose();
      }
      let zspblnqk = this.$echarts.init(document.getElementById("zspblnqk"));
      this.chart = zspblnqk;
      var x = [];
      var y = [];
      this.xueqianechart.map((item) => {
        x.push(item.nx);
        y.push(item.szpb);
      });
      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: "师资配比历年变化情况",
          // "subtext": "BY MICVS",
          x: "0%",
          y: "0%",

          textStyle: {
            color: "#fff",
            fontSize:(14 / 1080) * document.body.scrollHeight ,
          },
        },
        tooltip: {
          trigger: "axis",
          show: true,
          formatter: "{b} {c}",
          textStyle:{
            fontSize:(14 / 1080) * document.body.scrollHeight
          },
        },
        grid: {
          top: "28%",
          left: "1%",
          right: "6%",
          bottom: "2%",
          containLabel: true,
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
                color: "#979797",
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
                fontSize:(14 / 1080) * document.body.scrollHeight,
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
                color: "#d1e6eb",
                fontSize:(14 / 1080) * document.body.scrollHeight ,
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "注册总量",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#67FFF5", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
                fontSize:(14 / 1080) * document.body.scrollHeight,
              },
            },
            itemStyle: {
              normal: {
                color: "#67FFF5",
              },
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#67FFF5",
                    },
                    {
                      offset: 1,
                      color: "rgba(103,255,245,0.00)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(255,255,255,0)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y,
          },
        ],
      };

      zspblnqk.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        zspblnqk.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % y.length;
        zspblnqk.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });

        zspblnqk.dispatchAction({
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
.further {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  .content {
    display: flex;
    justify-content: center;
    height: 20%;
    position: relative;
    top: -2rem;
    .cynumber {
      font-family: DINAlternate-Bold;
      font-size: 2.22vh;
      color: #ffee72;
      letter-spacing: 0;
      text-shadow: 0 0 4px #ffee72;
    }
    .cycolor {
      font-family: MicrosoftYaHei;
      font-size: 1.4rem;
      color: #ffffff;
      letter-spacing: 0;
      padding: 0 4px;
      background-image: url("../../../assets/subpage/group.png");
      background-size: 100% 100%;
    }
    > div {
      text-align: center;
      margin: 0 10px;
    }
  }
  #zspblnqk {
    width: 100%;
    height: 73%;
    position: relative;
    top: -2rem;
    
  }
}
</style>