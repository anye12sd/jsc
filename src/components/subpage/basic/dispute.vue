<template>
  <div id="dispute">
    <div class="bigtit">
      <div class="tag"></div>
      <div>矛盾纠纷</div>
    </div>
    <div class="menu">
      <div :class="active == 0 ? 'active' : ''" @click="swit(0)">
        矛盾纠纷量
      </div>
      <div :class="active == 1 ? 'active' : ''" @click="swit(1)">
        近六月调解率
      </div>
    </div>
    <div class="content">
      <div class="last-month-box">
        <template v-if="active == 0">
          <div class="last-month-header flex">
            <div class="last-month-header-left flex-2">
              <div class="last-month-header-title">上月矛盾纠纷量</div>
              <div class="last-month-header-number">{{ monthContradictionNum }}</div>
            </div>
            <div class="last-month-header-right flex-3">
              <div class="last-month-header-title">上月全省区县平均矛盾量</div>
              <div class="last-month-header-number">{{ averageContradictionNum }}</div>
            </div>
          </div>
          <div id="chart1"></div>
        </template>
        <template v-else>
          <div id="chart3"></div>
        </template>
        <div style="height: 120%">
          <div class="xinfang">
            <div class="bigtit">
              <div class="tag"></div>
              <div>信访统计</div>
            </div>
            <div class="xinfang-num flex">
              <div class="flex-1 xinfang-num-left">信访人员数量</div>
              <div class="flex-1 xinfang-num-right">{{ xfPersonNum }}</div>
            </div>
          </div>
          <div id="chart2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "dispute",
  data(){
    return {
      active: 0,
      averageContradictionNum: 0,
      monthContradictionNum: 0,
      contradictionTypeProportion: [],
      informationList: [],
      sixMonthContradictionRate: [],
      xfPersonNum: 0,
      chart1: "",
      chart2: "",
      chart3: "",
      timeInterval: 2000,
      timer: null
    }
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
        url: "api/front-jczl-dpm/jczl/json/mtxf.json",
      })
          .then((res) => {
            let optionsdata = res.data.data;
            this.averageContradictionNum = optionsdata.averageContradictionNum
            this.monthContradictionNum = optionsdata.monthContradictionNum
            this.contradictionTypeProportion = optionsdata.contradictionTypeProportion
            this.informationList = optionsdata.informationList
            this.sixMonthContradictionRate = optionsdata.sixMonthContradictionRate
            this.drawing()
          })
          .catch((err) => {
            console.log(err);
          });
          this.$axios({
            method: "post",
            url: "api/zhzlApi/jscdp/xfStat",
          })
              .then((res) => {
                let optionsdata = res.data.data;
                this.xfPersonNum = optionsdata.xfPersonNum
              })
              .catch((err) => {
                console.log(err);
              });
    },
    drawing(){
      if(this.active == 0){
        this.drawingChart1()
      }else{
        this.drawingChart3()
      }
      this.drawingChart2()
    },
    drawingChart1(){
      if (this.chart1) {
        this.chart1.dispose();
      }
      let chart1 = echarts.init(document.getElementById("chart1"));
      this.chart1 = chart1
      let data = [];
      let allValue = 0
      this.contradictionTypeProportion.forEach((item) => {
        data.push({
          name: item.name,
          value: item.value,
        });
        allValue += item.value
      });
      let option = {
        // title: {
        //   text: "总量占比情况",
        //   left: 0,
        //   top: 30,
        //   textStyle: {
        //     fontStyl: "SourceHanSansCN-Bold",
        //     fontSize: 17.6,
        //     color: "#FFFFFF",
        //   },
        // },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
        },
        grid: {
          top: 20,
        },
        legend: {
          icon:'circle',
          orient: "vertical",
          right: "15%",
          bottom: "10%",
          textStyle: {
            color: "#fff",
            fontSize:(16 / 1080) * document.body.scrollHeight,
          },
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "80%"],
            center: ["30%", "50%"],
            label: {
              show: false,
              fontSize: (20 / 1080) * document.body.scrollHeight,
            },
            color: [
              "#4AFFB7",
              "#FFBE00",
              "#FF6E4C",
              "#26C1FF",
              "#AA07E1",
            ],
            // labelLine: {
            //   length: 6,
            //   length2: 6,
            // },
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      chart1.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart1.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % data.length;
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
      let data = [];
      let allValue = 0
      this.informationList.forEach((item) => {
        data.push({
          name: item.name,
          value: item.value,
        });
        allValue += item.value
      });
      let option = {
        // title: {
        //   text: "总量占比情况",
        //   left: 0,
        //   top: 30,
        //   textStyle: {
        //     fontStyl: "SourceHanSansCN-Bold",
        //     fontSize: 17.6,
        //     color: "#FFFFFF",
        //   },
        // },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
        },
        grid: {
          top: 20,
        },
        legend: {
          icon:'circle',
          orient: "vertical",
          right: "15%",
          bottom: "25%",
          textStyle: {
            color: "#fff",
            fontSize:(16 / 1080) * document.body.scrollHeight,
          },
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "80%"],
            center: ["30%", "50%"],
            label: {
              show: false,
              fontSize: (20 / 1080) * document.body.scrollHeight,
            },
            color: [
              "#FFBE00",
              "#4AFFB7",
              "#024EE1",
            ],
            // labelLine: {
            //   length: 6,
            //   length2: 6,
            // },
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      chart2.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart2.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % data.length;
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
    },
    drawingChart3(){
      if (this.chart3) {
        this.chart3.dispose();
      }
      let chart3 = echarts.init(document.getElementById("chart3"));
      this.chart3 = chart3
      var x = this.sixMonthContradictionRate.xData;
      var y = this.sixMonthContradictionRate.yData;
      var y1 = this.sixMonthContradictionRate.yData2;
      let min = [Math.min(...y),Math.min(...y1)]
      min = Math.min(...min)

      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: "近6个月矛盾纠纷调解成功率",
          // "subtext": "BY MICVS",
          x: "0%",
          y: "0%",
          textStyle: {
            color: "#fff",
            fontSize: (16 / 1080) * document.body.scrollHeight,
          },
        },
        // legend: {
        //   right: "15px",
        //   top: "0",
        //   width: "170px",
        //   height: "100px",
        //   type: "plain",
        //   textStyle: {
        //     color: "#fff",
        //     fontFamily: "SourceHanSansCN-Norma",
        //     fontSize: (16 / 1080) * document.body.scrollHeight,
        //   },
        // },
        tooltip: {
          show: true,
          trigger: "axis",
          textStyle:{
            fontSize:(14 / 1080) * document.body.scrollHeight
          },
          formatter: (param) => {
            var str = "";
            str = `${param[0].name}`;
            param.forEach((item) => {
              if (item.data) {
                str += `<br>${item.seriesName} ${item.data}`;
              }
            });
            return str;
          },
        },
        grid: {
          top: "25%",
          left: "0%",
          right: "3%",
          bottom: "3%",
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
                fontSize: (12 / 1080) * document.body.scrollHeight,
              },
            },
            //箭头一端没效果,一端箭头
            //  symbolSize:[7,10],
            //  symbolOffset:[0,8],
            axisLabel: {
              //坐标轴刻度标签的相关设置
              show: true,
              formatter : function(params){
                let value1 = params.split('年')
                let str = value1[0] + '年' + '\n' + value1[1]
                return str
              },
              textStyle: {
                color: "#fff",
                margin: (15 / 1080) * document.body.scrollHeight,
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
            // name: "亿美元",
            // // min: 0,
            // // max: 250,
            // position: 'right',
            min: Math.floor(min),
            max: Math.max(...y),
            nameTextStyle: {
              color: "#fff",
              fontSize: (12 / 1080) * document.body.scrollHeight,
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
              fontSize: (12 / 1080) * document.body.scrollHeight,
              lineStyle: {
                color: "#979797",
                fontSize: (12 / 1080) * document.body.scrollHeight,
              },
            },
            axisLabel: {
              margin: (20 / 1080) * document.body.scrollHeight,
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
            type: "line",
            name: '长兴县矛盾纠纷调解率',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#F7B500", // 线条颜色
              },
              borderColor: "#F7B500",
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
            tooltip: {
              show: true,
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
          {
            type: "line",
            name: '全省区县平均矛盾纠纷调解率',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#00f7dc", // 线条颜色
              },
              borderColor: "#00f7dc",
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
                color: "#00f7dc",
              },
            },
            tooltip: {
              show: true,
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
                        color: "#00f7dc",
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255, 0)",
                      },
                    ],
                    false
                ),
                shadowColor: "#00f7dc", //阴影颜色
                shadowBlur: 0, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y1,
          },
        ],
      };
      chart3.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart3.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % y.length;
        chart3.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });
        chart3.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: inda,
        });
      }, this.timeInterval);
      this.timer = timer
    },
    swit(val) {
      if (val == this.active) return;
      this.active = val;
      if(val == 0){
        if(this.chart3){
          this.chart3.dispose()
        }
        this.$nextTick(function(){
          this.drawingChart1()
          this.drawingChart2()
        })
      }else{
        if(this.chart1){
          this.chart1.dispose()
        }
        this.$nextTick(function(){
          this.drawingChart3()
          this.drawingChart2()
        })
      }
    },
  }
}
</script>

<style scoped>
#dispute {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  position: relative;
}
.bigtit{
  height: 5%;
}
.content {
  position: relative;
  height: 89%;
}
.menu {
  position: absolute;
  top: 0px;
  right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.menu div {
  cursor: pointer;
  background: #0f3264;
  border: 1px solid #2061bc;
  border-radius: 0 2px 2px 0;
  font-family: MicrosoftYaHei;
  font-size: 1.3rem;
  color: #bcf6ff;
  padding: 2px 5px;
}
.menu .active {
  background-image: linear-gradient(
      179deg,
      #3688ff 19%,
      #1a57ab 63%,
      #1c3e68 100%
  );
  border: 1px solid #94c1ff;
  border-radius: 2px 0 0 2px;
  font-family: MicrosoftYaHei;
  font-size: 1.4rem;
  color: #ffffff;
}
.flex{
  display: flex;
}
.flex-1{
  flex: 1;
}
.flex-2{
  flex: 2;
}
.flex-3{
  flex: 3;
}
.last-month-box{
  height: 44%;
}
.last-month-header{
  margin: 8px 15px 0 15px;
}
.last-month-header-number{
  color: #32C5FF;
  font-size: 2.2rem;
  margin-top: 3px;
}
#chart1{
  width: 100%;
  height: 90%;
}
.xinfang-title{
  font-weight: 600;
  font-size: 1.6rem;
  margin-top: 4px;
}
.xinfang-num{
  font-size: 1.8rem;
  margin-top: 3px;
}
.xinfang-num-left{
  text-align: right;
  margin-right: 10px;
}
.xinfang-num-right{
  margin-left: 10px;
  color: #32C5FF;
  font-size: 2.2rem;
}
#chart2{
  width: 100%;
  height: 75%;
}
#chart3{
  width: 100%;
  height: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>