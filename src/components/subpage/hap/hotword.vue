<template>
  <div class="hotword">
    <div class="tit">热词排行</div>
    <div class="toppm" style="position: relative">
      <div
        class="toppmdiv"
        v-for="(item, index) in cnzt_shsq2.slice(0, 5)"
        :key="index"
        :style="`background-image: linear-gradient(to right,#004864 0%,#004864 ${
          item.sl / 30
        }%,transparent ${item.sl / 30}%,transparent 100%);`"
      >
        <el-row>
          <el-col :span="20" class="toptitle"
            >{{ index + 1 }}.{{ item.lb }}</el-col
          >
          <el-col :span="4" class="topnumber">{{ item.sl }}</el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 热词排行
export default {
  name: "hotword",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      cnzt_shsq2: [],
    };
  },
  mounted() {
    this.getdata();
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
            this.cnzt_shsq2 = optionsdata.data[1];
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
.hotword {
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
  .toppmdiv {
    opacity: 0.9;
    // background: #004864;
    box-shadow: inset 0 0 5px 0 #ffffff;
    border-radius: 4px;
    padding: 1.2% 3%;
    margin: 3% auto;
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