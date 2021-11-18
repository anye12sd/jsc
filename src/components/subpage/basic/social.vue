<template>
  <div id="warning">
    <div class="bigtit">
      <div class="tag"></div>
      <div>工矿商贸事故</div>
    </div>
    <div class="content">
      <div class="social-header flex">
        <div class="social-header-left flex-1">
          <div class="in">
            <div>本年度事故起数</div>
            <div style="text-align: left;">
              <span
                  style="
                  font-weight: bold;
                  font-size: 16px;
                  color: #32c5ff;
                "
              >{{ accidentNum }}</span
              >
            </div>
          </div>
          <div class="in" style="margin-left: 12px">
            <div>较去年</div>
            <div
                :class="
                accidentProportion && parseFloat(accidentProportion) * 1 >= 0 ? 'increase' : 'decrease'
              "
            >
              {{ parseInt(accidentProportion) + '%' }}
            </div>
          </div>
        </div>
        <div class="social-header-right flex-1">
          <div class="in">
            <div>本年度死亡人数</div>
            <div>
            <span
                style="
                font-weight: bold;
                font-size: 16px;
                color: #32c5ff;
                margin-right: 4px;
              "
            >{{ deathNum }}</span
            >
            </div>
          </div>
          <div class="in" style="margin-left: 12px">
            <div>较去年</div>
            <div
                :class="
                deathProportion && parseFloat(deathProportion) * 1 >= 0 ? 'increase' : 'decrease'
              "
            >
              {{ parseInt(deathProportion) + '%' }}
            </div>
          </div>
        </div>
      </div>
      <div id="chart4"></div>
      <div class="bigtit">
        <div class="tag"></div>
        <div>交通违章</div>
      </div>
      <div class="social-header flex">
        <div class="social-header-left flex-1">
          <div class="in">
            <div>上月处罚金额</div>
            <div style="text-align: left;">
              <span
                  style="
                  font-weight: bold;
                  font-size: 16px;
                  color: #32c5ff;
                "
              >{{ Math.round(penaltyAmount*0.0001) }}万元</span
              >
            </div>
          </div>
          <div class="in" style="margin-left: 12px">
            <div>较去年</div>
            <div
                :class="
                penaltyAmountProportion && parseFloat(penaltyAmountProportion) * 1 >= 0 ? 'increase' : 'decrease'
              "
            >
              {{ parseInt(penaltyAmountProportion) + '%' }}
            </div>
          </div>
        </div>
        <div class="social-header-right flex-1">
          <div class="in">
            <div>上月案件数量</div>
            <div>
            <span
                style="
                font-weight: bold;
                font-size: 16px;
                color: #32c5ff;
                margin-right: 4px;
              "
            >{{ caseNum }}</span
            >
            </div>
          </div>
          <div class="in" style="margin-left: 12px">
            <div>较去年</div>
            <div
                :class="
                caseNumProportion && parseFloat(caseNumProportion) * 1 >= 0 ? 'increase' : 'decrease'
              "
            >
              {{ parseInt(caseNumProportion) + '%' }}
            </div>
          </div>
        </div>
      </div>
      <div id="chart5"></div>
      <div class="bigtit">
        <div class="tag"></div>
        <div>公关安全隐患类型分析</div>
      </div>
      <div id="chart6"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "social",
  data(){
    return {
      accidentNum: 0,
      deathNum: 0,
      caseNum: 0,
      caseNumProportion: 0,
      penaltyAmount: 0,
      penaltyAmountProportion: 0,
      accidentProportion: 0,
      deathProportion: 0,
      fiveYearAccidentData: {},
      fiveCaseAndMoneyData: {},
      hazardAnalysisData: {},
      chart4: "",
      chart5: "",
      chart6: "",
      timeInterval: 2000,
      timer: null
    }
  },
  mounted() {
    this.getdata()
    window.addEventListener("resize", this.drawing);
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.drawing)
  },
  methods: {
    getdata(){
      let data = btoa('http://jczl.giscloud.cx/zhzlApi/jscdp/shwd')
      let url = process.env.NODE_ENV == "development" ? '/api/zhzlApi/jscdp/shwd' : 'url?url=' + data
      this.$axios({
        method: "get",
        url: url,
      })
          .then((res) => {
            let optionsdata = res.data.data.data;
            // let optionsdata = res.data.data; // 本地环境用这个变量
            this.accidentNum = optionsdata.accidentNum
            this.deathNum = optionsdata.deathNum
            this.accidentProportion = optionsdata.accidentProportion
            this.deathProportion = optionsdata.deathProportion
            this.fiveYearAccidentData = optionsdata.fiveYearAccidentData
            this.caseNum = optionsdata.caseNum
            this.caseNumProportion = optionsdata.caseNumProportion
            this.penaltyAmount = optionsdata.penaltyAmount
            this.penaltyAmountProportion = optionsdata.penaltyAmountProportion
            this.fiveCaseAndMoneyData = optionsdata.fiveCaseAndMoneyData
            this.hazardAnalysisData = optionsdata.hazardAnalysisData
            this.drawing()
          })
          .catch((err) => {
            console.log(err);
          });
    },
    drawing(){
      this.drawingChart4()
      this.drawingChart5()
      this.drawingChart6()
    },
    drawingChart4() {
      if(this.chart4){
        this.chart4.dispose()
      }
      let chart4 = echarts.init(document.getElementById("chart4"));
      this.chart4 = chart4
      let x = this.fiveYearAccidentData.xData;
      let y1 = this.fiveYearAccidentData.yData;
      let max = Math.max(...y1)
      let option = {
        title: {
          text: "近5年工矿商贸事故数量",
          // "subtext": "BY MICVS",
          x: "0%",
          y: "0%",
          textStyle: {
            color: "#fff",
            fontSize: (16 / 1080) * document.body.scrollHeight,
          },
        },
        // legend: {
        //   right: "50px",
        //   top: "5px",
        //   width: "200px",
        //   height: "100px",
        //   type: "plain",
        //   textStyle: {
        //     color: "#FFFFFF",
        //     fontFamily: "SourceHanSansCN-Norma",
        //     fontSize: 20,
        //   },
        // },
        grid: {
          top: "25%",
          left: "5%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "axis",
          textStyle:{
            fontSize:(14 / 1080) * document.body.scrollHeight
          },
          formatter: (param) => {
            var str = "";
            str = `${param[0].name}<br/>工矿商贸事故数量 : ${param[0].value}`;
            return str;
          },
        },
        xAxis: {
          boundaryGap: true,
          axisLine: {
            //坐标轴轴线相关设置。数学上的x轴
            show: false,
            symbolSize: [7, 10],
            symbolOffset: [0, 8],
            lineStyle: {
              color: "#979797",
            },
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            //坐标轴刻度标签的相关设置
            show: true,
            textStyle: {
              color: "#d1e6eb",
              margin: 15,
            },
          },
          data: x,
        },
        yAxis: [
          {
            type: "value",
            // name: "亿元",
            // nameTextStyle: {
            //   color: "#fff",
            //   fontSize: "14",
            //   padding: [10, 0, 0, 0],
            // },
            min: 0,
            max: max,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#114787",
                type: 'dashed'
              },
            },
            symbol: ["none", "none"], //箭头一端没效果,一端箭头
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
              },
            },
            axisLabel: {
              margin: 5,
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
            // name: "产值",
            type: "bar",
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
            barWidth:20,
            itemStyle: {
              // color:"#008EF9",
              fontSize:18,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00EAFF",
                },
                {
                  offset: 1,
                  color: "#1C8CF7",
                },
              ]),
            },
            data: y1,
          }
        ],
      };
      chart4.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart4.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % y1.length;
        chart4.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });

        chart4.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: inda,
        });
      }, this.timeInterval);
      this.timer = timer
    },
    drawingChart5(){
      if (this.chart5) {
        this.chart5.dispose();
      }
      let chart5 = echarts.init(document.getElementById("chart5"));
      this.chart5 = chart5
      var x = this.fiveCaseAndMoneyData.xData;
      var y = this.fiveCaseAndMoneyData.yData;
      var y1 = this.fiveCaseAndMoneyData.yData2;
      var y2 = []
      y1.map((item, index) => {
        y2[index] = Math.round(item*0.0001)
      })
      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: "近5年案件数量/处罚金额趋势",
          // "subtext": "BY MICVS",
          x: "0%",
          y: "0%",
          textStyle: {
            color: "#fff",
            fontSize: (16 / 1080) * document.body.scrollHeight,
          },
        },
        legend: {
          right: "15px",
          top: "0",
          width: "300px",
          height: "100px",
          type: "plain",
          textStyle: {
            color: "#fff",
            fontFamily: "SourceHanSansCN-Norma",
            fontSize: (16 / 1080) * document.body.scrollHeight,
          },
          data: [
            {
              name: "处罚金额",
              icon: "circle",
            },
            {
              name: "案件数量",
              icon: "circle",
            },
          ],
        },
        tooltip: {
          show: true,
          trigger: "axis",
          textStyle:{
            fontSize:(14 / 1080) * document.body.scrollHeight
          },
          formatter: (param) => {
            var str = "";
            str = `${param[0].name}<br>${param[0].seriesName} ${param[0].data}<br>${param[1].seriesName} ${param[1].data}万元`;
            return str;
          },
        },
        grid: {
          top: "25%",
          left: "5%",
          right: "5%",
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
              symbol: ["none", "none"], //箭头一端没效果,一端箭头
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
            // name: "案件数量",
            min: 0,
            max: Math.max(...y),
            nameTextStyle: {
              color: "#fff",
              fontSize: (12 / 1080) * document.body.scrollHeight,
              padding: [10, 0, 0, 0],
            },
            splitNumber: 5,
            splitLine: {
              show: false,
              lineStyle: {
                color: "#0a3256",
              },
            },
            symbol: ["none", "none"], //箭头一端没效果,一端箭头
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
          {
            type: "value",
            // name: "处罚金额",
            // position: 'right',
            min: Math.floor(Math.min(...y2)*0.01) * 100,
            max: Math.ceil(Math.max(...y2)*0.01) * 100,
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
              formatter: '{value}万元',
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
            name: '案件数量',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#4f97eb", // 线条颜色
              },
              borderColor: "#4f97eb",
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
                color: "#4f97eb",
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
                        color: "#4f97eb",
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255, 0)",
                      },
                    ],
                    false
                ),
                shadowColor: "#4f97eb", //阴影颜色
                shadowBlur: 0, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y,
          },
          {
            type: "line",
            yAxisIndex: 1,
            name: '处罚金额',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#FFB341", // 线条颜色
              },
              borderColor: "#FFB341",
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
                color: "#FFB341",
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
                        color: "#FFB341",
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255, 0)",
                      },
                    ],
                    false
                ),
                shadowColor: "#FFB341", //阴影颜色
                shadowBlur: 0, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y2,
          },
        ],
      };
      chart5.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart5.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % y.length;
        chart5.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });

        chart5.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: inda,
        });
      }, this.timeInterval);
      this.timer = timer
    },
    drawingChart6(){
      if (this.chart6) {
        this.chart6.dispose();
      }
      let chart6 = echarts.init(document.getElementById("chart6"));
      this.chart6 = chart6
      let data = [];
      let allValue = 0
      this.hazardAnalysisData.forEach((item) => {
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
          right: "5%",
          bottom: "15%",
          textStyle: {
            color: "#fff",
            fontSize:(16 / 1080) * document.body.scrollHeight,
          },
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "75%"],
            center: ["20%", "50%"],
            label: {
              show: false,
              fontSize: (20 / 1080) * document.body.scrollHeight,
            },
            color: [
              "#FF6E4C",
              "#4AFFB7",
              "#024EE1",
              "#FFBE00",
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
      chart6.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart6.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % data.length;
        chart6.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });

        chart6.dispatchAction({
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
#warning {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.bigtit{
  height: 3.4%;
}
.flex{
  display: flex;
}
.flex-1{
  flex: 1;
}
.in{
  display: inline-block;
}
.content{
  height: 95%;
}
.social-header {
  color: #fff;
  font-size: 1.4rem;
  align-items: center;
  margin-top: 8px;
}
.social-header-left {
  text-align: right;
  padding-right: 20px;
}
.social-header-right {
  padding-left: 20px;
}
.increase{
  color: #14FC8C;
  background: url("../../../assets/subpage/increase.png")no-repeat left;
  background-size: 12px;
  padding-left: 15px;
  font-weight: 500;
}
.decrease{
  color: #FC5914;
  background: url("../../../assets/subpage/reduce.png")no-repeat left;
  background-size: 12px;
  padding-left: 15px;
  font-weight: 500;
}
#chart4{
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
  height: 24%;
}
#chart5{
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
  height: 24%;
}
#chart6{
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
  height: 24%;
}
</style>