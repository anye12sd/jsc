<template>
  <div id="industrialChange"></div>
</template>

<script>
// 工业产值历年变化
import echarts from "echarts";
export default {
  name: "industrialChange",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      gdp_czyc: [],
    };
  },
  mounted() {
    this.getIndustrialdata();
  },
  methods: {
    // 获取工业产值历年变化数据
    getIndustrialdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/gdp_czyc",
        data: JSON.stringify({
          nx: 2020,
        }),
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.gdp_czyc = optionsdata.data[0];
            this.init();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    init() {
      let nesynew = this.$echarts.init(
        document.getElementById("industrialChange")
      );
      let x = [];
      let y1 = [];
      let y2 = [];
      let max1 = 0;
      let max2 = 0;
      this.gdp_czyc.map((item, index) => {
        y1.push(item.GYCZ);
        if (max1 * 1 < item.GYCZ * 1) {
          max1 = item.GYCZ * 1;
        }
        if (max2 * 1 < item.GYCZZZL.slice(0, item.GYCZZZL.length - 1) * 1) {
          max2 = item.GYCZZZL.slice(0, item.GYCZZZL.length - 1) * 1;
        }
        x.push(item.SJ);
        y2.push(item.GYCZZZL.slice(0, item.GYCZZZL.length - 1));
      });
      max1 += 100;
      max2 += 100;
      //   console.log(max1);
      let option = {
        legend: {
          right: "70px",
          top: "5px",
          width: "200px",
          height: "100px",
          type: "plain",
          textStyle: {
            color: "#FFFFFF",
            fontFamily: "SourceHanSansCN-Norma",
            fontSize: 15,
          },
          data: [
            {
              name: "产值",
              icon: "circle",
            },
            {
              name: "增长率",
              icon: "circle",
            },
          ],
        },
        title: {
          text: "工业产值历年变化",
          // "subtext": "BY MICVS",
          x: "0%",
          y: "0%",

          textStyle: {
            color: "#fff",
            fontSize: "16"
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "13",
          },
        },
        grid: {
          left: 50,
          right: 50,
          bottom: 40,
          top: 70,
        },
        xAxis: {
          boundaryGap: true,
          axisLine: {
            //坐标轴轴线相关设置。数学上的x轴
            show: true,
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
            name: "亿元",
            nameTextStyle: {
              color: "#fff",
              fontSize: "14",
              padding: [10, 0, 0, 0],
            },
            min: 0,
            max: Math.ceil(max1),
            interval: Math.ceil(max1 / 8),
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
              margin: 5,
              textStyle: {
                color: "#d1e6eb",
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            type: "value",
            name: "增长率%",
            nameTextStyle: {
              color: "#fff",
              fontSize: "14",
              // padding: [10, 0, 0, 0],
            },
            min: 0,
            max: Math.ceil(max2),
            interval: Math.ceil(max2 / 8),
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
            // data:["0%",`${max2/8}`,`${max2/8*2}`,`${max2/8*3}`,`${max2/8*4}`,`${max2/8*5}`,`${max2/8*6}`,`${max2/8*7}`,`${max2}`],
            axisLabel: {
              show: true,
              margin: 5,
              textStyle: {
                color: "#d1e6eb",
              },
              formatter: "{value}%",
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "产值",
            type: "bar",
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#0091FF",
                },
                {
                  offset: 1,
                  color: "#000000",
                },
              ]),
            },
            data: y1,
          },
          {
            name: "增长率",
            type: "line",
            symbolSize: 7,
            yAxisIndex: 1,
            // lineStyle: {
            //   normal: {
            //     color: "#F7B500", // 线条颜色
            //   },
            //   borderColor: "#f0f",
            // },
            label: {
              show: true,
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
            data: y2,
          },
        ],
      };
      nesynew.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
#industrialChange {
  width: 100%;
  height: 100%;
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
}
</style>