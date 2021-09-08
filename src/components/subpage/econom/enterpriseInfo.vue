<template>
  <div id="enterpriseInfo">
    <div class="bigtit">
      <div class="tag"></div>
      <div>企业信息</div>
    </div>
    <div class="info-box">
      <div class="menu">
        <div :class="active == 0 ? 'active' : ''" @click="swit(0)">
          迁入情况
        </div>
        <div :class="active == 1 ? 'active' : ''" @click="swit(1)">
          行业分布
        </div>
      </div>
      <div class="enterprise-header flex">
        <div class="enterprise-header-left flex-1">
          <div class="in">
            <div>总企业数</div>
            <div>
              <span
                style="
                  font-weight: bold;
                  font-size: 16px;
                  color: #32c5ff;
                  margin-right: 7px;
                "
                >{{ qyzh_qyxx.zs }}</span
              >
            </div>
          </div>
          <div class="in" style="margin-left: 18px">
            <div>较去年</div>
            <div
              :class="
                qyzh_qyxx.xz && qyzh_qyxx.xz * 1 >= 0 ? 'increase' : 'decrease'
              "
            >
              {{ qyzh_qyxx.xz }}
            </div>
          </div>
        </div>
        <div class="enterprise-header-right flex-1">
          <div>规上企业数</div>
          <div>
            <span
              style="
                font-weight: bold;
                font-size: 16px;
                color: #32c5ff;
                margin-right: 4px;
              "
              >{{ qyzh_qyxx.gsqy }}</span
            >
          </div>
        </div>
      </div>
      <div class="mi">
        <div id="qyqrqk" :class="active == 0 ? '' : 'hide'"></div>
        <div id="qyhyfb" :class="active == 1 ? '' : 'hide'"></div>
      </div>
    </div>
    <div class="search-box" @click="dialogVisible = true">搜索</div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-autocomplete
        :trigger-on-focus="false"
        v-model="searchContent"
        class="el-input-reset"
        value-key="firm_name"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "enterpriseInfo",
  data() {
    return {
      searchContent: "",
      qyhyfb: "",
      qyqrqk: "",
      active: 0,
      qyzh_qyxx: [],
      qyzh_qyxx1: [],
      qyzh_qyxx2: [],
      baseUrl: "http://10.21.197.236:9000",
      dialogVisible: false,
      option: [],
    };
  },
  mounted() {
    this.getData();
    window.addEventListener("resize", this.itMyChart9);
    window.addEventListener("resize", this.itMyChart10);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.itMyChart9);
    window.removeEventListener("resize", this.itMyChart10);
  },
  methods: {
    getData() {
      //   let data = this.$qs.stringify({
      //     nx: 2020,
      //   });
      let data = {
        xzq: "长兴县",
      };
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_qyxx",
        data: data,
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.qyzh_qyxx = optionsdata.data[0][0];
            this.qyzh_qyxx1 = optionsdata.data[1];
            this.qyzh_qyxx2 = optionsdata.data[2];
            this.itMyChart9();
            this.itMyChart10();
          } else {
            this.$message.error("获取企业信息失败");
          }
          // console.log(optionsdata.data, 88);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    swit(val) {
      if (val == this.active) return;
      this.active = val;
      if (val == 0) {
        this.qyhyfb.dispose();
        this.$nextTick(function () {
          this.itMyChart9();
        });
      } else {
        this.qyqrqk.dispose();
        this.$nextTick(function () {
          this.itMyChart10();
        });
      }
    },
    itMyChart9() {
      if (this.qyqrqk) {
        this.qyqrqk.dispose();
      }
      let qyqrqk = this.$echarts.init(document.getElementById("qyqrqk"));
      this.qyqrqk = qyqrqk;
      var x = [];
      var y = [];
      this.qyzh_qyxx2.map((item) => {
        x.push(item.start_date);

        y.push(item.sl);
      });
      var option = {
        // backgroundColor: "#05224d",
        // title: {
        //   text: "迁入情况",
        //   // "subtext": "BY MICVS",
        //   x: "0%",
        //   y: "0%",
        //
        //   textStyle: {
        //     color: "#666",
        //     fontSize: "14",
        //   },
        // subtextStyle: {
        //   color: "#90979c",
        //   fontSize: "16",
        // },
        // },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.7)",
          textStyle: {
            color: "#fff",
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
          formatter: "{a}<br/>{c}",
        },
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
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
                color: "#fff",
                margin: 0,
                fontSize: (12 / 1080) * document.body.scrollHeight,
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
              margin: (12 / 1080) * document.body.scrollHeight,
              textStyle: {
                color: "#fff",
                fontSize: (12 / 1080) * document.body.scrollHeight,
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
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#f7b500", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#fff",
                fontSize: (16 / 1080) * document.body.scrollHeight,
              },
            },
            itemStyle: {
              normal: {
                color: "#f7b500",
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
                      color: "#f7b500",
                    },
                    {
                      offset: 1,
                      color: "rgba(255,255,255, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "#f7b500", //阴影颜色
                shadowBlur: 0, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
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
      this.qyhyfb = qyhyfb;
      var xdata = [];
      // var y = [];
      this.qyzh_qyxx1.map((item) => {
        xdata.push({
          name: item.content,
          value: item.zb.slice(0, item.zb.length - 1),
        });
      });
      var option = {
        // backgroundColor:'#000',
        // title: {
        //   text: "行业分布",
        //   // "subtext": "BY MICVS",
        //   x: "0%",
        //   y: "0%",
        //
        //   textStyle: {
        //     color: "#666",
        //     fontSize: "14",
        //   },
        // subtextStyle: {
        //   color: "#90979c",
        //   fontSize: "16",
        // },
        // },
        animation: true,
        tooltip: {
          trigger: "item",
          // formatter: "{b}  {d}% ",
          textStyle: {
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
        },
        legend: {
          type: "scroll",
          pageIconSize: (32 / 4860) * document.body.scrollWidth,
          pageIconColor: "#fff000",
          pageTextStyle: {
            fontSize: (32 / 4860) * document.body.scrollWidth,
            color: "#fff",
          },
          width: "100%",
          textStyle: {
            color: "#fff",
            fontSize: (16 / 1080) * document.body.scrollHeight,
          },
          icon: "circle",
          bottom: 10,
          right: "22%",
          itemGap: 5,
          padding: [0, 0],
          orient: "vertical",
          formatter: (name) => {
            return name;
          },
        },
        series: [
          {
            type: "pie",
            center: ["35%", "45%"],
            radius: ["50%", "80%"],
            // color: [
            //   "#FEE449",
            //   "#01A4F7",
            //   "#00FFA8",
            //   "#9F17FF",
            //   "#FFE400",
            //   "#00FFFF",
            //   "#01A4F7",
            //   "#FE2C8A",
            // ],
            color: [
              "#ffff42",
              "#40ff40",
              "#28ffff",
              "#ff0000",
              "#00ff00",
              "#ff8000",
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
                    fontSize: (16 / 1080) * document.body.scrollHeight,
                    lineHeight: 33,
                  },
                  c: {
                    fontSize: (14 / 1080) * document.body.scrollHeight,
                    color: "#eee",
                  },
                  per: {
                    color: "#FDF44E",
                    fontSize: (14 / 1080) * document.body.scrollHeight,
                    padding: [5, 8],
                    borderRadius: 2,
                  },
                },
                textStyle: {
                  color: "#666",
                  fontSize: 14,
                },
              },
            },
            data: xdata,
          },
        ],
      };
      qyhyfb.setOption(option);
    },
    handleClose(done) {
      done();
    },
    handleClick() {
      this.$emit("showEnterprise", this.searchContent);
      this.dialogVisible = false;
    },
    handleSelect(item) {
      this.$emit("showEnterprise", item.firm_name);
      this.dialogVisible = false;
    },
    querySearchAsync(queryString, cb) {
      this.$axios({
        method: "get",
        url: this.baseUrl + "/index/economic/qyzh_qyss?nm=" + queryString,
      }).then((res) => {
        if (res.data.code == 200) {
          this.option = res.data.data[0];
          cb(this.option);
        } else if (res.data.code == 300) {
          this.option = [];
          cb(this.option);
        }
      });
    },
  },
};
</script>

<style scoped lang='less'>
#enterpriseInfo {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  position: relative;
}
.flex {
  display: flex;
}
.hide {
  visibility: hidden;
}
.flex-1 {
  flex: 1;
}
.info-box {
  position: relative;
  height: 89%;
}
.menu {
  position: absolute;
  top: -29px;
  right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.menu div {
  cursor: pointer;
  background: #0f3264;
  border: 1px solid #2061bc;
  border-radius: 0 2px 2px 0;
  font-family: MicrosoftYaHei;
  font-size: 1.3rem;
  color: #bcf6ff;
  padding: 2px 5px;
}
.menu .active {
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
.enterprise-header {
  color: #fff;
  font-size: 1.4rem;
  height: 30%;
  align-items: center;
}
.enterprise-header-left {
  text-align: right;
  padding-right: 25px;
}
.enterprise-header-right {
  padding-left: 25px;
}
.increase {
  color: #1fe86e;
  background: url("../../../assets/subpage/increase.png") no-repeat left;
  background-size: 12px;
  padding-left: 15px;
  font-weight: 500;
}
.decrease {
  color: #fa6400;
  background: url("../../../assets/subpage/reduce.png") no-repeat left;
  background-size: 12px;
  padding-left: 15px;
  font-weight: 500;
}
.in {
  display: inline-block;
}
.mi {
  width: 100%;
  height: 70%;
  position: relative;
  #qyqrqk,
  #qyhyfb {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.search-box {
  position: absolute;
  top: -48px;
  cursor: pointer;
  border: 1px solid #315a92;
  color: #ccc;
  height: 25px;
  line-height: 25px;
  width: 50px;
  padding: 0 2px 0 15px;
  font-size: 12px;
  text-align: center;
  border-radius: 15px;
  background-image: url("../../../assets/subpage/search@1x.png");
  background-repeat: no-repeat;
  background-position: 10px;
}
.el-input-reset {
  width: 100%;
}
.el-input-reset /deep/ .el-input__inner {
  width: 100%;
  padding: 0 15px;
}
</style>