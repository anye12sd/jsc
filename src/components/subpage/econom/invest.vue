<template>
  <div id="invest">
    <div class="bigtit">
      <div class="tag"></div>
      <div>投资情况</div>
    </div>
    <div class="invest">
      <div class="invest-header flex">
        <div class="invest-header-left flex-1">
          <div>合同外资金额</div>
          <div class="invest-header-content"><span>{{ cyhl_zsyz.htwzje }}</span> 亿元</div>
        </div>
        <div class="invest-header-right flex-1">
          <div>实际到账金额</div>
          <div class="invest-header-content"><span>{{ cyhl_zsyz.sjdzje }}</span> 亿元</div>
        </div>
      </div>
      <div class="invest-content">
        <div id="zsyz"></div>
        <div class="invest-content-box">
          <div class="menu">
            <div :class="active == 0 ? 'active' : ''" @click="swit(0)">
              总额增长率
            </div>
            <div :class="active == 1 ? 'active' : ''" @click="swit(1)">
              各类型投资
            </div>
          </div>
          <div id="tzbzqk" :class="active == 0 ? '':'hide'"></div>
          <div id="gytr" :class="active == 1 ? '':'hide'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 出生
import echarts from "echarts";
import qs from "qs"

export default {
  name: "invest",
  data() {
    return {
      baseUrl: 'http://10.21.197.236:9000',
      cyhl_zsyz: {},
      cyhl_zsyz1: {},
      cyhl_gdzc: {},
      cyhl_gdzc1: {},
      cyhl_gdzc2: {},
      chart: '',
      active: 0,
      tzbzqk: '',
      zsyz: '',
      gytr: ''
    };
  },
  mounted() {
    this.getdata2();
    this.get_options2();
    window.addEventListener("resize", this.drawing);
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.drawing)
  },
  methods: {
    getdata2() {
      // let data = qs.stringify({
      //   nx: 2020,
      // });
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/cyhl_zsyz",
        // data: data,
      })
          .then((res) => {
            let optionsdata = res.data;
            if (optionsdata.code == 200) {
              this.cyhl_zsyz = optionsdata.data[0][0];
              this.cyhl_zsyz1 = optionsdata.data[1];
              this.itMyChart2();
            }else{
              this.$message.error('无法获取产业比重数据，请联系管理员')
            }
            
            // console.log(optionsdata.data, 88);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    get_options2() {
      // let data = qs.stringify({
      //   nx: 2020,
      // });
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/cyhl_gdzc",
        // data: data,
      })
          .then((res) => {
            let optionsdata = res.data;
            if (optionsdata.code == 200) {
              this.cyhl_gdzc = optionsdata.data;
              this.cyhl_gdzc1 = optionsdata.data[1];
              this.itMyChart3();
              this.cyhl_gdzc2 = this.cyhl_gdzc[0].include.reverse()
              this.itMyChart4(this.cyhl_gdzc2);
            }else{
              this.$message.error('无法获取产业比重数据，请联系管理员')
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    drawing() {
      if (this.zsyz) {
        this.zsyz.dispose();
      }
      if (this.tzbzqk) {
        this.tzbzqk.dispose();
      }
      if (this.gytr) {
        this.gytr.dispose();
      }
      this.itMyChart2()
      this.itMyChart3()
      this.itMyChart4(this.cyhl_gdzc2)
    },
    itMyChart2() {
      let zsyz = echarts.init(document.getElementById("zsyz"));
      this.zsyz = zsyz
      var x = [];
      var y = [];
      var y1 = [];
      this.cyhl_zsyz1.map((item) => {
        x.push(item.nx);
        y.push(item.htwzje);
        y1.push(item.sjdzje);
      });

      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: "招商引资",
          // "subtext": "BY MICVS",
          x: "0%",
          y: "0%",

          textStyle: {
            color: "#fff",
            fontSize: (12 / 1080) * document.body.scrollHeight,
          },
        //   subtextStyle: {
        //     color: "#90979c",
        //     fontSize: "16",
        //   },
        },
        // legend: {
        //   width: "100%",
        //   left: "center",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 20,
        //   },
        //   icon: "circle",
        //   // right: "0",
        //   top: "14%",
        //   padding: [0, 0],
        // },
        tooltip: {
          show: true,
          trigger: "axis",
          textStyle:{
            fontSize:(12 / 1080) * document.body.scrollHeight
          },
          formatter: (param) => {
            var str = "";
            str = `${param[0].name}`;
            param.forEach((item) => {
              if (item.data) {
                str += `  <br>${item.marker} ${item.data}`;
              }
            });
            return str;
          },
        },
        grid: {
          top: "30%",
          left: "5%",
          right: "11%",
          bottom: "8%",
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
            name: "亿美元",
            // // min: 0,
            // // max: 250,
            // position: 'right',
            min: 0,
            max: 12,
            nameTextStyle: {
              color: "#fff",
              fontSize: (12 / 1080) * document.body.scrollHeight,
              padding: [10, 0, 0, 0],
            },
            splitNumber: 6,
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
            name: "合同外资金额",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#50EB45", // 线条颜色
              },
              borderColor: "#50EB45",
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
                color: "#50EB45",
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
                        color: "#50EB45",
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255, 0)",
                      },
                    ],
                    false
                ),
                shadowColor: "#50EB45", //阴影颜色
                shadowBlur: 0, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
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
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#4BF0FF", // 线条颜色
              },
              borderColor: "#4BF0FF",
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
                color: "#4BF0FF",
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
                        color: "#4BF0FF",
                      },
                      {
                        offset: 1,
                        color: "rgba(255,255,255, 0)",
                      },
                    ],
                    false
                ),
                shadowColor: "#4BF0FF", //阴影颜色
                shadowBlur: 0, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y1,
          },
        ],
      };
      zsyz.setOption(option);
    },
    itMyChart3() {
      let that = this
      let tzbzqk = echarts.init(document.getElementById("tzbzqk"));
      this.tzbzqk = tzbzqk
      var x = [];
      var y = [];
      //  console.log(  this.cyhl_gdzc,222)
      this.cyhl_gdzc.map((item) => {
        x.push(item.nx);
        y.push(item.tbzz.slice(0, item.tbzz.length - 1));
      });
      var option = {
        title: {
          text: "固定资产投资",
          // "subtext": "BY MICVS",
          x: "0%",
          y: "0%",
          textStyle: {
            color: "#fff",
            fontSize: (12 / 1080) * document.body.scrollHeight,
          },
        },
        tooltip: {
          trigger: "axis",
          show: true,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          textStyle: {
            color: "#fff",
          },
          position: (para) => {
            return [para[0] + 10, para[1] + 10];
          },
          formatter: function (parms) {
            // console.log(parms[0].dataIndex,333)
            var str = "";
            that.cyhl_gdzc[parms[0].dataIndex].include.map((item) => {
              str += item.lb + ":" + item.tbzz + ";</br>";
            });
            return str;
          },
        },
        grid: {
          top: "25%",
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
            min: 2,
            // name: "总额增长率%",
            // max: 140,
            nameTextStyle: {
              color: "#fff",
              fontSize: (14 / 1080) * document.body.scrollHeight,
              padding: [10, 0, 0, 0],
            },
            splitNumber: 6,
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
      tzbzqk.setOption(option);
    },
    itMyChart4(xxdata) {
      let gytr = echarts.init(document.getElementById("gytr"));
      this.gytr = gytr
      this.chart2 = gytr
      var seriesData = [];
      xxdata.map((item) => {
        seriesData.push({
          name: item.lb,
          value: item.tbzz.slice(0, item.tbzz.length - 1),
        });
      });
      var colorList = [
        "#F7B500",
        "#32C5FF",
        "#B8B8B8",
        "#FDB36A",
        "#FD866A",
        "#9E87FF",
        "#58D5FF",
        "#73DD6A",
        "#33DD58",
        "#53DDD5",
      ];
      var option = {
        // backgroundColor: "#0f375f",
        grid: {
          top: "25%",
          left: "10%",
          right: "11%",
          bottom: "12%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          //  min:'100',
          // name: "增长率%",
          min: 0,
          max: "60",
          splitNumber: 4,
          nameTextStyle: {
            color: "#666",
            fontSize: (14 / 1080) * document.body.scrollHeight,
            padding: [0,0,0,-6]
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "rgba(0,145,255,1)",
            },
          },
          axisTick: {
            show: false,
          },
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
            margin: 10,
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "category",
          // data: ['巴西', '印尼', '美国', '中国'],
          min: "100",
          max: "100",
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            //  改变y轴颜色
            symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
            symbolSize: [7, 10],
            symbolOffset: [0, 8],
            lineStyle: {
              color: "#979797",
            },
          },
          axisLabel: {
            //  改变y轴字体颜色和大小
            //formatter: '{value} m³ ', //  给y轴添加单位
            textStyle: {
              color: "#fff",
              fontSize: (14 / 1080) * document.body.scrollHeight,
            },
          },
        },
        series: [
          {
            type: "bar",
            name: "产出",
            barWidth:(37 / 1080) * document.body.scrollHeight ,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: function (params) {
                      return colorList[params.dataIndex];
                    },
                    fontSize: (14 / 1080) * document.body.scrollHeight,
                    // fontWeight: 600
                  },
                  formatter: function (data) {
                    // console.log(data.data, 22222);
                    var str = data.data.name + "  " + data.data.value + "%";
                    return str;
                  },
                },

                color: function (params) {
                  return colorList[params.dataIndex];
                },
                // },

                borderWidth: 2,
              },
            },
            data: seriesData,
          },
        ],
      };
      gytr.setOption(option);
    },
    swit(val) {
      if(val == this.active) return
      this.active = val;
      if(val == 0){
        this.gytr.dispose()
        this.$nextTick(function () {
          this.itMyChart3()
        })
      }else{
        this.tzbzqk.dispose()
        this.$nextTick(function () {
          this.itMyChart4(this.cyhl_gdzc2)
        })
      }
    },
  },
};
</script>

<style scoped lang="less">
#invest {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.hide{
  visibility: hidden;
}
.bigtit{
  height: 5%;
}
.flex{
  display: flex;
}
.flex-1{
  flex: 1;
}
.invest{
  height: 95%;
  overflow: hidden;
}
.invest-header{
  color: #fff;
  font-size: 1.4rem;
  height: 15%;
  align-items: center;
}
.invest-header-left{
  text-align: right;
  padding-right: 25px;
}
.invest-header-right{
  padding-left: 25px;
}
.invest-header-content{
  color: #32C5FF;
  margin-top: 5px;
  font-size: 1.4rem;
}
.invest-header-content span{
  font-weight:bold;
  margin-right: 4px;
}
.invest-content{
  height: 85%;
}
#zsyz{
  width: 100%;
  height: 50%;
}
.invest-content-box{
  position: relative;
  height: 50%;
}
.menu {
  position: absolute;
  top: 0;
  right: 9%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.menu div{
  cursor: pointer;
  background: #0f3264;
  border: 1px solid #2061bc;
  border-radius: 0 2px 2px 0;
  font-family: MicrosoftYaHei;
  font-size: 1.3rem;
  color: #bcf6ff;
  padding: 2px 5px;
}
.menu .active{
  background-image: linear-gradient(179deg,
  #3688ff 19%,
  #1a57ab 63%,
  #1c3e68 100%);
  border: 1px solid #94c1ff;
  border-radius: 2px 0 0 2px;
  font-family: MicrosoftYaHei;
  font-size: 1.4rem;
  color: #ffffff;
}
#tzbzqk{
  width: 100%;
  height: 100%;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
}
#gytr{
  width: 100%;
  height: 100%;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
}
</style>