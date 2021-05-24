<template>
  <div class="fixedAssets">
    <div class="tit">固定资产投资</div>
    <div class="main">
      <div id="tzbzqk"></div>
      <div id="gytr"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "fixedAssets",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      cyhl_gdzc: [],
      cyhl_gdzc1: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/cyhl_gdzc",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.cyhl_gdzc = optionsdata.data;
            this.cyhl_gdzc1 = optionsdata.data[1];
            this.itMyChart3();
            this.itMyChart4(this.cyhl_gdzc[0].include.reverse());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itMyChart3() {
      let tzbzqk = this.$echarts.init(document.getElementById("tzbzqk"));
      var x = [];
      var y = [];
      //  console.log(  this.cyhl_gdzc,222)
      this.cyhl_gdzc.map((item, index) => {
        x.push(item.nx);
        y.push(item.tbzz.slice(0, item.tbzz.length - 1));
      });
      let _that = this;
      var option = {
        tooltip: {
          trigger: "axis",
          show: false,
          backgroundColor: "rgba(255,255,255,0.5)",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          top: "15%",
          left: "4%",
          right: "18%",
          bottom: "8%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            name: "时间",
            nameTextStyle: {
              color: "#fff",
              fontSize: "14",
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
            type: "value",
            min: 0,
            name: "总额增长率%",
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
              lineStyle: {
                color: "#979797",
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
            name: "总数",
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
              },
            },
            itemStyle: {
              normal: {
                color: "#50EB45",
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
                      color: "#50EB45",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,0,0, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(247,181,0, 0.4)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },

            data: y,
          },
        ],
      };
      tzbzqk.on("click", function (params) {
        _that.itMyChart4(_that.cyhl_gdzc[params.dataIndex].include.reverse());
      });

      tzbzqk.setOption(option);
    },
    itMyChart4(xxdata) {
      let gytr = this.$echarts.init(document.getElementById("gytr"));

      var seriesData = [];
      xxdata.map((item, index) => {
        seriesData.push({
          name: item.lb,
          value: item.tbzz.slice(0, item.tbzz.length - 1),
        });
      });
      var colorList = [
        "#4BF0FF",
        "#73ACFF",
        "#FDD56A",
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

        barWidth: 13,
        grid: {
          top: "15%",
          left: "1%",
          right: "28%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          //  min:'100',
          name: "增长率%",
          max: "100",
          nameTextStyle: {
            color: "#fff",
            fontSize: "14",
            // padding:[10,0,0 ,0]
          },
          splitLine: {
            lineStyle: {
              color: "#rgba(0,145,255,1)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            //  改变x轴颜色
            lineStyle: {
              color: "#979797",
            },
            symbol: ["none", "arrow"], //箭头一端没效果,一端箭头
            symbolSize: [7, 10],
            symbolOffset: [0, 8],
          },
          axisLabel: {
            //  改变x轴字体颜色和大小
            textStyle: {
              color: "rgba(250,250,250,0.6)",
              // fontSize: 16,
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
              color: "rgba(250,250,250,0.6)",
              fontSize: 16,
            },
          },
        },
        series: [
          {
            type: "bar",
            name: "产出",
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
                    fontSize: 14,
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
  },
};
</script>

<style scoped lang="less">
.fixedAssets {
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
  .main{
    width: 100%;
    height: 90%;
    display: flex;
    div{
      width: 50%;
      height: 100%;
    }
  }
}
</style>