<template>
  <div class="topRanking">
    <div class="tit">评分企业TOP排名</div>
    <div class="main">
      <div class="toppm">
        <div
          v-for="(item, index) in qyzh_qypm"
          :class="item.ph == xxflag.name ? 'toppmdiv1' : 'toppmdiv'"
          @click="qiehuantoppm(item)"
          :key="index"
        >
          <el-row>
            <el-col :span="21" class="toptitle" :title="item.firm_name"
              >{{ item.ph }}.{{ item.firm_name }}</el-col
            >
            <el-col :span="3" class="topnumber">{{ item.zpf }}</el-col>
          </el-row>
        </div>
      </div>
      <div id="topxq"></div>
    </div>
    <div id="topdqyqk"></div>
  </div>
</template>

<script>
// 评分企业TOP排名
import echarts from "echarts";
export default {
  name: "topRanking",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      xxflag: { name: "1" },
      qyzh_qypm: {},
      qyzh_qypm1: [],
      qyzh_pfxq:[],
      qyzh_pfxq1:[]
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_qypm",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.qyzh_qypm = optionsdata.data[0].slice(0, 5);
            this.qyzh_qypm1 = optionsdata.data[0].slice(5, 10);
            // this.itMyChart7();
            // this.itMyChart8();
          }
          //  console.log(this,9999)
            this.get_options11(this.qyzh_qypm[0].firm_name);
          // console.log(optionsdata.data, 12312);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    qiehuantoppm(item) {
      // console.log(item,22)
      this.xxflag.name = item.ph;

      this.get_options11(item.firm_name);
    },
    get_options11(xdata) {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_pfxq?nm=" + xdata,
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.qyzh_pfxq = optionsdata.data[0][0];
            this.qyzh_pfxq1 = optionsdata.data[1];
            this.itMyChart11();
            this.itMyChart12();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itMyChart11() {
      let topxq = this.$echarts.init(document.getElementById("topxq"));
      var dataname = [
        "经济状态",
        "创新发展",
        "贡献能力",
        "社会责任",
        "合规风险",
      ];
      var datamax = [300, 300, 300, 300, 300];
      var datavaule = [
        this.qyzh_pfxq.jyztpf,
        this.qyzh_pfxq.cxfzpf,
        this.qyzh_pfxq.gxnlpf,
        this.qyzh_pfxq.shzrpf,
        this.qyzh_pfxq.hgfxpf,
      ];
      var indicator = [];
      for (var i = 0; i < dataname.length; i++) {
        indicator.push({
          name: dataname[i],
          max: datamax[i],
        });
      }
      var option = {
        title: {
          text: "详情",

          x: "5%",
          y: "0",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "normal",
            align: "center",
            width: "200px",
          },
        },
        tooltip: {
          show: true,
          trigger: "item",
        },

        radar: {
          center: ["50%", "55%"],
          radius: "40%",
          startAngle: 90,
          splitNumber: 5,

          axisLabel: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#D2E4F8",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#fff",
            },
          },
          name: {
            formatter: "{value}",
            textStyle: {
              color: "#fff",
              fontSize: 15,
            },
          },
          indicator: indicator,
        },

        series: [
          {
            name: "当前分数",
            type: "radar",
            symbol: "none",
            symbolSize: 6,
            areaStyle: {
              normal: {
                color: "#80B2FF",
              },
            },
            itemStyle: {
              color: "#80B2FF",
            },
            lineStyle: {
              normal: {
                color: "#80B2FF",
                width: 2,
              },
            },
            data: [datavaule],
          },
        ],
      };

      topxq.setOption(option);
    },
    itMyChart12() {
      let topdqyqk = this.$echarts.init(document.getElementById("topdqyqk"));
      var x = [];
      var y = [];
      this.qyzh_pfxq1.map((item, index) => {
        x.push(item.sj);
        y.push(item.zpf);
      });
      var option = {
        // backgroundColor: "#05224d",
        // title: {
        //   text: "单企业情况查看",
        //   // "subtext": "BY MICVS",
        //   x: "0%",
        //   y: "0%",

        //   textStyle: {
        //     color: "#fff",
        //     fontSize: "15",
        //   },
        //   subtextStyle: {
        //     color: "#90979c",
        //     fontSize: "12",
        //   },
        // },
        tooltip: {},
        grid: {
          top: "25%",
          left: "1%",
          right: "8%",
          bottom: "8%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            name: "时间",
            nameTextStyle: {
              color: "#fff",
              fontSize: "14",
              padding: [10, 0, 0, 0],
            },
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
            name: "评分",
            nameTextStyle: {
              color: "#fff",
              fontSize: "14",
              padding: [10, 0, 0, 0],
            },
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
                color: "#4BF0FF", // 线条颜色
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
                color: "#4BF0FF",
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
                      color: "#4BF0FF",
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

      topdqyqk.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
.topRanking {
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
  #topdqyqk {
    width: 100%;
    height: 48%;
  }
  .main {
    width: 100%;
    display: flex;
    height: 43%;
    margin-top: 1%;
    #topxq {
      width: 40%;
      height: 100%;
    }
    .toppm {
      width: 60%;
      height: 100%;
      display: flex;
      align-content: space-between;
      flex-wrap: wrap;
      .toppmdiv {
        opacity: 0.9;
        background: #004864;
        cursor: pointer;
        box-shadow: inset 0 0 5px 0 #ffffff;
        border-radius: 4px;
        width: 100%;
        box-sizing: border-box;
        padding: 2px 5px;
        .toptitle {
          opacity: 0.9;
          font-family: SourceHanSansCN-Medium;
          font-size: 13px;
          color: #ffffff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .topnumber {
          font-family: SourceHanSansCN-Medium;
          font-size: 13px;
          color: #ffffff;
        }
      }
      .toppmdiv1 {
          width: 100%;
        opacity: 0.9;
        background: #32c5ff;
        cursor: pointer;
        box-shadow: inset 0 0 5px 0 #ffffff;
        border-radius: 4px;
        padding: 2px 5px;
        .toptitle {
          opacity: 0.9;
          font-family: SourceHanSansCN-Medium;
          font-size: 13px;
          color: #ffffff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .topnumber {
          font-family: SourceHanSansCN-Medium;
          font-size: 13px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>