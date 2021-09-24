<template>
  <div class="menudemo" ref="each">
    <div
      v-for="(k, index) in opt"
      :key="k.name"
      class="op"
      :class="{'now' : current == index, 'showDescribe' : category_id == index}"
      @click="changtype(index)"
      @mouseover="showDescribe(k.category_id)"
      @mouseout="hideDescribe"
      style="position: relative"
    >
      <img :src="k.img" alt=" " />
      <div class="txt">
        {{ k.name }} <img :src="current == index ? icon2 : icon" alt="" />
      </div>
      <div class="describe">{{ k.describe }}</div>
    </div>
  </div>
</template>

<script>
import f1 from "@/assets/img/f1.png";
import f2 from "@/assets/img/f2.png";
import f3 from "@/assets/img/f3.png";
import f4 from "@/assets/img/f4.png";
import icon from "@/assets/oridinary/icon.png";
import icon2 from "@/assets/oridinary/icon2.png";
export default {
  name: "menudemo",
  data() {
    return {
      current: 0,
      icon,
      icon2,
      category_id: 100,
      opt: [
        {
          name: "幸福民生",
          img: f1,
          category_id: 0,
          describe: '幸福民生主要以幼儿主题、青少年主题、成年主题、老年主题四个方面，结合各类业务数据，通过统计分析、数据挖掘综合体现民生情况。'
        },
        {
          name: "经济发展",
          img: f4,
          category_id: 1,
          describe: '经济发展主要是结合全县工商、税务、市场监管局、政务服务中心等数据，通过数据关联融合，模型计算等技术手段，从产业情况、GDP预测、碳排放情况、企业经营状态等方面，对长兴县经济发展状况进行全面的展示。',
        },
        {
          name: "基层治理",
          img: f2,
          category_id: 2,
          describe: '基层治理通过省市乡镇平安指数、矛调信访、预警信息、社会稳定等方面展示长兴基层治理成果。',
        },
        {
          name: "生态文明",
          img: f3,
          category_id: 3,
          describe: '生态文明通过水质监测、空气质量、志愿者服务、文明诚信等方面展示长兴的文明成果，生态环境质量。',
        },
      ],
    };
  },
  mounted() {
    let hash = location.hash;
    if (hash.includes("pcdrive2")) {
      this.current = 1;
    } else if (hash.includes("pcdrive3")){
      this.current = 2;
    } else if (hash.includes("pcdrive4")){
      this.current = 3;
    }
  },
  methods: {
    changtype(index) {
      if (index == this.current) return;
      // if (index == 3) {
      //   this.$message({
      //     message: "此分类暂无",
      //     type: "warning",
      //   });
      //   return;
      // }
      this.current = index;
      if (index == 0) {
        this.$router.push("/oridinaryUsers/pcdrive");
        return
      }
      if (index == 1) {
        this.$router.push("/oridinaryUsers/pcdrive2");
        return
      }
      if (index == 2) {
        this.$router.push("/oridinaryUsers/pcdrive3");
        return
      }
      if (index == 3) {
        this.$router.push("/oridinaryUsers/pcdrive4");
        return
      }
    },
    showDescribe(index){
      this.category_id = index
    },
    hideDescribe(){
      this.category_id = 100
    }
  },
};
</script>

<style lang="less" scoped>
.menudemo {
  width: 80%;
  height: 32%;
  margin: 0 auto;
  background-image: url("../../assets/img/mainbg.png");
  background-repeat: no-repeat;
  background-size: 85% 83%;
  background-position: center center;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  flex-wrap: wrap;
  box-shadow: none;
  background-color: transparent;
  > div:nth-child(1),
  > div:nth-child(4) {
    margin-bottom: 40px;
  }
  > div:nth-child(2),
  > div:nth-child(3) {
    margin-bottom: 10px;
  }
  > .op {
    width: 18%;
    font-family: SourceHanSerifSC-Heavy;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    position: relative;
    > img {
      width: 100%;
      cursor: pointer;
    }
    > .txt {
      cursor: pointer;
      * {
        vertical-align: middle;
      }
    }
    > .describe {
      display: none;
      position: absolute;
      width: 267px;
      max-height: 240px;
      top: 0px;
      right: -313px;
      background-image: linear-gradient(
        180deg,
        rgba(12, 47, 58, 0.32) 2%,
        #4193ff 100%
      );
      border-radius: 6px;
      z-index: 100;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #ffffff;
      overflow-y: auto;
      padding: 20px
    }
  }
  // > .op:hover {
  //   > .describe {
  //     display: block;
  //   }
  // }
  > .now {
    color: #f3e36f;
  }
}
</style>
<style>
.showDescribe .describe{
  display: block !important;
}
</style>