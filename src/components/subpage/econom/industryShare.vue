<template>
  <div class="industryShare">
    <div class="tit">产业占比情况</div>
    <div class="main">
      <div>
        <el-row>
          <el-col :span="12"
            ><div class="cycolor">第一产业</div>
            <div class="cynumber">
              {{ cyhl_bzqk.cy_one }}<span>亿元</span>
            </div></el-col
          >
          <el-col :span="12"
            ><div class="cycolor">同比增加</div>
            <div class="cyzj">
              <div>{{ cyhl_bzqk.tbzj_one }}</div>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"
            ><div class="cycolor">第二产业</div>
            <div class="cynumber">
              {{ cyhl_bzqk.cy_tow }}<span>亿元</span>
            </div></el-col
          >
          <el-col :span="12"
            ><div class="cycolor">同比增加</div>
            <div class="cyzj">
              <div>{{ cyhl_bzqk.tbzj_two }}</div>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"
            ><div class="cycolor">第三产业</div>
            <div class="cynumber">
              {{ cyhl_bzqk.cy_three }}<span>亿元</span>
            </div></el-col
          >
          <el-col :span="12"
            ><div class="cycolor">同比增加</div>
            <div class="cyzj">
              <div>{{ cyhl_bzqk.tbzj_three }}</div>
            </div></el-col
          >
        </el-row>
      </div>
      <div id="cyzb"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "industryShare",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      cyhl_bzqk: {},
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/cyhl_bzqk",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.cyhl_bzqk = optionsdata.data[0];
            this.drawing();
          }
          //   this.itMyChart();
          //  console.log(this.cyhl_bzqk,88)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawing() {
      let cyzb = this.$echarts.init(document.getElementById("cyzb"));
      var zonh =
        parseInt(this.cyhl_bzqk.cy_one) +
        parseInt(this.cyhl_bzqk.cy_three) +
        parseInt(this.cyhl_bzqk.cy_tow);
      var seriesData = [
        {
          name: "第一产业",
          value: this.cyhl_bzqk.cy_one,
        },
        {
          name: "第二产业",
          value: this.cyhl_bzqk.cy_three,
        },
        {
          name: "第三产业",
          value: this.cyhl_bzqk.cy_tow,
        },
      ];

      var colorList = [
        "#73DDFF",
        "#73ACFF",
        "#FDD56A",
        "#FDB36A",
        "#FD866A",
        "#9E87FF",
        "#58D5FF",
      ];
      var option = {
        title: {
          text: "产业占比",
          x: "14%",
          y: "40%",
          // textStyle: {
          //   color: "#fff",
          // },
          textStyle: {
            color: "#fff",
            fontSize: "16",
          },
        },
        tooltip: {
          trigger: "item",
          borderColor: "rgba(255,255,255,.3)",
          backgroundColor: "rgba(13,5,30,.6)",
          borderWidth: 1,
          padding: 5,
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
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "54%",
          align: "left",
          top: "30%",
          formatter: function (name) {
            var percent;
            seriesData.map((item) => {
              if (item.name === name) {
                //  console.log(item.value,222)
                percent = ((item.value / zonh) * 100).toFixed(2);
              }
            });
            return name + "" + percent + "%";
          },
          textStyle: {
            color: "#fff",
          },
          height: 250,
          // data: legendData,
        },
        series: [
          {
            type: "pie",
            z: 3,
            center: ["28%", "45%"],
            radius: ["40%", "68%"],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
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
.industryShare {
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
    display: flex;
    margin-top: 20px;
    >div:nth-of-type(1){
        width: 45%;
    }
    >div:nth-of-type(2){
        width: 55%;
    }
  }
  .main > div {
    // width: 50%;
    text-align: center;
    >.el-row:nth-of-type(2),>.el-row:nth-of-type(3){
        margin-top: 20px;
    }
  }
  
}
</style>