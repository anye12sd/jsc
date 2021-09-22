<template>
  <div id="GDP">
    <div class="bigtit" style="height:5%;">
      <div class="tag"></div>
      <div>GDP预测</div>
    </div>
    <div class="GDP-box">
      <div class="GDP-preview-box">
        <div class="userInput">
          <div class="elect">工业用电量：</div>
          <input type="text" v-model="electricity" class="eleinput" />
          <span class="company">亿kw</span>
        </div>
        <div class="userInput">
          <div class="elect">偏量：</div>
          <el-select v-model="pianliang" placeholder="请选择" class="pianliang">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <i class="icondiy"></i>
        </div>
        <div class="guessRes">
          <div class="tit">GDP工业产值预测结果</div>
          <div class="result">
            <span class="first">￥：</span>
            {{ guessRes }}
            <span class="last">亿元</span>
          </div>
        </div>
      </div>
      <div class="GDP-chart">
        <div id="nesynew"></div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import echarts from 'echarts'
export default {
  name: "GDP",
  data() {
    return {
      pianliang: 0,
      electricity: 1,
      options: [
        {
          value: 0.5,
          label: 0.5,
        },
        {
          value: 1,
          label: 1,
        },
        {
          value: 1.5,
          label: 1.5,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 2.5,
          label: 2.5,
        },
      ],
      baseUrl: 'http://10.21.197.236:9000',
      chart: null,
      timeInterval: 2000,
      timer: null
    };
  },
  mounted() {
    this.getData()
    window.addEventListener("resize", this.itMyChartGDP);
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.itMyChartGDP)
  },
  methods: {
    getData(){
      let data1 = qs.stringify({
        nx: 2020,
      });
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/gdp_czyc",
        data: data1,
      })
          .then((res) => {
            let optionsdata = res.data;
            if (optionsdata.code == 200) {
              this.gdp_czyc = optionsdata.data[0];
              this.itMyChartGDP();
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    itMyChartGDP() {
      if (this.chart) {
        this.chart.dispose();
      }
      let nesynew = echarts.init(document.getElementById("nesynew"));
      this.chart = nesynew
      let x = [];
      let y1 = [];
      let y2 = [];
      let max1 = 0;
      let max2 = 0;
      if(this.gdp_czyc.length == 0) return
      this.gdp_czyc.map((item, index) => {
        y1.push((item.GYCZ *1).toFixed(0));
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
      // console.log(max1);
      let option = {
        grid: {
          top: "30%",
          left: "3%",
          right: "3%",
          bottom: "5%",
          containLabel: true,
        },
        title: {
          text: "工业产值历年变化情况",
          // "subtext": "BY MICVS",
          top:'5%',
          textStyle: {
            color: "#fff",
            fontSize: (16 / 1080) * document.body.scrollHeight,
          },
        },
        legend: {
          right: "15px",
          top: "5%",
          width: "170px",
          height: "100px",
          type: "plain",
          textStyle: {
            color: "#ddd",
            fontFamily: "SourceHanSansCN-Norma",
            fontSize: (14 / 1080) * document.body.scrollHeight,
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
        tooltip: {
          trigger: "axis",
          textStyle:{
            fontSize:(14 / 1080) * document.body.scrollHeight,
          },
          formatter: (param) => {
            var str = "";
            str = `${param[0].name}`;
            let mar = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-image:linear-gradient(180deg, #00EAFF 0%, #1C8CF7 100%);"></span>'
            param.forEach((item) => {
              if (item.data) {
                if(item.seriesName == '产值') {
                  str += `<br>${mar} ${item.data}`;
                } else {
                  str += `<br>${item.marker} ${item.data}`;
                }

              }
            });
            return str;
          },
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
            fontSize: (14 / 1080) * document.body.scrollHeight,
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
              fontSize: (14 / 1080) * document.body.scrollHeight,
              padding: [10, 0, 0, 0],
            },
            min: 0,
            max: Math.ceil(max1),
            interval: Math.ceil(max1 / 8),
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
              margin: 5,
              textStyle: {
                fontSize: (14 / 1080) * document.body.scrollHeight,
                color: "#d1e6eb",
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            // type: 'category',
            type:'value',
            name: "增长率%",
            nameTextStyle: {
              color: "#fff",
              fontSize: (14 / 1080) * document.body.scrollHeight,
              // padding: [10, 0, 0, 0],
            },
            // min: 0,
            // max: Math.ceil(max2),
            // data:["-100","-40","-20","-10","-5",'0',"5","10","20","40","100"],
            // interval: Math.ceil(max2 / 8),
            // splitNumber: 11,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#0a3256",
              },
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
            // data:["0%",`${max2/8}`,`${max2/8*2}`,`${max2/8*3}`,`${max2/8*4}`,`${max2/8*5}`,`${max2/8*6}`,`${max2/8*7}`,`${max2}`],
            axisLabel: {
              show: true,
              margin: 5,
              textStyle: {
                color: "#d1e6eb",
              },
              formatter: "{value}%",
              // formatter:(a,b)=>{
              //   console.log(a,b)
              //   return yd[b]+"%"
              // }
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
              show: false,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
            barWidth:14,
            itemStyle: {
              // color:"#008EF9",
              fontSize:(14 / 1080) * document.body.scrollHeight,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00EAFF",
                },
                {
                  offset: 1,
                  color: "#1C8CF7",
                },
              ]),
            },
            data: y1,
          },
          {
            name: "增长率",
            type: "line",
            symbolSize: 5,
            yAxisIndex: 1,
            // lineStyle: {
            //   normal: {
            //     color: "#F7B500", // 线条颜色
            //   },
            //   borderColor: "#f0f",
            // },
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
            data: y2,
          },
        ],
      };
      nesynew.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        nesynew.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % y2.length;
        nesynew.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });

        nesynew.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: inda,
        });
      }, this.timeInterval);
      this.timer = timer
    },
  },
  computed: {
    guessRes() {
      return (
          (this.pianliang * 1 + this.electricity * 1 + 0.14110188 + 1.35494991).toFixed(8)
      );
    },
  },
}
</script>

<style scoped>
#GDP {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.flex{
  display: flex;
}
.GDP-box{
  height: 95%;
}
.GDP-preview-box{
  width: 100%;
  height: 40%;
  overflow: hidden;
}
.GDP-chart{
  width: 100%;
  height: 60%;
}
.pianliang {
  height: 30px;
  width: 60%;
  box-sizing: border-box;
}
.userInput {
  display: flex;
  align-items: center;
}
.elect {
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: right;
  width: 75px
}

.company {
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  position: relative;
  left: -30px;
}
.icondiy {
  position: relative;
  left: -26px;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: 13px;
  height: 11px;
  border-top: 12px solid #d8d8d8;
  border-right: 6.5px solid transparent;
  border-left: 6.5px solid transparent;
  border-bottom: none;
}
.eleinput {
  box-sizing: border-box;
  background: rgba(148,193, 255, 0.3);
  border: 1px solid #94C1FF;
  border-radius: 8px;
  height: 30px;
  display: block;
  font-size: 14px;
  color: #f7b500;
  letter-spacing: 0;
  text-align: center;
  outline: none;
  width: 60%;
  padding: 0 35px 0 10px;
}
.guessRes .tit{
  margin-top: 12px;
  font-size: 12px;
}
.guessRes .result{
  margin-top: 12px;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  background: linear-gradient(
      180deg
      , #007FFF 0%, #012F99 100%);
  border-radius: 8px;
  position: relative;
}
.guessRes .result span{
  font-size: 14px;
}
.guessRes .result .last{
  position: absolute;
  right: 20px;
  top: 0;
}
#nesynew{
  width: 100%;
  height: 100%;
}
</style>
<style lang='less' >
#GDP{
.userInput{
  position: relative;
  margin-top: 1.2rem;
  padding: 0
}
.userInput .el-input__inner{
  font-size: 14px;
  color: #f7b500;
  letter-spacing: 0;
  text-align: center;
  outline: none;
  background: rgba(148,193, 255, 0.3);
  border: 1px solid #94C1FF;
  border-radius: 8px;
  height: 30px;
  padding: 0 35px 0 10px;
  outline: none;
  width: 100%;
}
.userInput .el-select__caret {
  display: none;
}
.el-select-dropdown {
  background: rgba(18, 24, 32, 0.9);
  border: 1px solid #7e8187;
  border-radius: 4px;
}
.el-select-dropdown__item {
  font-size: 14px;
  color: #fff;
  letter-spacing: 0;
  text-align: center;
  background: none;
}
.el-select-dropdown__item:hover {
  background: rgba(21, 45, 60, 0.9);
  color: #32c5ff;
}
.el-select-dropdown__item.hover {
  background: rgba(21, 45, 60, 0.9);
}
.el-input__inner{
  padding: 0;
  width: auto;
}
}

</style>