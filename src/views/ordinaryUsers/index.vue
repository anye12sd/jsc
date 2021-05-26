<template>
  <div :class="className[current] + ' oridinaryUsers'">
    <div class="top">
      <div class="time">{{ date1 }}&nbsp;&nbsp;{{ date2 }}&nbsp;&nbsp;{{ week[day] }}</div>
      <div class="tit">数字驾驶舱桌面版</div>
      <div class="user">
        <span
          class="goafter"
          v-if="identity == 1 || identity == 2"
          @click="goafter"
          >前往管理平台</span
        >
        <img src="../../assets/oridinary/portrait.png" alt=" " />
        <span>{{ userid[identity] }}</span>
        <span style="cursor: pointer" @click="signout">退出</span>
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
      <!-- <div class="allPage"></div> -->
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
      userid: {
        1: "系统管理员",
        2: "单位管理员",
        3: "普通用户",
        4: "模型开发人员",
      },
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
      className: ["pc", "mo", "mo"],
      pages: [
        {
          name: "PC驾驶舱",
          path: "/oridinaryUsers/pcdrive",
        },
        {
          name: "模型超市",
          path: "/oridinaryUsers/modelmarket",
        },
        {
          name: "模型详情",
        },
      ],
    };
  },
  mounted() {
    if (location.hash == "#/oridinaryUsers/modelmarket") {
      this.current = 1;
    }
    if (location.hash.includes("/oridinaryUsers/detail")) {
      this.current = 2;
    }
    setInterval(() => {
      this.getTime();
    }, 5000);
  },
  components: {
    // pcdrive,
    // modelmarket,
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  methods: {
    signout() {
      if (process.env.NODE_ENV == "development") {
        window.location.href = "http://localhost:9000/#/login"
      }
      if (process.env.NODE_ENV == "production") {
        window.location.href = "http://10.21.197.237"
      }
    },
    goafter() {
      this.$store.commit("config/setShowTopBar", true);
      this.$router.push("/pcCockpit/distribution");
    },
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
      this.$router.push(this.pages[this.current].path);
    },
    reduce() {
      if (this.current <= 0) {
        this.current = this.pages.length - 2;
      } else {
        this.current--;
      }
      this.$router.push(this.pages[this.current].path);
    },
  },
  watch: {
    $route(to, from) {
      if (to.name == "Detail") {
        this.current = 2;
      } else if (to.name == "Modelmarket") {
        this.current = 1;
        // console.log(this.current);
      }
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
      .goafter {
        cursor: pointer;
      }
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
    height: 6%;
    box-sizing: border-box;
    z-index: 50;
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