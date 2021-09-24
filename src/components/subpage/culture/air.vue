<template>
  <div id="air">
    <div class="bigtit">
      <div class="tag"></div>
      <div>空气质量</div>
    </div>
    <div class="menu">
      <div :class="active == 0 ? 'active' : ''" @click="swit(0)">
        实时指数
      </div>
      <div :class="active == 1 ? 'active' : ''" @click="swit(1)">
        近一年数据
      </div>
    </div>
    <div class="content">
      <div id="chart3"></div>
      <div id="chart4"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "air",
  data(){
    return {
      active: 0,
      child01: {},
      child02: {},
      child03: {},
      chart3: "",
      chart4: "",
      timeInterval: 2000,
      timer: null
    }
  },
  mounted() {
    this.getData()
    window.addEventListener("resize", this.drawing);
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.drawing)
  },
  methods:{
    getData(){
      let data = btoa('http://jczl.giscloud.cx/front-jczl-dpm/stwm/json/module03.json')
      let url = process.env.NODE_ENV == "development" ? '/api/front-jczl-dpm/stwm/json/module03.json' : 'url?url=' + data
      this.$axios({
        method: "get",
        url: url,
      })
          .then((res) => {
            let optionsdata = res.data.data.data;
            // let optionsdata = res.data.data; // 本地环境用这个变量
            this.child03 = optionsdata.child03
            this.child02 = optionsdata.child02
            this.child01 = optionsdata.child01
            this.$nextTick(function (){
              this.drawing()
            })
          })
          .catch((err) => {
            console.log(err);
          });
    },
    swit(val) {
      if (val == this.active) return;
      this.active = val;
    },
    drawing(){
      this.drawingChart3()
      this.drawingChart4()
    },
    drawingChart3(){
      if (this.chart3) {
        this.chart3.dispose();
      }
      let chart3 = echarts.init(document.getElementById("chart3"));
      this.chart3 = chart3
      let data = [];
      this.child02.data.forEach((item) => {
        data.push({
          name: item.label,
          value: item.value,
        });
      });
      let option = {
        title: {
          text: this.child02.label,
          left: 0,
          top: 20,
          textStyle: {
            fontStyl: "SourceHanSansCN-Bold",
            fontSize: (18 / 1080) * document.body.scrollHeight,
            color: "#FFFFFF",
          },
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
          formatter:function(params){
            return `${params.name} : ${params.percent}% <br/> ${params.value}天`
          }
        },
        grid: {
          top: 20,
        },
        legend: {
          icon:'circle',
          orient: "vertical",
          right: "25%",
          bottom: "0%",
          textStyle: {
            color: "#fff",
            fontSize:(16 / 1080) * document.body.scrollHeight,
          },
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "65%"],
            center: ["30%", "65%"],
            label: {
              show: false,
              fontSize: (20 / 1080) * document.body.scrollHeight,
            },
            color: [
              "#4AFFB7",
              "#FFBE00",
              "#FF6E4C",
              "#26C1FF",
              "#AA07E1",
            ],
            // labelLine: {
            //   length: 6,
            //   length2: 6,
            // },
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      chart3.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart3.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % data.length;
        chart3.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });
        chart3.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: inda,
        });
      }, this.timeInterval);
      this.timer = timer
    },
    drawingChart4(){
      if (this.chart4) {
        this.chart4.dispose();
      }
      let chart4 = echarts.init(document.getElementById("chart4"));
      this.chart4 = chart4
      let data = [];
      this.child03.data.forEach((item) => {
        data.push({
          name: item.label,
          value: item.value,
        });
      });
      let option = {
        title: {
          text: this.child03.label,
          left: 0,
          top: 20,
          textStyle: {
            fontStyl: "SourceHanSansCN-Bold",
            fontSize: (18 / 1080) * document.body.scrollHeight,
            color: "#FFFFFF",
          },
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
          formatter:function(params){
            return `${params.name} : ${params.percent}% <br/> ${params.value}天`
          }
        },
        grid: {
          top: 20,
        },
        legend: {
          icon:'circle',
          orient: "vertical",
          right: "25%",
          bottom: "0%",
          textStyle: {
            color: "#fff",
            fontSize:(16 / 1080) * document.body.scrollHeight,
          },
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "65%"],
            center: ["30%", "65%"],
            label: {
              show: false,
              fontSize: (20 / 1080) * document.body.scrollHeight,
            },
            color: [
              "#4AFFB7",
              "#FFBE00",
              "#FF6E4C",
              "#26C1FF",
              "#AA07E1",
              "#024EE1",
            ],
            // labelLine: {
            //   length: 6,
            //   length2: 6,
            // },
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      chart4.setOption(option);
      let inda = -1;
      let timer = setInterval(() => {
        chart4.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: inda,
        });
        inda = (inda + 1) % data.length;
        chart4.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: inda,
        });
        chart4.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: inda,
        });
      }, this.timeInterval);
      this.timer = timer
    },
  }
}
</script>

<style scoped>
#air {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.bigtit{
  height: 3.5%;
}
.menu {
  position: absolute;
  top: 14px;
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
.content{
  height: 92%;
  margin-top: 15px;
}
#chart3{
  height: 45%;
}
#chart4{
  height: 50%;
}
</style>