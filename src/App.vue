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
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let access_token = location.search.split("=")[1];
      if (!access_token) return;
      if (access_token == "aaaa") {
        this.$store.commit("config/setidentity", 1);
        this.$store.commit("config/setUsetInfo", {
            userName:"系统",
            role_id:1
        });
        this.togetmenu();
        // this.$router.push("/oridinaryUsers");
        return;
      } else if (access_token == "bbbb") {
        this.$store.commit("config/setidentity", 2);
        this.$store.commit("config/setUsetInfo", {
            userName:"单位",
            role_id:1
        });
        this.togetmenu();
        // this.$router.push("/oridinaryUsers");
        return;
      } else if (access_token == "cccc") {
        //普通用户
        this.$store.commit("config/setidentity", 3);
        this.$store.commit("config/setUsetInfo", {
            userName:"普通",
            role_id:3
        });
        // this.$router.push("/oridinaryUsers");
        this.togetmenu();
        return;
      } else if (access_token == "dddd") {
        //模型开发人员
        this.$store.commit("config/setidentity", 4);
        this.togetmenu();
        // this.$router.push("/oridinaryUsers");
        return;
      }
      if (access_token) {
        console.log("user");
        tologin().then((res) => {
          if (res.data.status == 200) {
            this.$store.commit("config/setUsetInfo", res.data.data);
            this.$store.commit("config/setidentity", res.data.data.role_id);
            this.$router.push("/oridinaryUsers");
            // if(res.data.data.role_id == 3) {
            //   this.$router.push("/oridinaryUsers")
            // }
          } else {
            this.$message({
              message: "获取信息失败请重新登录",
              type: "warning",
            });
            this.$store.commit("config/setLogin", false);
          }
          // this.$store.commit("config/setLogin",true)
        });
        this.togetmenu();
        // console.log(this.isLogin);
      }
    },
    togetmenu() {
      getMenu().then((res) => {
        console.log("menu", res);
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
  },
  watch: {
    isLogin(newValue) {
      if (newValue == false) {
        // this.$router.push("/login");
        console.log("false");
        if (process.env.NODE_ENV == "development") {
          location.href = "http://localhost:8080";
        }
        if (process.env.NODE_ENV == "production") {
          location.href = "http://10.21.197.237";
        }
      }
    },
    $route(to, from) {
      // console.log(to,to.fullPath.includes("oridinaryUsers"))
      if(to.fullPath.includes("oridinaryUsers")) {
        this.$store.commit("config/setShowTopBar",false)
      } else {
        this.$store.commit("config/setShowTopBar",true)
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
@media screen and (max-height: 720px) {
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
