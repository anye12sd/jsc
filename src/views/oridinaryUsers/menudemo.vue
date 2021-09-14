<template>
  <div class="menudemo" ref="each">
    <div
      v-for="(k, index) in opt"
      :key="k.name"
      :class="current == index ? 'op now' : 'op'"
      @click="changtype(index)"
    >
      <img :src="k.img" alt=" " />
      <div class="txt">
        {{ k.name }} <img :src="current == index ? icon2 : icon" alt="" />
      </div>
      <div class="describe"></div>
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
      opt: [
        {
          name: "幸福民生",
          img: f1,
          category_id: 1,
        },
        {
          name: "经济发展",
          img: f4,
          category_id: 6,
        },
        {
          name: "社会治理",
          img: f2,
        },
        {
          name: "生态文明",
          img: f3,
        },
      ],
    };
  },
  mounted() {
    let hash = location.hash;
    if (hash.includes("pcdrive2")) {
      this.current = 1;
    }
  },
  methods: {
    changtype(index) {
      if (index == this.current) return;
      if (index == 2 || index == 3) {
        this.$message({
          message: "此分类暂无",
          type: "warning",
        });
        return;
      }
      this.current = index;
      if (index == 0) {
        this.$router.push("/oridinaryUsers/pcdrive");
      }
      if (index == 1) {
        this.$router.push("/oridinaryUsers/pcdrive2");
      }
    },
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
      height: 240px;
      top: -50px;
      right: -264px;
      transform: scaleY(-1);
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