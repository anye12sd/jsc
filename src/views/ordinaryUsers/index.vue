<template>
  <div :class="className[current] + ' oridinaryUsers'">
    <div class="top">
      <div class="time">{{ date1 }}&nbsp;&nbsp;{{ date2 }}</div>
      <div class="tit">数字驾驶舱桌面版</div>
      <div class="user">
        <span>{{ week[day] }}</span>
        <img src="../../assets/oridinary/portrait.png" alt=" " />
        <span>普通用户</span>
      </div>
    </div>
    <!-- <component :is="pages[current].componentName"></component> -->
    <router-view></router-view>
    <div class="bottom">
      <div class="page">
        <img src="@/assets/oridinary/direction.png" alt=" " @click="reduce" />
        <div class="currentPageName">{{ pages[current].name }}</div>
        <img
          src="@/assets/oridinary/direction.png"
          alt=" "
          class="rr"
          @click="plus"
        />
      </div>
      <div class="allPage"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
// import pcdrive from "./pcdrive";
// import modelmarket from "./modelmarket";
export default {
  name: "oridinaryUsers",
  data() {
    return {
      date1: "2021-3-24",
      date2: "12:00",
      day: 0,
      week: {
        0: "星期日",
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
      },
      iden: {},
      current: 0,
      className: ["pc", "mo",'mo'],
      pages: [
        {
          name: "PC驾驶舱",
          path: "/oridinaryUsers/pcdrive",
        },
        {
          name: "模型超市",
          path: "/oridinaryUsers/modelmarket",
        },
      ],
    };
  },
  mounted() {
    // console.log(location.hash)
    this.getTime();
  },
  components: {
    // pcdrive,
    // modelmarket,
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  methods: {
    getTime() {
      let date = new Date();
      this.date1 = date.toLocaleDateString().split("/").join("-");
      this.date2 = date.getHours() + ":" + date.getMinutes();
      this.day = date.getDay();
    },
    plus() {
      if (this.current >= 1) {
        this.current = 0;
      } else {
        this.current++;
      }
      // console.log(this.pages[this.current].path)
      this.$router.push(this.pages[this.current].path)
    },
    reduce() {
      if (this.current <= 0) {
        this.current = this.pages.length - 1;
      } else {
        this.current--;
      }
      this.$router.push(this.pages[this.current].path)
    },
  },
};
</script>

<style scoped lang="less">
.pc {
  background-image: url("../../assets/oridinary/head.png"),
    url("../../assets/oridinary/leftside.png"),
    url("../../assets/oridinary/rightside.png"),
    url("../../assets/oridinary/bottom.png"),
    url("../../assets/oridinary/line.png");
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: 98% auto, auto 65%, auto 65%, 56% auto, 65% auto;
  background-position: center top, left 26%, right 26%, center bottom,
    center bottom;
}
.mo {
  background-image: url("../../assets/oridinary/head.png"),
    url("../../assets/oridinary/leftside.png"),
    url("../../assets/oridinary/rightside.png"),
    url("../../assets/oridinary/bottom.png"),
    url("../../assets/oridinary/modelbg.png");
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: 98% auto, auto 65%, auto 65%, 56% auto, 100% 100%;
  background-position: center top, left 26%, right 26%, center bottom,
    center center;
}
.oridinaryUsers {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .top {
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    height: 8%;
    box-sizing: border-box;
    padding-top: 1.1%;
    div {
      flex: 1;
    }
    .tit {
      text-align: center;
      font-family: Helvetica;
      font-size: 28px;
      color: #ffffff;
      letter-spacing: 4px;
    }
    .time {
      text-align: left;
      font-family: MicrosoftYaHei;
      font-size: 10px;
      color: #00eaff;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .user {
      font-family: MicrosoftYaHei;
      font-size: 10px;
      color: #00eaff;
      display: flex;
      align-items: center;
      text-align: right;
      justify-content: flex-end;
      span {
        margin-left: 5px;
      }
      img {
        margin-left: 5px;
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 13%;
    box-sizing: border-box;
    .page {
      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        width: 30px;
        cursor: pointer;
      }
      > .currentPageName {
        font-family: Helvetica;
        color: #fff;
        font-size: 23px;
        text-shadow: 0 3px 4px rgba(7, 110, 255, 0.63);
        margin: 0 10px;
      }
      > .rr {
        transform: rotate(180deg);
      }
    }
  }
}
</style>