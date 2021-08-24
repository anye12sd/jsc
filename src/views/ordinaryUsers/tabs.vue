<template>
  <div class="tabs">
    <div class="op">
      <img
        src="@/assets/oridinary/menu.png"
        alt="图片缺失"
        @click="showmenu = !showmenu"
      />
    </div>
    <div v-show="showmenu" class="option">
      <div
        v-for="(k, idx) in option"
        :class="
          'each' +
          (current == idx ? ' active' : '')
        "
        :key="k.name"
        @click="jump(k, idx)"
      >
        {{ k.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      showmenu: false,
      current: 0,
      option: [
        {
          name: "数字驾驶舱PC端",
          path: "/oridinaryUsers/pcdrive",
        },
        {
          name: "应用门户",
          path: "/oridinaryUsers/application",
        },
        {
          name: "数据成果超市",
          path: "/oridinaryUsers/modelmarket",
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let hash = window.location.hash;
      switch (hash) {
        case "#/oridinaryUsers/pcdrive":
          this.current = 0;
          break;
        case "#/oridinaryUsers/application":
          this.current = 1;
          break;
        case "#/oridinaryUsers/modelmarket":
          this.current = 2;
          break;
        default:
          this.current = 0;
          break;
      }
      this.$emit('jump',this.current)
    },
    jump(val, idx) {
      if (this.current == idx) return;
      this.$router.push(val.path);
      this.current = idx;
      this.showmenu = false
      this.$emit('jump',this.current)
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  position: relative;
  margin-left: 27px;
  > .op {
    img {
      width: 5.39vw;
      cursor: pointer;
    }
  }
  > .option {
    position: absolute;
    z-index: 100;
    background-image: url("../../assets/oridinary/bg3.png");
    background-size: 100% 100%;
    background-position: center center;
    box-shadow: 0 20px 40px 0 rgba(4, 12, 27, 0.6);
    border-radius: 2px;
    width: 8.765vw;
    padding: 20px 13px 10px 13px;
    margin-top: 0.7vh;
    transition: all 0.4s linear;
    > .each {
      font-family: MicrosoftYaHei-Bold;
      font-size: 18px;
      color: #FFFFFF;
      letter-spacing: 0;
      height: 37px;
      line-height: 37px;
      overflow: hidden;
      cursor: pointer;
      margin-bottom: 1.943vh;
      background-image: linear-gradient(
        270deg,
        rgba(142, 176, 255, 0) 0%,
        rgba(2, 192, 253, 0.42) 99%
      );
      padding: 0 10px;
      * {
        vertical-align: middle;
      }
    }
    > .active {
      background-image: linear-gradient(
        270deg,
        rgba(83, 87, 238, 0) 0%,
        #60bfff 85%
      );
    }
    > div:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
</style>