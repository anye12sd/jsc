<template>
  <div id="enterpriseDetail">
    <div class="bigtit">
      <div class="tag"></div>
      <div>{{ enterpriseName }}</div>
    </div>
    <div class="detail-box">
      <div class="menu">
        <div @click="hideEnterprise">返回</div>
      </div>
      <div id="topxq3"></div>
      <div id="topdqyqk3"></div>
      <div class="detail-content" v-if="info.length">
        <div class="flex">
          <div class="flex-1 detail-content-box detail-content-box-left">
            <div>
              <div class="flex">
                <div class="flex-1 detail-content-title detail-status">
                  经营状态
                </div>
                <div class="detail-content-title-num">
                  <template
                    v-for="(item, index) in parseInt(qyzh_pfxq.jyztpf)
                      .toString()
                      .split('')"
                  >
                    <span :key="index">{{ item }}</span>
                  </template>
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[0].zczbgz"
                  placement="top-start"
                >
                  <div>注册资本</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[0].zczbpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[0].jyscgz"
                  placement="top-start"
                >
                  <div>经营时长</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[0].jyscpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[0].bgxxgz"
                  placement="top-start"
                >
                  <div>变更信息</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[0].bgxxpf }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 detail-content-box detail-content-box-right">
            <div>
              <div class="flex">
                <div class="flex-1 detail-content-title detail-dev">
                  创新发展
                </div>
                <div class="detail-content-title-num">
                  <template
                    v-for="(item, index) in parseInt(qyzh_pfxq.cxfzpf)
                      .toString()
                      .split('')"
                  >
                    <span :key="index">{{ item }}</span>
                  </template>
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[1].zzxkgz"
                  placement="top-start"
                >
                  <div>资质许可</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[1].zzxkpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[1].zscqgz"
                  placement="top-end"
                >
                  <div>知识产权</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[1].zscqpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[1].kjxqygz"
                  placement="top-end"
                >
                  <div>科技型企业认定</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[1].kjxqypf }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex-1 detail-content-box detail-content-box-left">
            <div>
              <div class="flex">
                <div class="flex-1 detail-content-title detail-duty">
                  社会责任
                </div>
                <div class="detail-content-title-num">
                  <template
                    v-for="(item, index) in parseInt(qyzh_pfxq.shzrpf)
                      .toString()
                      .split('')"
                  >
                    <span :key="index">{{ item }}</span>
                  </template>
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[2].ldbzgz"
                  placement="top-start"
                >
                  <div>劳动保障</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[2].ldbzpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[2].tsjbgz"
                  placement="top-start"
                >
                  <div>投诉举报</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[2].tsjbpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[2].rybzgz"
                  placement="top-start"
                >
                  <div>荣誉表彰</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[2].rybzpf }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 detail-content-box detail-content-box-right">
            <div>
              <div class="flex">
                <div class="flex-1 detail-content-title detail-ability">
                  贡献能力
                </div>
                <div class="detail-content-title-num">
                  <template
                    v-for="(item, index) in parseInt(qyzh_pfxq.gxnlpf)
                      .toString()
                      .split('')"
                  >
                    <span :key="index">{{ item }}</span>
                  </template>
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[3].zcfzlgz"
                  placement="top-start"
                >
                  <div>资产负债率</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[3].zcfzlpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[3].tzsjdwlgz"
                  placement="top-start"
                >
                  <div>投资实际缴到位率</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[3].tzsjdwlpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[3].xsjlrlgz"
                  placement="top-start"
                >
                  <div>销售净利率</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[3].xsjlrlpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[3].swjngz"
                  placement="top-start"
                >
                  <div>税务缴纳</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[3].swjnpf }}
                </div>
              </div>
              <div class="flex space-between detail-content-content">
                <el-tooltip
                  popper-class="aaaa"
                  class="item flex-1 detail-content-subtitle"
                  effect="dark"
                  :content="info[3].syzqyblgz"
                  placement="top-start"
                >
                  <div>所有者权益比率</div>
                </el-tooltip>
                <div class="detail-content-num">
                  {{ info[3].syzqyblpf }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="last-content">
          <div class="last-content-title">
            <div class="flex">
              <div class="flex-1 detail-content-title detail-hegui">
                合规风险力
              </div>
              <div class="detail-content-title-num">
                <template
                  v-for="(item, index) in parseInt(qyzh_pfxq.hgfxpf)
                    .toString()
                    .split('')"
                >
                  <span :key="index">{{ item }}</span>
                </template>
              </div>
            </div>
            <div class="flex space-between detail-content-content">
              <el-tooltip
                popper-class="aaaa"
                class="item flex-1 detail-content-subtitle"
                effect="dark"
                :content="info[4].hjaqgz"
                placement="top-start"
              >
                <div>环境安全</div>
              </el-tooltip>
              <div class="detail-content-num">
                {{ info[4].hjaqpf }}
              </div>
              <el-tooltip
                popper-class="aaaa"
                class="item flex-1 detail-content-subtitle"
                effect="dark"
                :content="info[4].aqscgz"
                placement="top-start"
              >
                <div>安全生产</div>
              </el-tooltip>
              <div class="detail-content-num">
                {{ info[4].aqscpf }}
              </div>
            </div>
            <div class="flex space-between detail-content-content">
              <el-tooltip
                popper-class="aaaa"
                class="item flex-1 detail-content-subtitle"
                effect="dark"
                :content="info[4].sczxgz"
                placement="top-start"
              >
                <div>市场秩序</div>
              </el-tooltip>
              <div class="detail-content-num">
                {{ info[4].sczxpf }}
              </div>
              <el-tooltip
                popper-class="aaaa"
                class="item flex-1 detail-content-subtitle"
                effect="dark"
                :content="info[4].sfclgz"
                placement="top-start"
              >
                <div>司法处理</div>
              </el-tooltip>
              <div class="detail-content-num">
                {{ info[4].sfclpf }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="search-box" @click="dialogVisible = true">
      搜索
    </div> -->
    <!-- <el-dialog
        :modal="false"
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
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
    </el-dialog> -->
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "enterpriseDetail",
  props: ["enterpriseNameProp"],
  data() {
    return {
      enterpriseName: this.enterpriseNameProp,
      qyzh_pfxq: [],
      qyzh_pfxq1: [],
      info: [],
      baseUrl: "http://10.21.197.236:9000",
      searchContent: "",
      option: [],
      // dialogVisible: false,
      chart1: null,
      chart2: null,
    };
  },
  mounted() {
    if (this.enterpriseNameProp) {
      this.getData(this.enterpriseNameProp);
    }
    window.addEventListener("resize", this.itMyChart11);
    window.addEventListener("resize", this.itMyChart12);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.itMyChart11);
    window.removeEventListener("resize", this.itMyChart12);
  },
  watch: {
    enterpriseNameProp() {
      if (this.enterpriseNameProp) {
        this.getData(this.enterpriseNameProp);
        this.enterpriseName = this.enterpriseNameProp;
      }
    },
  },
  methods: {
    getData(xdata) {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_pfxq?nm=" + xdata,
        // data: data,
      }).then((res) => {
        let optionsdata = res.data;
        if (optionsdata.code == 200) {
          this.qyzh_pfxq = optionsdata.data[0][0];
          this.qyzh_pfxq1 = optionsdata.data[1];
          this.info = optionsdata.data[2];
          this.itMyChart11();
          this.itMyChart12();
        } else if (optionsdata.code == 300) {
          this.$message.error("无法查询该企业请重新输入");
        }
      });
    },
    handleClose(done) {
      done();
    },
    // handleClick(){
    //   this.getData(this.searchContent)
    //   this.dialogVisible = false
    // },
    // handleSelect(item) {
    //   this.getData(item.firm_name)
    //   this.enterpriseName = item.firm_name
    //   this.dialogVisible = false
    // },
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
    itMyChart11() {
      if (this.chart1) {
        this.chart1.dispose();
      }
      let topxq2 = this.$echarts.init(document.getElementById("topxq3"));
      this.chart1 = topxq2;
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
        // title: {
        //   text: "详情",
        //   x: "5%",
        //   y: "0",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 22,
        //     fontWeight: "normal",
        //     align: "center",
        //     width: "200px",
        //   },
        // },
        tooltip: {
          show: true,
          trigger: "item",
          fontSize: (20 / 1080) * document.body.scrollHeight,
        },

        radar: [
          {
            center: ["50%", "55%"],
            radius: "60%",
            startAngle: 90,
            splitNumber: 5,

            axisLabel: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
                type: "dashed",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#fff",
                type: "dashed",
              },
            },
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#fff",
                fontSize: (15 / 1080) * document.body.scrollHeight,
              },
            },
            splitArea: {
              // 坐标轴在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: {
                // 分隔区域的样式设置。
                color: ["rgba(0,0,0,0)", "rgba(0,0,0,0)"],
                // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              },
            },
            indicator: indicator,
          },
        ],
        series: [
          {
            name: "当前分数",
            type: "radar",
            symbol: "none",
            symbolSize: 6,
            areaStyle: {
              normal: {
                color: "rgba(0,145,255,0.9)",
              },
            },
            itemStyle: {
              color: "rgba(0,145,255,0.4)",
            },
            lineStyle: {
              normal: {
                color: "rgba(0,145,255,1)",
                width: 2,
              },
            },
            data: [datavaule],
          },
        ],
      };

      topxq2.setOption(option);
    },
    itMyChart12() {
      if (this.chart2) {
        this.chart2.dispose();
      }
      let topdqyqk2 = this.$echarts.init(document.getElementById("topdqyqk3"));
      this.chart2 = topdqyqk2;
      var x = [];
      var y = [];
      let ymin = 0;
      this.qyzh_pfxq1.map((item, index) => {
        // x.push({
        //     value:item.sj,
        //     textStyle:{
        //         fontSize: 20
        //     }
        // });
        x.push(item.sj);
        y.push(item.zpf);
        if (index == 0) {
          ymin = item.zpf;
        } else if (ymin > item.zpf) {
          ymin = item.zpf;
        }
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
        //     fontSize: "22",
        //   },
        //   subtextStyle: {
        //     color: "#90979c",
        //     fontSize: "16",
        //   },
        // },
        tooltip: {
          show: true,
          trigger: "axis",
          formatter: "{b} {c}",
          textStyle: {
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
        },
        grid: {
          top: "8%",
          left: "4%",
          right: "10%",
          bottom: "6%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            // name: "时间",
            nameTextStyle: {
              color: "#fff",
              fontSize: (14 / 1080) * document.body.scrollHeight,
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
                color: "#fff",
                margin: 15,
                fontSize: (14 / 1080) * document.body.scrollHeight,
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
            name: "每年评分趋势",
            nameTextStyle: {
              color: "#fff",
              fontSize: (12 / 1080) * document.body.scrollHeight,
              padding: [10, 0, 0, 30],
            },
            min: ymin,
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
              margin: 10,
              textStyle: {
                color: "#fff",
                fontSize: (14 / 1080) * document.body.scrollHeight,
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
                color: "#f8c83d", // 线条颜色
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
                color: "#f8c83d",
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
                      color: "#f8c83d",
                    },
                    {
                      offset: 1,
                      color: "rgba(255, 255, 255, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(255, 255, 255, 0)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: y,
          },
        ],
      };

      topdqyqk2.setOption(option);
    },
    hideEnterprise() {
      this.$emit("hideEnterprise");
    },
  },
};
</script>

<style scoped>
#enterpriseDetail {
  width: calc(100% - 25px);
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  position: absolute;
}
.bigtit {
  height: 3.5%;
}
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.detail-box {
  position: relative;
  height: 100%;
}
.menu {
  position: absolute;
  top: -24px;
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
  border-radius: 4px;
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
.detail-status {
  background: url("../../../assets/subpage/jingying@1x.png") no-repeat left;
  padding-left: 28px;
  background-size: 24px;
  font-size: 1.6rem;
}
.detail-dev {
  background: url("../../../assets/subpage/chuangxin@1x.png") no-repeat left;
  padding-left: 28px;
  background-size: 24px;
  font-size: 1.6rem;
}
.detail-duty {
  background: url("../../../assets/subpage/shehui@1x.png") no-repeat left;
  padding-left: 28px;
  background-size: 24px;
  font-size: 1.6rem;
}
.detail-ability {
  background: url("../../../assets/subpage/gongxian@1x.png") no-repeat left;
  padding-left: 28px;
  background-size: 24px;
  font-size: 1.6rem;
}
.detail-hegui {
  background: url("../../../assets/subpage/hegui@1x.png") no-repeat left;
  padding-left: 28px;
  background-size: 24px;
  font-size: 1.6rem;
}
.detail-content-title-num span {
  border: 1px solid #509dff;
  padding: 2px;
  margin-left: 3px;
  background: #133157;
  color: #00eaff;
}
.detail-content-subtitle {
  font-size: 1.2rem;
  color: #fff;
}
.detail-content-num {
  color: #fff;
  font-size: 1.2rem;
}
.detail-content-content {
  margin-top: 0.6rem;
}
.detail-content-box-left {
  margin-right: 10px;
}
.detail-content-box {
  border: 1px solid rgba(148, 193, 255, 0.4);
  margin-top: 0.8rem;
  background: #1b4786;
  padding: 9px;
  border-radius: 5px;
}
.last-content {
  border: 1px solid rgba(148, 193, 255, 0.4);
  margin-top: 1rem;
  background: #1b4786;
  padding: 8px;
  border-radius: 5px;
}
.last-content .detail-content-content .detail-content-num:nth-child(2) {
  margin-right: 28px;
}
#topxq3 {
  width: 100%;
  height: 21%;
}
#topdqyqk3 {
  width: 100%;
  height: 22%;
}
.search-box {
  position: absolute;
  top: -32px;
  cursor: pointer;
  border: 1px solid #315a92;
  color: #ccc;
  height: 25px;
  line-height: 25px;
  width: 50px;
  padding: 0 2px 0 15px;
  font-size: 1.2rem;
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
<style lang='less'>
.aaaa {
  width: 300px;
}
.el-dialog {
  z-index: 2005;
}
</style>