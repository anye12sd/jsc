<template>
  <div class="enterpriseInformation">
    <div class="tit">企业信息</div>
    <div class="main">
      <div class="left">
        <el-row class="qyxx">
          <el-col :span="7">
            <div class="qyxxtitle">总企业数</div>
            <div class="qyxxnumber">{{ qyzh_qyxx.zs }}</div>
          </el-col>
          <el-col :span="7">
            <div class="qyxxtitle">当年新增</div>
            <div class="cyzj">
              <div>{{ qyzh_qyxx.xz }}</div>
            </div>
          </el-col>
          <el-col :span="7" :offset="2">
            <div class="qyxxtitle">规上企业</div>
            <div class="qyxxnumber">{{ qyzh_qyxx.gsqy }}</div>
          </el-col>
        </el-row>
        <div id="qyqrqk"></div>
      </div>
      <div class="right">
        <div id="qyhyfb"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 企业信息
import echarts from "echarts";
export default {
  name: "enterpriseInformation",
  data() {
    return {
      qyzh_qyxx: {},
      qyzh_qyxx1: [],
      qyzh_qyxx2: [],
      baseUrl: "http://10.21.197.236:8080",
    };
  },
  mounted() {
      this.getdata()
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_qyxx",
        // data: data,
      })
        .then((res) => {
            console.log(res)
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
              
            this.qyzh_qyxx = optionsdata.data[0][0];
            this.qyzh_qyxx1 = optionsdata.data[1];
            this.qyzh_qyxx2 = optionsdata.data[2];
            this.itMyChart9();
            this.itMyChart10();
          }

          // console.log(optionsdata.data, 88);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itMyChart9() {
      let qyqrqk = this.$echarts.init(document.getElementById("qyqrqk"));
      var x = [];
      var y = [];
      this.qyzh_qyxx2.map((item, index) => {
        x.push(item.start_date);

        y.push(item.sl);
      });
      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: "企业迁入情况",
          // "subtext": "BY MICVS",
          x: "0%",
          y: "5%",

          textStyle: {
            color: "#fff",
            fontSize: "16",
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "14",
          },
        },
        // tooltip: {
        //   trigger: "axis",
        //   backgroundColor: "rgba(0,0,0,.1)",
        //   textStyle: {
        //     color: "#666",
        //   },
        //   // formatter: '{a}<br/>{c}' + '%',
        // },
        grid: {
          top: "28%",
          left: "1%",
          right: "8%",
          bottom: "6%",
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

      qyqrqk.setOption(option);
    },
    itMyChart10() {
      let qyhyfb = this.$echarts.init(document.getElementById("qyhyfb"));
      var xdata = [];
      // var y = [];
      this.qyzh_qyxx1.map((item, index) => {
        xdata.push({
          name: item.content,
          value: item.zb.slice(0, item.zb.length - 1),
        });
      });
      var option = {
        // backgroundColor:'#000',
        title: {
          text: "企业行业分布",

          x: "0",
          y: "0",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "normal",
            align: "center",
            width: "200px",
          },
        },
        animation: true,
        tooltip: {
          trigger: "item",
          formatter: "{b}  {d}% ",
        },
        legend: {
          width: "100%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          icon: "circle",
          right: "0",
          top: "14%",
          padding: [0, 0],
          itemGap: 4,
          // data: [
          //   "测量工",
          //   "电焊工",
          //   "钢筋工",
          //   "沥青工",
          //   "安装工",
          //   "起重工",
          //   "养护工",
          //   "其它",
          // ],
        },
        series: [
          {
            type: "pie",
            center: ["50%", "67%"],
            radius: ["38%", "53%"],
            color: [
              "#FEE449",
              "#01A4F7",
              "#00FFA8",
              "#9F17FF",
              "#FFE400",
              "#00FFFF",
              "#01A4F7",
              "#FE2C8A",
            ],
            startAngle: 135,
            labelLine: {
              normal: {
                length: 25,
              },
            },
            label: {
              show: false,
              normal: {
                show: false,
                formatter: "{b|{b}:}  {per|{d}%} ",
                backgroundColor: "rgba(255, 147, 38, 0)",
                borderColor: "transparent",
                borderRadius: 4,
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center",
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 1,
                    height: 0,
                  },
                  b: {
                    color: "#b3e5ff",
                    fontSize: 16,
                    lineHeight: 33,
                  },
                  c: {
                    fontSize: 14,
                    color: "#eee",
                  },
                  per: {
                    color: "#FDF44E",
                    fontSize: 14,
                    padding: [5, 8],
                    borderRadius: 2,
                  },
                },
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                },
              },
            },

            data: xdata,
          },
        ],
      };

      qyhyfb.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
.enterpriseInformation {
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
  .main {
    width: 100%;
    height: 90%;
    display: flex;
    text-align: center;
    padding-top: 10px;
    box-sizing: border-box;
    > div {
      width: 50%;
      height: 100%;
      .qyxxtitle {
        font-family: SourceHanSansCN-Regular;
        font-size: 12px;
        color: #fff;
        letter-spacing: 0;
        text-align: center;
      }
      .qyxxnumber {
        font-family: DINAlternate-Bold;
        font-size: 16px;
        color: #fff;
        letter-spacing: 0;
        text-align: center;
      }
      .cyzj {
        background-image: url("../../../assets/subpage/ss.png");
        background-repeat: no-repeat;
        background-size: 74% 100%;
        background-position: 35% 50%;
      }
      .qyxx{
          height: 10%;
      }
      #qyqrqk{
          height: 85%;
          margin-top: 10px;
      }
      #qyhyfb{
          height: 100%;
      }
    }
  }
}
</style>