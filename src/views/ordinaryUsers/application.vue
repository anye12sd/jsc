<template>
  <div class="application">
    <div class="tit"><img src="@/assets/img/appli.png" alt="图" /></div>
    <div class="main">
      <div v-for="p in option" :key="p.name">
        <div><span>应用介绍</span></div>
        <div><img :src="p.img" alt="图" /></div>
        <div>{{ p.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import grop1 from "@/assets/img/grop1.png";
import grop2 from "@/assets/img/grop2.png";
import grop3 from "@/assets/img/grop3.png";
import grop4 from "@/assets/img/grop4.png";
import grop5 from "@/assets/img/grop5.png";

export default {
  name: "application",
  data() {
    return {
      option: [
        {
          name: "民政精准识贫信息平台",
          img: grop1,
        },
        {
          name: "食品安全综合治理平台",
          img: grop2,
        },
        {
          name: "碳效码平台",
          img: grop3,
        },
        {
          name: "数据应用成果超市",
          img: grop4,
        },
        {
          name: "xxxx",
          img: grop5,
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>


<style lang="less" scoped>
.application {
  height: 92%;
  .tit {
    text-align: center;
    img {
      margin: 0 auto;
      width: 400px;
    }
  }
  .main {
    width: 60%;
    height: 80%;
    margin: 10px auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    > div {
      margin-top: 30px;
      margin-right: 30px;
      width: calc(32% - 20px);
      height: 35%;
      background-image: linear-gradient(46deg, #95d6ff 0%, #ffffff 100%);
      border-radius: 6px;
      box-sizing: border-box;
      padding: 10px;
      > div:nth-child(1) {
        text-align: right;
        span {
          cursor: pointer;
          background: #f5a623;
          border-radius: 4px;
          font-family: SourceHanSansCN-Medium;
          font-size: 1.6rem;
          color: #ffffff;
          letter-spacing: 0;
          padding: 3px 5px;
        }
      }
      > div:nth-child(2) {
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      > div:nth-child(3) {
        font-family: MicrosoftYaHei;
        font-size: 2.8rem;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
      }
    }
  }
}
</style>