<template>
  <div class="kindGarden">
    <div class="bigtit">
      <div class="tag"></div>
      <div>幼儿园预警</div>
    </div>
    <div class="col topline">
      <div>幼儿园名称</div>
      <div>预计入园人数</div>
      <div>容量</div>
      <div>预警状态</div>
    </div>
    <div v-for="(k, index) in yezt_yeyycyj" :key="index" :class="'col line'+(index == 0? ' first' :'')">
      <div>{{ k.yjryrs }}</div>
      <div>{{ k.lyrs }}</div>
      <div>{{ k.yj }}</div>
      <div :style="'color:'+(parseInt(k.yj) >= parseInt(k.lyrs) ? '#00E24E;':'#FF4747;')">{{ parseInt(k.yj) >= parseInt(k.lyrs) ? "正常" : "异常" }}</div>
    </div>
  </div>
</template>

<script>
// 幼儿园预测预警
export default {
  name: "kindGarden",
  data() {
    return {
      baseUrl: "http://10.21.197.236:9000",
      yezt_yeyycyj: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/home/yezt_yeyycyj",
        // data: data
      })
        .then((res) => {
          let optionsdata = res.data;
          if (optionsdata.code == 200) {
            this.yezt_yeyycyj = optionsdata.data[0].slice(0, 5);
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
.kindGarden {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  >.col {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div:nth-child(1) {
      flex: 4;
      font-family: SourceHanSansCN-Medium;
      font-size: 1.4rem;
      letter-spacing: 0;
      padding-left: 1%;
    }
    > div:nth-child(2) {
      font-family: DINPro-Medium;
      font-size: 1.6rem;
      letter-spacing: 0;
    }
    > div:nth-child(3) {
      font-family: DINPro-Medium;
      font-size: 1.6rem;
      letter-spacing: 0;
    }
    > div:nth-child(4) {
      font-family: SourceHanSansCN-Medium;
      font-size: 1.4rem;
      letter-spacing: 0;
    }
    > div {
      flex: 2;
    }
  }
  >.topline{
    margin-top: 1rem;
    >div{
      color: #7291CD;
    }
  }
  >.line{
    background-image: linear-gradient(270deg, rgba(142,176,255,0.00) 0%, rgba(2,192,253,0.42) 99%);
    padding: 0.5rem 0;
    margin-top: 0.8rem;
    >div:nth-child(2){
      color: #ffe047;
    }
    >div{
      color: #ffffff;
    }
  }
  >.first{
    background-image: linear-gradient(270deg, rgba(83,87,238,0.00) 0%, rgba(96,191,255,0.84) 86%);
  }
}
</style>