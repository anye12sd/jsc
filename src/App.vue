<template>
  <div id="app" :class="!showtopbar ? 'dark' : 'white'">
    <!-- <topbar v-if="isLogin && identity != 3"></topbar> -->
    <topbar v-if="showtopbar"></topbar>
    <router-view></router-view>
  </div>
</template>

<script>
import topbar from "@/components/topbar.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { tologin, getMenu } from "@/api/user.js";
export default {
  name: "app",
  data() {
    return {
      num: 0,
      ns:['','系统','单位','普通','数据','开发']
    };
  },
  mounted() {
    let html = document.querySelector("html");
    html.style.fontSize = (10 / 1080) * document.body.scrollHeight + "px";
    window.addEventListener("resize", function () {
      let html = document.querySelector("html");
      html.style.fontSize = (10 / 1080) * document.body.scrollHeight + "px";
    });
    this.init();
    // console.log(this.isLogin)
  },
  activated() {
    let access_token =
      location.search.split("=")[1] || sessionStorage.getItem("access_token");
    if (!access_token) {
      if (process.env.NODE_ENV == "development") {
        location.href = "http://localhost:9000";
      }
      if (process.env.NODE_ENV == "production") {
        location.href = "http://10.21.197.237";
      }
    }
  },
  methods: {
    init() {
      let access_token =
        location.search.split("=")[1] || sessionStorage.getItem("access_token");
      let hash = window.location.hash;
      if (!access_token) return;
      if (sessionStorage.getItem("identity")) {
        this.$store.commit("config/setUsetInfo", {
          userName: sessionStorage.getItem("username"),
          role_id: sessionStorage.getItem("identity"),
          id:sessionStorage.getItem("id"),
          mobile:sessionStorage.getItem("mobile")
        });
        this.$store.commit(
          "config/setidentity",
          sessionStorage.getItem("identity")
        );
        this.$store.commit("jurisdiction/settimes", 1);
      }
      if (window.globalconfig == 0) {
        if (access_token == "aaaa") {
          this.$store.commit("config/setidentity", 1);
          this.$store.commit("config/setUsetInfo", {
            userName: "系统",
            role_id: 1,
          });
          this.$store.commit("config/setLogin", true);
          if (hash == "#/login") {
            this.$router.push("/oridinaryUsers");
          }
          return;
        } else if (access_token == "bbbb") {
          this.$store.commit("config/setidentity", 2);
          this.$store.commit("config/setUsetInfo", {
            userName: "单位",
            role_id: 2,
          });
          this.$store.commit("config/setLogin", true);
          if (hash == "#/login") {
            this.$router.push("/oridinaryUsers");
          }
          return;
        } else if (access_token == "cccc") {
          //普通用户
          this.$store.commit("config/setLogin", true);
          this.$store.commit("config/setidentity", 3);
          this.$store.commit("config/setUsetInfo", {
            userName: "普通",
            role_id: 3,
          });
          if (hash == "#/login") {
            this.$router.push("/oridinaryUsers");
          }
          return;
        } else if (access_token == "dddd") {
          //模型开发人员
          this.$store.commit("config/setLogin", true);
          this.$store.commit("config/setidentity", 4);
          this.$store.commit("config/setShowTopBar", true);
          this.$store.commit("config/setUsetInfo", {
            userName: "开发",
            role_id: 4,
          });
          if (hash == "#/login") {
            this.$router.push("/demand/waitDemand");
          }
          return;
        } else if (access_token == "eeee") {
          this.$store.commit("config/setidentity", 2);
          this.$store.commit("config/setLogin", true);
          if (hash == "#/login") {
            this.$router.push("/oridinaryUsers");
          }
          return;
        } else if (access_token == "ffff") {
          this.$store.commit("config/setLogin", true);
          this.$store.commit("config/setidentity", 5);
          this.$store.commit("config/setUsetInfo", {
            userName: "数据",
            role_id: 5,
          });
          if (hash == "#/login") {
            this.$router.push("/oridinaryUsers");
          }
          return;
        }
      }
      // console.log(access_token)
      if (access_token && !sessionStorage.getItem("access_token")) {
        // console.log("user");
        tologin().then((res) => {
          // console.log(res)
          if (res.data.status == 200) {
            this.$store.commit("config/setLogin", true);
            this.$store.commit("config/setUsetInfo", res.data.data);
            this.$store.commit("config/setidentity", res.data.data.role_id);
            let username = ''
            username = res.data.data.userName || res.data.data.employeeName || this.ns[res.data.data.role_id]
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("identity", res.data.data.role_id);
            sessionStorage.setItem("id", res.data.data.id);
            sessionStorage.setItem("mobile", res.data.data.mobile);
            setTimeout(() => {
              if (this.identity == 4) {
                this.$router.push("/demand/waitDemand");
                this.$store.commit("config/setShowTopBar", true);
              } else {
                this.$router.push("/oridinaryUsers");
              }
            }, 500);
          } else {
            this.$message({
              message: "获取信息失败请重新登录",
              type: "warning",
            });
            this.$store.commit("config/setLogin", false);
          }
          // this.$store.commit("config/setLogin",true)
        });
      }
    },
    togetmenu() {
      getMenu().then((res) => {
        // console.log("menu", res);
        if (res.data.data == false) {
          this.$store.commit("config/setLogin", false);
          this.num++;
          if (this.num > 5) {
            this.$message({
              message: "获取菜单失败",
              type: "warning",
            });
            return;
          }
          this.togetmenu();
          return;
        }
        this.$store.commit("config/settopbararr", res.data.data);
        this.$store.commit("config/setLogin", true);
      });
    },
  },
  components: {
    topbar,
  },
  computed: {
    ...mapState("config", ["isLogin", "identity", "showtopbar"]),
    ...mapState("jurisdiction", ["times"]),
  },
  watch: {
    times(newValue) {
      // console.log(newValue)
      if (newValue == 1 || newValue == 2) {
        return;
      }
      this.init();
    },
    isLogin(newValue) {
      if (newValue == false) {
        // this.$router.push("/login");
        // console.log("false");
        if (process.env.NODE_ENV == "development") {
          location.href = "http://localhost:9000";
        }
        if (process.env.NODE_ENV == "production") {
          location.href = "http://10.21.197.237";
        }
      }
    },
    $route(to, from) {
      let path = document.location.hash;
      this.$store.commit("config/setPath", path);
      // console.log(this.identity,to.fullPath)
      if (to.fullPath == "/login") {
        this.$store.commit("config/setShowTopBar", false);
        return;
      }
      // console.log(to.fullPath.includes("oridinaryUsers"))
      if (to.fullPath.includes("oridinaryUsers")) {
        this.$store.commit("config/setShowTopBar", false);
        // console.log('44444')
        return;
      }
    // console.log('123')
      if (this.identity == 3 || this.identity == 5) {
        this.$message({
          message: "您无权查看该页面",
          type: "warning",
        });
        this.$router.go(-1);
        return;
      }
      let arr;
      if (this.identity == 2) {
        arr = [
          "/pcCockpit/distribution",
          "/supermarket/modelManaga",
          "/demand/addNewDemand",
          "/demand/demandHandle",
          "/process/waitDoing",
          "/process/hasDoing",
          "/process/iStarted",
          "/datamarket/modelma",
        ];
      }
      if (this.identity == 1) {
        arr = [
          "/pcCockpit/distribution",
          "/supermarket/modelManaga",
          "/process/waitDoing",
          "/process/hasDoing",
          "/userAuthorization/userManaga",
          "/userAuthorization/roleAssignment",
          "/datamarket/modelma",
        ];
      }
      if (this.identity == 4) {
        arr = ["/demand/waitDemand", "/demand/hasDoneDemand"];
      }
      if (!arr.includes(to.fullPath)) {
        if (to.fullPath == "/demand/addNewDemand") {
          this.$message({
            message: "您无权查看该页面",
            type: "warning",
          });
        }
        this.$router.go(-1);
        return;
      }
      this.$store.commit("config/setShowTopBar", true);
    },
    showtopbar(newValue) {
      if (newValue) {
        this.togetmenu();
      }
    },
  },
};
</script>


<style>
body,
html {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
* {
  margin: 0;
  padding: 0;
}
</style>

<style scoped lang="less">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
}
.dark {
  background: linear-gradient(180deg, #161d28 47%, #0b252c 100%);
}
.white {
  background-color: #f0f2f9;
}
@media screen and (max-height: 640px) {
  #app {
    height: 730px;
  }
}
@media screen and (max-width: 1500px) {
  #app {
    width: 1540px;
  }
}
// @media screen and (max-aspect-ratio: 16/10)
</style>
