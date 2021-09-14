<template>
  <div id="carbon">
    <div class="bigtit" style="height:5%;">
      <div class="tag"></div>
      <div>碳排放总量排行</div>
    </div>
    <div class="carbon-box">
      <div class="carbon-rank-box">
        <div class="menu">
          <div :class="active == 0 ? 'active' : ''" @click="swit(0)">
            湖州市
          </div>
          <div :class="active == 1 ? 'active' : ''" @click="swit(1)">
            行业
          </div>
          <div :class="active == 2 ? 'active' : ''" @click="swit(2)">
            乡镇街
          </div>
        </div>
        <div class="carbon-rank">
          <template v-if="active == 0">
            <div class="carbon-rank-content flex" v-for="(item, index) in huzhoushi" :key="index">
              <div class="flex-1 carbon-rank-content-index">
                <span>{{ index + 1 }}</span>
              </div>
              <div class="flex-4 carbon-rank-content-name">
                {{ item.Name }}
              </div>
              <div class="flex-2 carbon-rank-content-val">
                {{ item.Val }}
              </div>
            </div>
          </template>
          <template v-if="active == 1">
            <div class="carbon-rank-content flex" v-for="(item, index) in industry" :key="index">
              <div class="flex-1 carbon-rank-content-index">
                <span>{{ index + 1 }}</span>
              </div>
              <div class="flex-4 carbon-rank-content-name">
                {{ item.Name }}
              </div>
              <div class="flex-2 carbon-rank-content-val">
                {{ item.Val.toFixed(0) }}
              </div>
            </div>
          </template>
          <template v-if="active == 2">
            <div class="carbon-rank-content flex" v-for="(item, index) in xiang" :key="index">
              <div class="flex-1 carbon-rank-content-index">
                <span>{{ index + 1 }}</span>
              </div>
              <div class="flex-4 carbon-rank-content-name">
                {{ item.Name }}
              </div>
              <div class="flex-2 carbon-rank-content-val">
                {{ item.Val.toFixed(0) }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="carbon-rank-chart">
        <div id="hzbt"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "carbon",
  data(){
    return {
      active: 0,
      huzhoushi: [],
      xiang: [],
      industry: [],
      chart:null
    }
  },
  mounted() {
    this.getData()
    window.addEventListener("resize", this.drawhzbt);
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.drawhzbt)
  },
  methods: {
    swit(val) {
      if (val == this.active) return;
      this.active = val;
    },
    getData() {
      axios
          .get(
              "http://218.75.53.67:58080/TXM/DaPing/QXHZSTCPZLPH?type=0&Year=" +
              new Date().getFullYear() +
              "&Quarter=1"
          )
          .then((res) => {
            if (res.data.Code == 200) {
              this.huzhoushi = res.data.Result;
              this.drawhzbt();
            }
          });

      axios
          .get(
              "http://218.75.53.67:58080/TXM/DaPing/QXTCPZLPH?type=0&Year=" +
              new Date().getFullYear() +
              "&Quarter=1"
          )
          .then((res) => {
            if (res.data.Code == 200) {
              this.xiang = res.data.Result.List;
            }
          });

      axios
          .get(
              "http://218.75.53.67:58080/TXM/DaPing/QXHYTCPZLPH?type=0&Year=" +
              new Date().getFullYear() +
              "&Quarter=1"
          )
          .then((res) => {
            if (res.data.Code == 200) {
              this.industry = res.data.Result;
            }
          });
    },
    drawhzbt() {
      if (this.chart) {
        this.chart.dispose();
      }
      let hzbt = this.$echarts.init(document.getElementById("hzbt"));
      this.chart = hzbt
      let data = [];
      this.huzhoushi.forEach((item) => {
        data.push({
          name: item.Name,
          value: item.Val,
        });
      });
      let option = {
        // title: {
        //   text: "总量占比情况",
        //   left: 0,
        //   top: 30,
        //   textStyle: {
        //     fontStyl: "SourceHanSansCN-Bold",
        //     fontSize: 17.6,
        //     color: "#FFFFFF",
        //   },
        // },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: (14 / 1080) * document.body.scrollHeight,
          },
        },
        grid: {
          top: 20,
        },
        legend: {
          icon:'circle',
          orient: "horizontal",
          left: "center",
          bottom: 35,
          textStyle: {
            color: "#fff",
            fontSize:(14 / 1080) * document.body.scrollHeight,
          },
        },

        series: [
          {
            type: "pie",
            radius: ["30%", "50%"],
            center: ["50%", "30%"],
            label: {
              show: false,
              fontSize: (20 / 1080) * document.body.scrollHeight,
            },
            color: [
              "#26C1FF",
              "#A907EA",
              "#4AFFB7",
              "#024EE1",
              "#FFBE00",
              "#FF6E4C",
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
      hzbt.setOption(option);
    },
  }
}
</script>

<style scoped>
#carbon {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.flex{
  display: flex;
}
.flex-1{
  flex: 1;
}
.flex-2{
  flex: 2;
}
.flex-4{
  flex: 4;
}
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
}
.menu div{
  cursor: pointer;
  background: #0f3264;
  border: 1px solid #2061bc;
  border-radius: 0 2px 2px 0;
  font-family: MicrosoftYaHei;
  font-size: 1.3rem;
  color: #bcf6ff;
  padding: 2px 5px;
}
.menu .active{
  background-image: linear-gradient(179deg,
  #3688ff 19%,
  #1a57ab 63%,
  #1c3e68 100%);
  border: 1px solid #94c1ff;
  border-radius: 2px 0 0 2px;
  font-family: MicrosoftYaHei;
  font-size: 1.4rem;
  color: #ffffff;
}
.carbon-box{
  height: 95%;
}
.carbon-rank{
  max-height: 78%;
  overflow: auto;
}
.carbon-rank-content{
  margin-top: 6px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
}
.carbon-rank-content-index{
  text-align: right;
  font-size: 12px;
  margin-right: 8px;
}
.carbon-rank-content-index span{
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  border: 1px solid #fff;
  text-align: center;
  border-radius: 50%;
}
.carbon-rank-content-val{
  color: #20E057;
}
.carbon-rank-content:nth-child(1) .carbon-rank-content-val{
  color: #E02020;
}
.carbon-rank-content:nth-child(2) .carbon-rank-content-val{
  color: #FF9000;
}
.carbon-rank-content:nth-child(3) .carbon-rank-content-val{
  color: #FFE700;
}
.carbon-rank-content-name{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.carbon-rank-box{
  height: 40%;
}
.carbon-rank-chart{
  height: 60%;
}
#hzbt{
  width: 100%;
  height: 100%;
}
</style>