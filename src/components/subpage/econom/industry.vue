<template>
  <div id="industry">
    <div class="bigtit">
      <div class="tag"></div>
      <div>产业比重情况</div>
    </div>
    <div class="product flex">
      <template v-if="show">
        <div id="cyzb" class="flex-2"></div>
      </template>
      <div class="product-detail flex-3">
        <template v-if="cyhl_bzqk.tbzj_three">
          <div class="product-detail-box first">
            <div class="flex">
              <div class="industry-name">第一产业</div>
              <div :class="cyhl_bzqk['tbzj_one'].split('%')[0] * 1  > 0 ? 'increase' : 'decrease'">{{cyhl_bzqk['tbzj_one'].split('%')[0] * 1  > 0 ? '+' : '-'}}{{ cyhl_bzqk['tbzj_one'] }}</div>
            </div>
            <div>
              <span class="industry-num">数量：{{ cyhl_bzqk['cy_one'] }}</span> 占比：{{ cyhl_bzqk['zb_one'] }}
            </div>
          </div>
          <div class="product-detail-box second">
            <div class="flex">
              <div class="industry-name">第二产业</div>
              <div :class="cyhl_bzqk['tbzj_two'].split('%')[0] * 1  > 0 ? 'increase' : 'decrease'">{{cyhl_bzqk['tbzj_two'].split('%')[0] * 1  > 0 ? '+' : '-'}}{{ cyhl_bzqk['tbzj_two'] }}</div>
            </div>
            <div>
              <span class="industry-num">数量：{{ cyhl_bzqk['cy_tow'] }}</span> 占比：{{ cyhl_bzqk['zb_two'] }}
            </div>
          </div>
          <div class="product-detail-box third">
            <div class="flex">
              <div class="industry-name">第三产业</div>
              <div :class="cyhl_bzqk['tbzj_three'].split('%')[0] * 1  > 0 ? 'increase' : 'decrease'">{{cyhl_bzqk['tbzj_three'].split('%')[0] * 1  > 0 ? '+' : '-'}}{{ cyhl_bzqk['tbzj_three'] }}</div>
            </div>
            <div>
              <span class="industry-num">数量：{{ cyhl_bzqk['cy_three'] }}</span> 占比：{{ cyhl_bzqk['zb_three'] }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// 出生
import echarts from "echarts";
import qs from "qs"

export default {
  name: "industry",
  data() {
    return {
      baseUrl: 'http://10.21.197.236:9000',
      show: true,
      cyhl_bzqk: {},
      chart: ''
    };
  },
  mounted() {
    this.getdata();
    window.addEventListener("resize", this.drawing);
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.drawing)
  },
  methods: {
    getdata() {
      let data = qs.stringify({
        nx: 2020,
      });
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/cyhl_bzqk",
        data: data,
      })
          .then((res) => {
            let optionsdata = res.data;
            if (optionsdata.code == 200) {
              this.cyhl_bzqk = optionsdata.data[0];
              this.total =
                  this.cyhl_bzqk.cy_one * 1 +
                  this.cyhl_bzqk.cy_tow * 1 +
                  this.cyhl_bzqk.cy_three * 1;
              this.drawing();
            }
            else{
              this.$message.error('无法获取产业比重数据，请联系管理员')
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    drawing() {
      if (this.chart) {
        this.chart.dispose();
      }
      let cyzb = echarts.init(document.getElementById("cyzb"));
      this.chart = cyzb;
      // var zonh =
      //   parseInt(this.cyhl_bzqk.cy_one) +
      //   parseInt(this.cyhl_bzqk.cy_three) +
      //   parseInt(this.cyhl_bzqk.cy_tow);
      var seriesData = [
        {
          name: "第一产业",
          value: this.cyhl_bzqk.cy_one,
        },
        {
          name: "第二产业",
          value: this.cyhl_bzqk.cy_tow,
        },
        {
          name: "第三产业",
          value: this.cyhl_bzqk.cy_three,
        },
      ];

      // var colorList = [
      //   "#73DDFF",
      //   "#73ACFF",
      //   "#FDD56A",
      //   "#FDB36A",
      //   "#FD866A",
      //   "#9E87FF",
      //   "#58D5FF",
      // ];
      var option = {
        tooltip: {
          trigger: "item",
          borderColor: "rgba(255,255,255,.3)",
          backgroundColor: "rgba(13,5,30,.6)",
          borderWidth: 1,
          padding: 5,
          position: (point) => {
            return [point[0], point[1]];
          },
          formatter: function (parms) {
            var str =
                parms.marker +
                "" +
                parms.data.name +
                "</br>" +
                "数量：" +
                parms.data.value +
                "占比：" +
                parms.percent +
                "%";
            return str;
          },
          textStyle: {
            fontSize: 14,
            color: '#fff'
          },
        },
        // legend: {
        //   type: "scroll",
        //   icon: "circle",
        //   orient: "vertical",
        //   left: "54%",
        //   align: "left",
        //   top: "25%",
        //   //   图例每项之间间隔
        //   itemGap: 37,
        //   formatter: function (name) {
        //     var percent;
        //     seriesData.map((item) => {
        //       if (item.name === name) {
        //         //  console.log(item,222)
        //         percent = ((item.value / zonh) * 100).toFixed(2);
        //       }
        //     });
        //     return name + "  " + percent + "%";
        //   },
        //   textStyle: {
        //     color: "#fff",
        //     fontFamily: "PingFangSC-Regular",
        //     fontSize: 24,
        //   },
        //   height: 250,
        //   // data: legendData,
        // },
        series: [
          {
            type: "pie",
            z: 3,
            center: ["50%", "50%"],
            radius: ["45%", "70%"],
            color: [
              "#FFBE00",
              "#4AFFB7",
              "#024EE1",
              "#ff0000",
              "#00ff00",
              "#ff8000",
            ],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            // itemStyle: {
            //   normal: {
            //     color: function (params) {
            //       return colorList[params.dataIndex];
            //     },
            //   },
            // },
            label: {
              show: false,
            },
            data: seriesData,
          },
        ],
      };

      cyzb.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
#industry {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.flex{
  display: flex;
}
.flex-2{
  flex: 2;
}
.flex-3 {
  flex: 3;
}
.product{
  padding-bottom: 12px;
  font-size: 12px;
  height: 89%;
}
#cyzb{
  height: 100%;
}
.product-detail{
  font-size: 12px;
  color: #32C5FF;
}
.product-detail-box{
  margin-top: 15px;
  font-size: 12px;
}
.product-detail-box > div:nth-child(2){
  margin-top: 6px;
}
.product-detail-box:nth-child(1){
  margin-top: 15px;
}
.industry-name{
  color: #fff;
  margin-right: 40px;
}
.industry-num{
  margin-right: 25px;
}
.increase{
  color: #14FC8C;
  background: url("../../../assets/subpage/increase.png")no-repeat left;
  background-size: 12px;
  padding-left: 15px;
  font-weight: 500;
}
.decrease{
  color: #FC5914;
  background: url("../../../assets/subpage/reduce.png")no-repeat left;
  background-size: 12px;
  padding-left: 15px;
  font-weight: 500;
}
</style>