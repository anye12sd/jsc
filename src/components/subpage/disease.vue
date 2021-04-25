<template>
  <div class="disease">
    <div class="tit">疾病</div>
    <div class="topsxl">疾病排行(今年)</div>
    <el-row>
      <el-col :span="12">
        <div class="toppm">
          <div
            class="toppmdiv"
            v-for="(item, index) in lnzt_st1"
            :key="index"
            :style="`background-image: linear-gradient(to right,#004864 0%,#004864 ${
              item.rs / 1000
            }%,transparent ${item.rs / 1000}%,transparent 100%);`"
          >
            <el-row>
              <el-col :span="18" class="toptitle" :title="item.mc"
                >{{ item.ph }}.{{ item.mc }}</el-col
              >
              <el-col :span="6" class="topnumber">{{ item.rs }}</el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="toppm">
          <div
            class="toppmdiv"
            v-for="(item, index) in lnzt_st11"
            :key="index"
            :style="`background-image: linear-gradient(to right,#004864 0%,#004864 ${
              item.rs / 1000
            }%,transparent ${item.rs / 1000}%,transparent 100%);`"
          >
            <el-row>
              <el-col :span="18" class="toptitle" :title="item.mc"
                >{{ item.ph }}.{{ item.mc }}</el-col
              >
              <el-col :span="6" class="topnumber">{{ item.rs }}</el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 疾病
export default {
  name: "disease",
  data() {
    return {
      baseUrl: "http://10.21.197.236:8080",
      lnzt_st1: [],
      lnzt_st11: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/lnzt_st",
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            // console.log("disease", optionsdata);
            this.lnzt_st1 = optionsdata.data[0].slice(0, 5);
            this.lnzt_st11 = optionsdata.data[0].slice(5, 10);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="less">
.disease {
  width: 100%;
  height: 100%;
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  .tit {
    font-family: SourceHanSansCN-Heavy;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    // margin-bottom: 0px;
  }
  .toppmdiv {
    opacity: 0.9;
    // background: #004864;
    box-shadow: inset 0 0 5px 0 #ffffff;
    border-radius: 4px;
    padding: 2% 3%;
    margin: 6% auto;
    width: 85%;
    .toptitle {
      opacity: 0.9;
      font-family: SourceHanSansCN-Medium;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #ffffff;
    }
    .topnumber {
      font-family: SourceHanSansCN-Medium;
      color: #ffffff;
    }
  }
}
</style>