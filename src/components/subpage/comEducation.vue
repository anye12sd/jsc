<template>
  <div id="comEducation">
    <div class="bigtit">
      <div class="tag"></div>
      <div>义务教育</div>
    </div>
    <div class="main">
      <div class="left">
        <div class="menu">
          <div :class="active == 0 ? 'active' : ''" @click="swit(0)">
            义务教育（上年）
          </div>
          <div :class="active == 1 ? 'active' : ''" @click="swit(1)">
            各年级人数
          </div>
        </div>
        <div class="edu" v-show="active == 0">
          <div>
            <div>
              <div class="cycolor">小学数量</div>
              <div class="cynumber">{{ qnzt_ywzj1.XXSL }}</div>
            </div>
            <div>
              <div class="cycolor">中学数量</div>
              <div class="cynumber">{{ qnzt_ywzj1.ZXSL }}</div>
            </div>
            <div>
              <div class="cycolor">小学人数</div>
              <div class="cynumber">{{ qnzt_ywzj1.XXRS }}</div>
            </div>
            <div>
              <div class="cycolor">中学人数</div>
              <div class="cynumber">{{ qnzt_ywzj1.ZXRS }}</div>
            </div>
          </div>
          <img src="@/assets/subpage/edu.png" alt="图呢？" />
          <div>
            <div>
              <div class="cycolor">老师总数</div>
              <div class="cynumber">{{ qnzt_ywzj2.jszs }}</div>
            </div>
            <div>
              <div class="cycolor">一级教师</div>
              <div class="cynumber">{{ qnzt_ywzj2.yjjs }}</div>
            </div>
            <div>
              <div class="cycolor">二级教师</div>
              <div class="cynumber">{{ qnzt_ywzj2.ejjs }}</div>
            </div>
            <div>
              <div class="cycolor">三级教师</div>
              <div class="cynumber">{{ qnzt_ywzj2.sjjs }}</div>
            </div>
          </div>
        </div>
        <div class="grade" v-show="active == 1">
          <div>
            <div>各年级人数</div>
            <img src="@/assets/subpage/grade.png" alt="图呢？？？" />
          </div>
          <div>
            <div>
              <div>
                <span>一年级</span> <span> {{ qnzt_ywzj3.NJ1 }}</span>
              </div>
              <div>
                <span>二年级</span> <span> {{ qnzt_ywzj3.NJ2 }}</span>
              </div>
              <div>
                <span>三年级</span> <span> {{ qnzt_ywzj3.NJ3 }}</span>
              </div>
              <div>
                <span>四年级</span> <span> {{ qnzt_ywzj3.NJ4 }}</span>
              </div>
              <div>
                <span>五年级</span> <span> {{ qnzt_ywzj3.NJ5 }}</span>
              </div>
            </div>
            <div>
              <div>
                <span>六年级</span> <span> {{ qnzt_ywzj3.NJ6 }}</span>
              </div>
              <div>
                <span>初一</span> <span> {{ qnzt_ywzj3.NJ7 }}</span>
              </div>
              <div>
                <span>初二</span> <span> {{ qnzt_ywzj3.NJ8 }}</span>
              </div>
              <div>
                <span>初三</span> <span> {{ qnzt_ywzj3.NJ9 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div id="lnszbhqk"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 义务教育
export default {
  name: "comEducation",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      qnzt_ywzj1: [],
      qnzt_ywzj2: [],
      qnzt_ywzj3: [],
      active: 0,
      qnzt_szpb:[],
      chart:null
    };
  },
  mounted() {
    this.getdata();
    window.addEventListener("resize", () => {
      this.itMyChart3();
    });
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/qnzt_ywzj",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            // console.log(optionsdata);
            this.qnzt_ywzj1 = optionsdata.data[0][0];
            this.qnzt_ywzj2 = optionsdata.data[1][0];
            this.qnzt_ywzj3 = optionsdata.data[2][0];
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/qnzt_szpb",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.qnzt_szpb = optionsdata.data;
            this.itMyChart3();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    swit(val) {
      this.active = val;
    },
    itMyChart3() {
      if (this.chart) {
        this.chart.dispose();
      }
      let lnszbhqk = this.$echarts.init(document.getElementById("lnszbhqk"));
      this.chart = lnszbhqk;
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
            fontSize:(14 / 1080) * document.body.scrollHeight ,
          },
          subtextStyle: {
            color: "#90979c",
            fontSize:(14 / 1080) * document.body.scrollHeight ,
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b} {c}",
        },
        grid: {
          top: "20%",
          left: "1%",
          right: "5%",
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
                fontSize:(14 / 1080) * document.body.scrollHeight ,
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
                fontSize:(14 / 1080) * document.body.scrollHeight ,
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
            min: 12,
            // max: 140,
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#0a3256",
                fontSize:(14 / 1080) * document.body.scrollHeight ,
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
                fontSize:(14 / 1080) * document.body.scrollHeight ,
              },
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#d1e6eb",
                fontSize:(14 / 1080) * document.body.scrollHeight ,
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
                color: "#b5b94d", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
                fontSize:(14 / 1080) * document.body.scrollHeight ,
              },
            },
            itemStyle: {
              normal: {
                color: "#b5b94d",
                fontSize:(14 / 1080) * document.body.scrollHeight ,
              },
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#b5b94d",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,0,0, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "#b5b94d", //阴影颜色
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
#comEducation {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  font-family: SourceHanSansCN-Regular;
  .main {
    height: 89%;
    display: flex;
    justify-content: space-around;
    > div {
      width: 48%;
    }
    .right{
      #lnszbhqk{
        width: 100%;
        height: 100%;
      }
    }
    .left {
      .menu {
        display: flex;
        justify-content: center;
        align-items: center;
        .active {
          background-image: linear-gradient(
            179deg,
            #3688ff 19%,
            #1a57ab 63%,
            #1c3e68 100%
          );
          border: 1px solid #94c1ff;
          border-radius: 2px 0 0 2px;
          font-family: MicrosoftYaHei;
          font-size: 1.4rem;
          color: #ffffff;
        }
        div {
          cursor: pointer;
          background: #0f3264;
          border: 1px solid #2061bc;
          border-radius: 0 2px 2px 0;
          font-family: MicrosoftYaHei;
          font-size: 1.3rem;
          color: #bcf6ff;
          padding: 2px 5px;
        }
      }
      .edu {
        height: 81%;
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        > img {
          height: 90%;
        }
        > div {
          height: 100%;
          > div {
            height: 25%;
            box-sizing: border-box;
            > div:nth-child(1) {
              font-family: MicrosoftYaHei;
              font-size: 1.4rem;
              color: #ffffff;
            }
            > div:nth-child(2) {
              font-family: DINPro-Medium;
              font-size: 2rem;
              color: #32c5ff;
            }
          }
        }
      }
      .grade {
        height: 81%;
        display: flex;
        justify-content: center;
        align-items: center;
        > div:nth-child(1) {
          height: 100%;
          display: flex;
          align-content: center;
          flex-wrap: wrap;
          justify-content: center;
          div {
            width: 100%;
            text-align: center;
          }
          > img {
            height: 55%;
          }
        }

        > div:nth-child(2) {
          width: 70%;
          height: 80%;
          border: 1px solid #01f4f2;
          background-color: #0c469b;
          display: flex;
          > div {
            width: 50%;
            display: flex;
            flex-wrap: wrap;
            align-content: space-around;
            justify-content: center;
            > div {
              width: 100%;
              text-align: center;
              > span:nth-child(1) {
                font-family: MicrosoftYaHei;
                font-size: 1.4rem;
                color: #ffffff;
                letter-spacing: 0;
                text-align: right;
              }
              > span:nth-child(2) {
                font-family: DINPro-Medium;
                font-size: 1.82rem;
                color: #32c5ff;
                letter-spacing: 0;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>