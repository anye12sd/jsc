<template>
  <div class="peopleLiving">
    <div class="bigtit">
      <div class="tag"></div>
      <div>民生诉求</div>
    </div>
    <div class="shsqtop">
      <div>
        <div>热线受理</div>
        <div style="color: #00eaff">{{ cnzt_shsq1.rxsls }}</div>
      </div>
      <div class="sp">
        <div>
          <img src="@/assets/subpage/satisfied.png" alt="" />
          <span>满意度</span>
        </div>
        <div style="color: #14fc8c; font-size: 1.4rem">
          <span class="nu"></span> {{ cnzt_shsq1.myd }}
        </div>
      </div>
      <div>
        <div>满意</div>
        <div style="color: #00eaff">{{ cnzt_shsq1.mys }}</div>
      </div>
      <div>
        <div>不满意</div>
        <div style="color: #ff4747">{{ cnzt_shsq1.bmys }}</div>
      </div>
    </div>
    <div class="subtit">诉求热词分析</div>
    <div id="sqrcfx"></div>
  </div>
</template>

<script>
// 民生诉求
export default {
  naem: "peopleLiving",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      cnzt_shsq1: {},
      cnzt_shsq3: [],
    };
  },
  mounted() {
    this.getdata();
    window.addEventListener("resize", this.itMyChart4);
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.itMyChart4)
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/cnzt_shsq",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.cnzt_shsq1 = optionsdata.data[0][0];
            this.cnzt_shsq3 = optionsdata.data[2];
            this.itMyChart4();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itMyChart4() {
      let sqrcfx = this.$echarts.init(document.getElementById("sqrcfx"));
      let data = [];
      this.cnzt_shsq3.map((item, index) => {
        data.push({
          name: item,
          value: 3000 - index * 100,
        });
      });
      let randcolor = (params) => {
        let color = ["#f7b500", "#00d47f", "#00d47f", "#00a8db", "#45b8ef"];
        if (params.dataIndex > 5) {
          let r = 100 + ~~(Math.random() * 100);
          let g = 135 + ~~(Math.random() * 100);
          let b = 100 + ~~(Math.random() * 100);
          color.push(`rgb(${r}, ${g}, ${b})`);
        }
        return color[params.dataIndex];
      };

      var option = {
        title: {
          text: "",
        },
        tooltip: {},
        series: [
          {
            name: "",
            type: "wordCloud",
            gridSize: 20,
            sizeRange: [(17 / 1080) * document.body.scrollHeight, (30 / 1080) * document.body.scrollHeight],
            rotationRange: [0, 0],
            shape: "circle",
            textStyle: {
              normal: {
                color: (params) => {
                  return randcolor(params);
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: data,
          },
        ],
      };

      sqrcfx.setOption(option);
    },
  },
};
</script>

<style scoped lang="less">
.peopleLiving {
  width: 100%;
  height: 89%;
  color: #fff;
  box-sizing: border-box;
  .subtit {
    width: 80%;
    font-family: MicrosoftYaHei-Bold;
    font-size: 1.4rem;
    color: #ffffff;
    margin: 1rem auto 0 auto;
  }
  .shsqtop {
    display: flex;
    height: 20%;
    width: 80%;
    margin: 0 auto;
    justify-content: space-around;
    > div {
      > div:nth-child(1) {
        font-family: MicrosoftYaHei;
        font-size: 1.6rem;
        color: #ffffff;
      }
      > div:nth-child(2) {
        font-family: DINAlternate-Bold;
        font-size: 2.6rem;
      }
    }
    .sp {
      vertical-align: middle;
      background: rgba(49, 127, 239, 0.27);
      border: 1px solid rgba(148, 193, 255, 0.2);
      border-radius: 2px;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #ffffff;
      padding: 0 5px;
      * {
        vertical-align: middle;
      }
      img,
      .nu {
        display: inline-block;
        width: 1.8rem;
        margin-right: 5px;
      }
    }
  }
  #sqrcfx {
    height: 57%;
  }
}
</style>