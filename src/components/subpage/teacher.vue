<template>
  <div id="teacher"></div>
</template>

<script>
// 历年师资变化
import echarts from "echarts";
export default {
  name: "teacher",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      qnzt_szpb: [],
    };
  },
  mounted() {
      this.getdata()
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/qnzt_szpb",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          // console.log(res)
          if (optionsdata.code == 200) {
            this.qnzt_szpb = optionsdata.data;
            this.drawing();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawing() {
      let lnszbhqk = this.$echarts.init(document.getElementById("teacher"));
      var x = [];
      var y = [];
      this.qnzt_szpb.map((item, index) => {
        x.push(item.nx);
        y.push(item.szpb);
      });
      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: "历年师资配比变化情况",
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
        tooltip: {},
        grid: {
          top: "20%",
          left: "1%",
          right: "1%",
          bottom: "5%",
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
            tooltip: {
              show: false,
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
                shadowColor: "#50EB45", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y,
          },
        ],
      };

      lnszbhqk.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
#teacher {
  width: 100%;
  height: 100%;
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
}
</style>