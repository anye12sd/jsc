<template>
  <div id="province">
    <div class="bigtit">
      <div class="tag"></div>
      <div>省/市平安指数</div>
    </div>
    <div class="content">
      <div class="content-text flex space-between">
        <div>
          <div class="content-text-title">{{ month.substring(0, 4) }}年{{ month.substring(4, 6)[0] == 0 ? month.substring(5, 6) : month.substring(4, 6) }}月{{ departmentName }}平安指数</div>
          <div class="content-text-text ">{{score}}</div>
        </div>
        <div>
          <div class="content-text-title">全省排名</div>
          <div class="content-text-text">NO.{{ rankIndex }}</div>
        </div>
      </div>
      <div class="chart">
        <div id="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>

import echarts from "echarts";

export default {
  name: "province",
  data(){
    return {
      option: [],
      chart: "",
      rankIndex: 0,
      score: "",
      departmentName: "",
      month: "",
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
      let data = btoa('http://jczl.giscloud.cx/zhzlApi/jsc/jscIndex/safetyAllIndexForCX')
      let url = process.env.NODE_ENV == "development" ? '/api/zhzlApi/jsc/jscIndex/safetyAllIndexForCX' : 'url?url=' + data
      this.$axios({
        method: "get",
        url: url,
      })
          .then((res) => {
            let optionsdata = res.data.data.data;
            // let optionsdata = res.data.data; // 本地环境用这个变量
            this.rankIndex = optionsdata.rankIndex
            this.score = optionsdata.score
            this.departmentName = optionsdata.departmentName
            this.month = optionsdata.month
            this.option = optionsdata.provinceCityRank
            this.drawing()
          })
          .catch((err) => {
            console.log(err);
          });
    },
    drawing() {
      if (this.chart) {
        this.chart.dispose();
      }
      let chart = echarts.init(document.getElementById("chart"));
      this.chart = chart
      var x = [];
      var y = [];
      var y1 = [];
      this.option.map((item) => {
        x.push(item.month.substring(2, 4) + '-' + item.month.substring(4, 6));
        y.push(item.sRank);
        y1.push(item.crank);
      });

      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: "近一年省/市平安指数排名",
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
          width: "170px",
          height: "100px",
          type: "plain",
          textStyle: {
            color: "#fff",
            fontFamily: "SourceHanSansCN-Norma",
            fontSize: (16 / 1080) * document.body.scrollHeight,
          },
          data: [
            {
              name: "省",
              icon: "circle",
            },
            {
              name: "市",
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
            // type: "value",
            type: "value",
            // name: "亿美元",
            // // min: 0,
            // // max: 250,
            // position: 'right',
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
          {
            // type: "value",
            type: "value",
            // name: "亿美元",
            // // min: 0,
            // // max: 250,
            // position: 'right',
            min: 0,
            max: Math.max(...y1),
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
            name: '省',
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
            yAxisIndex: 1,
            name: '市',
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
      chart.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % y.length;
        chart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });

        chart.dispatchAction({
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
#province {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.flex{
  display: flex;
}
.space-between{
  justify-content: space-between;
}
.content-text{
  margin: 0 15px;
  margin-top: 5px;
}
.content-text-title{
  font-size: 1.8rem;
}
.content-text-text{
  font-size: 2.4rem;
}
.content .content-text div:nth-child(1) .content-text-text{
  color: #14FC8C;
}
.content .content-text div:nth-child(2) .content-text-text{
  color: #32C5FF;
}
.content{
  height: 100%;
}
.chart{
  height: 65%;
}
#chart{
  width: 100%;
  height: 100%;
}
</style>