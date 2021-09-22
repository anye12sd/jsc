<template>
  <div id="civilization">
    <div class="bigtit">
      <div class="tag"></div>
      <div>{{ child01.label }}</div>
    </div>
    <div class="content">
      <div class="civilization-box flex" v-if="child01.data.length">
        <div class="civilization-box-detail civilization-box-detail-blue flex-1">
          <span class="civilization-box-detail-num">{{child01.data[0].value}}</span>
          <span v-html="child01.data[0].label" class="civilization-box-detail-text"></span>
        </div>
        <div class="civilization-box-detail civilization-box-detail-green flex-1">
          <span class="civilization-box-detail-num">{{child01.data[1].value}}</span>
          <span v-html="child01.data[1].label" class="civilization-box-detail-text"></span>
        </div>
        <div class="civilization-box-detail civilization-box-detail-yellow flex-1">
          <span class="civilization-box-detail-num">{{child01.data[2].value}}</span>
          <span v-html="child01.data[2].label" class="civilization-box-detail-text"></span>
        </div>
        <div class="civilization-box-detail civilization-box-detail-blue flex-1">
          <span class="civilization-box-detail-num">{{child01.data[3].value}}</span>
          <span v-html="child01.data[3].label" class="civilization-box-detail-text"></span>
        </div>
      </div>
      <div class="chart1-box">
        <div class="bigtit">
          <div class="tag"></div>
          <div>{{ child02.label }}</div>
        </div>
        <div id="chart1"></div>
      </div>
      <div class="chart2-box">
        <div class="bigtit">
          <div class="tag"></div>
          <div>{{ child03.label }}</div>
        </div>
        <div id="chart2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "civilization",
  data(){
    return {
      child01: {data: []},
      child02: {},
      child03: {},
      chart1: "",
      chart2: "",
      timeInterval: 2000,
      timer: null
    }
  },
  mounted() {
    this.getData()
    window.addEventListener("resize", this.drawing);
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.drawing)
  },
  methods: {
    getData(){
      this.$axios({
        method: "post",
        url: "api/zhzlApi/jscdp/wmcxStat",
      })
          .then((res) => {
            let optionsdata = res.data.data;
            this.child01 = optionsdata.child01
            this.child02 = optionsdata.child02
            this.child03 = optionsdata.child03
            this.$nextTick(function(){
              this.drawing()
            })
          })
          .catch((err) => {
            console.log(err);
          });
    },
    drawing(){
      this.drawingChart1()
      this.drawingChart2()
    },
    drawingChart1(){
      if (this.chart1) {
        this.chart1.dispose();
      }
      let chart1 = echarts.init(document.getElementById("chart1"));
      this.chart1 = chart1
      var x = [];
      var y = [];
      this.child02.data.map((item) => {
        x.push(item.label);
        y.push(item.value);
      });
      var option = {
        // title: {
        //   text: "固定资产投资",
        //   // "subtext": "BY MICVS",
        //   x: "0%",
        //   y: "0%",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: (16 / 1080) * document.body.scrollHeight,
        //   },
        // },
        tooltip: {
          trigger: "axis",
          show: true,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          textStyle: {
            color: "#fff",
            fontSize:(14 / 1080) * document.body.scrollHeight
          },
          position: (para) => {
            return [para[0] + 10, para[1] + 10];
          },
          formatter: function (params) {
            var str = "";
            str = `${params[0].name} : ${params[0].value}`
            return str;
          },
        },
        grid: {
          top: "18%",
          left: "5%",
          right: "11%",
          bottom: "8%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            nameTextStyle: {
              color: "#fff",
              fontSize: (14 / 1080) * document.body.scrollHeight,
              // padding:[10,0,0 ,0]
            },
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
              formatter : function(params){
                let value1 = params.split('年')
                let str = value1[0] + '年' + '\n' + value1[1]
                return str
              },
              textStyle: {
                color: "#fff",
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
            // name: "总额增长率%",
            // max: 140,
            nameTextStyle: {
              color: "#fff",
              fontSize: (14 / 1080) * document.body.scrollHeight,
              padding: [10, 0, 0, 0],
            },
            splitNumber: 4,
            splitLine: {
              show: false,
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
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "总数",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#00F7DC", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
            itemStyle: {
              normal: {
                color: "#00F7DC",
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
                        color: "#00F7DC",
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255, 0)",
                      },
                    ],
                    false
                ),
                shadowColor: "#00F7DC", //阴影颜色
                shadowBlur: 0, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y,
          },
        ],
      };
      //   tzbzqk.on("click", function (params) {
      //     // console.log(_that.cyhl_gdzc[params.dataIndex].include,1234);
      //     _that.itMyChart4(_that.cyhl_gdzc[params.dataIndex].include.reverse());
      //   });
      chart1.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart1.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % y.length;
        chart1.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });

        chart1.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: inda,
        });
      }, this.timeInterval);
      this.timer = timer
    },
    drawingChart2(){
      if (this.chart2) {
        this.chart2.dispose();
      }
      let chart2 = echarts.init(document.getElementById("chart2"));
      this.chart2 = chart2
      var x = [];
      var y = [];
      this.child03.data.map((item) => {
        x.push(item.label);
        y.push(item.value);
      });
      var option = {
        // title: {
        //   text: "固定资产投资",
        //   // "subtext": "BY MICVS",
        //   x: "0%",
        //   y: "0%",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: (16 / 1080) * document.body.scrollHeight,
        //   },
        // },
        tooltip: {
          trigger: "axis",
          show: true,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          textStyle: {
            color: "#fff",
            fontSize:(14 / 1080) * document.body.scrollHeight
          },
          position: (para) => {
            return [para[0] + 10, para[1] + 10];
          },
          formatter: function (params) {
            var str = "";
            str = `${params[0].name} : ${params[0].value}`
            return str;
          },
        },
        grid: {
          top: "18%",
          left: "5%",
          right: "11%",
          bottom: "8%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            nameTextStyle: {
              color: "#fff",
              fontSize: (14 / 1080) * document.body.scrollHeight,
              // padding:[10,0,0 ,0]
            },
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
              formatter : function(params){
                let value1 = params.split('年')
                let str = value1[0] + '年' + '\n' + value1[1]
                return str
              },
              textStyle: {
                color: "#fff",
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
            // name: "总额增长率%",
            // max: 140,
            nameTextStyle: {
              color: "#fff",
              fontSize: (14 / 1080) * document.body.scrollHeight,
              padding: [10, 0, 0, 0],
            },
            splitNumber: 4,
            splitLine: {
              show: false,
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
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "总数",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#F7B500", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: false,
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
                        color: "#F7B500",
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255, 0)",
                      },
                    ],
                    false
                ),
                shadowColor: "#F7B500", //阴影颜色
                shadowBlur: 0, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y,
          },
        ],
      };
      //   tzbzqk.on("click", function (params) {
      //     // console.log(_that.cyhl_gdzc[params.dataIndex].include,1234);
      //     _that.itMyChart4(_that.cyhl_gdzc[params.dataIndex].include.reverse());
      //   });
      chart2.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart2.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % y.length;
        chart2.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });

        chart2.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: inda,
        });
      }, this.timeInterval);
      this.timer = timer
    }
  }
}
</script>

<style scoped>
#civilization {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.bigtit{
  height: 3.5%;
}
.flex{
  display: flex;
}
.flex-1{
  flex: 1;
}
.content{
  height: 93%;
}
.civilization-box{
  margin-top: 15px;
  height: 33%;
}
.civilization-box-detail{
  text-align: center;
  width: 60px;
  height: 60px;
}
.civilization-box-detail-blue{
  background: url("../../../assets/subpage/blue@1x.png") no-repeat center;
  background-size: 60px;
}
.civilization-box-detail-green{
  background: url("../../../assets/subpage/green@1x.png") no-repeat center;
  background-size: 60px;
}
.civilization-box-detail-yellow{
  background: url("../../../assets/subpage/yellow@1x.png") no-repeat center;
  background-size: 60px;
}
.civilization-box-detail-num{
  display: block;
  font-size: 2.2rem;
  padding-top: 20px;
}
.civilization-box-detail-text{
  display: block;
  padding-top: 25px;
}
.chart1-box{
  height: 33%;
}
#chart1{
  width: 100%;
  height: 100%;
}
.chart2-box{
  height: 33%;
}
#chart2{
  width: 100%;
  height: 100%;
}
</style>