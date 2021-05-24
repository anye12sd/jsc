<template>
  <div id="birth" :class="size?'fix':'unfix'">
    <div class="bigtit">出生</div>
    <div class="current">
      <div>
        <div>当年出生人数</div>
        <div>{{ yezt_cs ? yezt_cs.bncsrs : "" }}</div>
      </div>
      <div>
        <div>较上年增长</div>
        <div v-if="yezt_cs" :class="yezt_cs.sntb.slice(0, 1) == '+' ? 'more' : 'reduce'">{{ yezt_cs ? yezt_cs.sntb : "" }}</div>
      </div>
    </div>
    <div id="udvgrj"></div>
  </div>
</template>

<script>
// 出生
import echarts from "echarts";
export default {
  name: "birth",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      yezt_cs: null,
      yezt_cs2: [],
    };
  },
  props:{
    size:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/yezt_cs",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            // console.log(optionsdata);
            this.yezt_cs = optionsdata.data[0][0];
            // console
            this.yezt_cs2 = optionsdata.data[1].reverse();
            // console.log(this.yezt_cs.bncsrs,this.yezt_cs2,22)
            this.drawing();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawing() {
      let lsrkqs = this.$echarts.init(document.getElementById("udvgrj"));
      var x = [];
      var y = [];
      this.yezt_cs2.map((item, index) => {
        x.push(item.nx);
        y.push(item.bncsrs);
      });
      var option = {
        // backgroundColor: "#05224d",
        title: {
          text: "历年人口变化趋势图",
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
                shadowColor: "rgba(0,145,255, 0.4)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y,
          },
        ],
      };

      lsrkqs.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
.fix{
  width: 650px;
  height: 350px;
}
.infix{
  width: 100%;
  height: 100%;
}
#birth {
  
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
  .bigtit {
    width: 100%;
    font-family: SourceHanSansCN-Heavy;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
  }
  .current {
    display: flex;
    justify-content: space-around;
  }
  .current>div{
      width: 35%;
      text-align: center;
  }
  .current>div>div:nth-of-type(2){
      height: 40px;
      line-height: 40px;
      margin-top: 5px;
  }
  .current > div:nth-of-type(2) {
    .more {
      background-image: url("../../assets/subpage/xj.png");
      background-repeat: no-repeat;
      background-position: center center;
    }
    .reduce{
      background-image: url("../../assets/subpage/ss.png");
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  #udvgrj {
    height: 250px;
  }
}
</style>