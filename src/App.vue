<template>
  <div id="app">
    <topbar v-if="isLogin"></topbar>
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
      if (access_token == "aaaa") {
        this.$store.commit("config/setidentity", 1);
        this.togetmenu();
        return
      } else if (access_token == "bbbb") {
        this.$store.commit("config/setidentity", 2);
        this.togetmenu();
        return
      } else if (access_token == "cccc") {
        //普通用户
        console.log(access_token);
        this.$store.commit("config/setidentity", 3);
        this.togetmenu();
        return
      } else if (access_token == "dddd") {
        //模型开发人员
        this.$store.commit("config/setidentity", 4);
        this.togetmenu();
        return
      }
      if (access_token) {
        tologin().then((res) => {
          console.log("user", res);
          if (res.data.status == 200) {
            this.$store.commit("config/setUsetInfo", res.data.data);
            this.$store.commit("config/setidentity", res.data.data.role_id);
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
    ...mapState("config", ["isLogin"]),
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
  background-color: #f0f2f9;
}
@media screen and (max-height: 720px) {
  #app {
    height: 1000px;
  }
}
@media screen and (max-width: 1500px) {
  #app {
    width: 1520px;
  }
}
// @media screen and (max-aspect-ratio: 16/10)
</style>
