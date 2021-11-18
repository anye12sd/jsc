<template>
  <div :class="className[current] + ' oridinaryUsers'">
    <div class="top">
      <div class="time">
        <div>{{ date1 }}&nbsp;&nbsp;{{ date2 }}&nbsp;&nbsp;{{ week[day] }}</div>
        <tabs @jump="swit"></tabs>
      </div>
      <div class="tit" v-show="current == 0">长兴数字驾驶舱</div>
      <div class="user">
        <span
          class="goafter"
          v-if="identity == 1 || identity == 2"
          @click="goafter"
          >前往管理平台</span
        >
        <img src="../../assets/oridinary/portrait.png" alt=" " />
        <span @click="toLogin">{{ userid[identity] }}</span>
        <span style="cursor: pointer" @click="signout" v-if="identity != '-1'">退出</span>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import tabs from './tabs.vue'
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
        '-1':"请登录",
        1: "系统管理员",
        2: "单位管理员",
        3: "普通用户",
        4: "模型开发人员",
        5: '数据专员'
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
      showtablist: false,
      iden: {},
      current: 0,
      className: ["pc", "mo", "mo"],
    };
  },
  mounted() {
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
    setInterval(() => {
      this.getTime();
    }, 5000);
  },
  components: {
    tabs
    // pcdrive,
    // modelmarket,
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  methods: {
    swit(val) {
      if (this.current == val) return;
      this.current = val;
    },
    signout() {
      if (process.env.NODE_ENV == "development") {
        window.location.href = "http://localhost:9000/#/login";
      }
      if (process.env.NODE_ENV == "production") {
        window.location.href = "http://10.21.197.237";
      }
    },
    toLogin() {

    },
    goafter() {
      this.$store.commit("config/setShowTopBar", true);
      this.$router.push("/pcCockpit/distribution");
      this.$store.commit("jurisdiction/settimes", 2);
    },
    getTime() {
      let date = new Date();
      this.date1 = date.toLocaleDateString().split("/").join("-");
      this.date2 = date.getHours() + ":" + date.getMinutes();
      this.day = date.getDay();
    },
  },
  watch: {

  },
};
</script>

<style scoped lang="less">
.pc {
  background-image: url("../../assets/oridinary/pcdrivebg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position:  center center;
}
.mo {
  background-image: url("../../assets/oridinary/modelbg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
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
    height: 7%;
    box-sizing: border-box;
    padding-top: 0.8%;
    > div {
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
      font-size: 16px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      > div {
        display: inline-block;
      }

    }
    .user {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #fff;
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