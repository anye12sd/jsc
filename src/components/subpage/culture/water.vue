<template>
  <div id="water">
    <div class="bigtit">
      <div class="tag"></div>
      <div>县级水源地水质</div>
    </div>
    <div class="content">
      <div class="content-header flex">
        <div class="content-header-left flex-1">合溪水库</div>
        <div class="content-header-right flex-1">包漾河</div>
      </div>
      <div id="chart5"></div>
      <div class="bigtit">
        <div class="tag"></div>
        <div>农村水源地水质</div>
      </div>
      <div class="nongcun-header flex" style="flex-wrap: wrap" v-if="child02.totalData.length">
        <template v-for="(item, index) in child02.totalData">
          <div class="nongcun-box" :key="index">
            <div class="nongcun-box-title" :class="'nongcun-box-title' + index">{{item.label}}</div>
            <div class="nongcun-box-num">{{item.value}}</div>
          </div>
        </template>
      </div>
      <div id="chart6"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "water",
  data(){
    return{
      child01: {},
      child02: {totalData: []},
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
    getdata() {
      this.$axios({
        method: "post",
        url: "api/zhzlApi/jscdp/syzl",
      })
          .then((res) => {
            let optionsdata = res.data.data;
            this.child02 = optionsdata.child02
            this.child01 = optionsdata.child01
            this.$nextTick(function(){
              this.drawing()
            })
          })
          .catch((err) => {
            console.log(err);
          });
    },
    drawing(){
      this.drawingChart5()
      this.drawingChart6()
    },
    drawingChart5() {
      if (this.chart5) {
        this.chart5.dispose();
      }
      let chart5 = echarts.init(document.getElementById("chart5"));
      this.chart5 = chart5
      var x = [];
      var y = [];
      var y1 = [];
      this.child01.data.map((item) => {
        x.push(item.label);
        y.push(item.data[0].value);
        y1.push(item.data[1].value);
      });

      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: this.child01.subLabel,
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
                str += `<br>${item.seriesName} : ${item.data == 1 ? 'Ⅰ类' : 'Ⅱ类'}`;
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
              formatter: function(params){
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
            min: 0,
            max: Math.max(...y),
            nameTextStyle: {
              color: "#fff",
              fontSize: (12 / 1080) * document.body.scrollHeight,
              padding: [10, 0, 0, 0],
            },
            splitNumber: 2,
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
              formatter: function(value){
                let text = []
                if(value == 0){
                  text.push("")
                } else if(value == 1){
                  text.push("Ⅰ类")
                } else if(value == 2){
                  text.push("Ⅱ类")
                }
                return text
              },
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
            name: '合溪水库',
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
            name: '包漾河',
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
    drawingChart6() {
      if (this.chart6) {
        this.chart6.dispose();
      }
      let chart6 = echarts.init(document.getElementById("chart6"));
      this.chart6 = chart6
      var x = [];
      var y = [];
      var y1 = [];
      var y2 = [];
      var y3 = [];
      var y4 = [];
      var y5 = [];
      this.child02.data.map((item) => {
        x.push(item.label);
        y.push(item.data[0].value);
        y1.push(item.data[1].value);
        y2.push(item.data[2].value);
        y3.push(item.data[3].value);
        y4.push(item.data[4].value);
        y5.push(item.data[5].value);
      });

      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: this.child01.subLabel,
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
              if (item.data >= 0) {
                str += `<br>${item.seriesName}数 : ${item.data}`;
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
              formatter: function(params){
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
            min: 0,
            max: 10,
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
            name: 'Ⅰ类',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#7BFA3C", // 线条颜色
              },
              borderColor: "#7BFA3C",
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
                color: "#7BFA3C",
              },
            },
            tooltip: {
              show: true,
            },
            data: y,
          },
          {
            type: "line",
            name: 'Ⅱ类',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#008CFE", // 线条颜色
              },
              borderColor: "#008CFE",
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
                color: "#008CFE",
              },
            },
            tooltip: {
              show: true,
            },
            data: y1,
          },
          {
            type: "line",
            name: 'Ⅲ类',
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
            data: y2,
          },
          {
            type: "line",
            name: 'Ⅳ类',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#793CFA", // 线条颜色
              },
              borderColor: "#793CFA",
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
                color: "#793CFA",
              },
            },
            tooltip: {
              show: true,
            },
            data: y3,
          },
          {
            type: "line",
            name: 'Ⅴ类',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#FFEF41", // 线条颜色
              },
              borderColor: "#FFEF41",
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
                color: "#FFEF41",
              },
            },
            tooltip: {
              show: true,
            },
            data: y4,
          },
          {
            type: "line",
            name: '劣Ⅴ类',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#5CFFF6", // 线条颜色
              },
              borderColor: "#5CFFF6",
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
                color: "#5CFFF6",
              },
            },
            tooltip: {
              show: true,
            },
            data: y5,
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
        inda = (inda + 1) % y.length;
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
#water {
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
.content-header{
  font-size: 2.2rem;
  text-align: center;
  line-height: 100px;
  font-weight: bold;
  margin-top: 15px;
}
.content-header-left{
  background: url("../../../assets/subpage/water1@1x.png") no-repeat center;
  background-size: 80px;
  width: 80px;
  height: 100px;
}
.content-header-right{
  background: url("../../../assets/subpage/water2@1x.png") no-repeat center;
  background-size: 80px;
  width: 80px;
  height: 100px;
}
#chart5{
  margin-top: 15px;
  width: 100%;
  height: 26%;
  margin-bottom: 25px;
}
#chart6{
  margin-top: 15px;
  width: 100%;
  height: 28%;
}
.nongcun-header{
  margin-top: 15px;
}
.nongcun-box{
  width: 33%;
  text-align: center;
}
.nongcun-box-num{
  font-size: 2.2rem;
  color: #32C5FF;
}
.nongcun-box-title{
  position: relative;
}
.nongcun-box-title:before{
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 2px;
}
.nongcun-box-title0:before{
  background: #7BFA3C;
}
.nongcun-box-title1:before{
  background: #008CFE;
}
.nongcun-box-title2:before{
  background: #FFB341;
}
.nongcun-box-title3:before{
  background: #793CFA;
}
.nongcun-box-title4:before{
  background: #FFEF41;
}
.nongcun-box-title5:before{
  background: #5CFFF6;
}
</style>