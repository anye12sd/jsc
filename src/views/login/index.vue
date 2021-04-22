<template>
  <div id="login">
    <div v-if="!hasToken" id="scanCode">
    </div>
    <div v-else class="loading" v-loading="hasToken">登录中</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { tologin } from "@/api/user.js";
export default {
  name: "login",
  data() {
    return {
      HZScan: null,
      hasToken:false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let access_token = location.search.split("=")[1];
      console.log(access_token)
      if (access_token) {
        this.hasToken = true
        this.$router.push("/oridinaryUsers");
        return
      }
      let str;
      if (process.env.NODE_ENV == "development") {
        str = "http://localhost:8080";
      }
      if (process.env.NODE_ENV == "production") {
        str = "http://10.21.197.237";
      }
      window.HZScan({
        elementId: "scanCode",
        clientId: "cef7bd18c41c438c9cb9657bed5c00d2",
        defaultPage: "http://172.21.246.157", //固定
        redirectUri: str,
        // "http://eipx7.giscloud.cx/security/authentication/dingding&version=2",
        appKey: "hz_gov_dingding_login_dingoa",
        // 浙政钉钉
        ddOrigin: "https://login-pro.ding.zj.gov.cn",
        // 专有钉钉
        // ddOrigin: 'https://login.dg-work.cn',
      });
    },
  },
  computed: {
    ...mapMutations("config", ["setUsetInfo"]),
    // ...mapState("config", ["isLogin"]),
    // ...mapState("config", ["ddLoginFormal", "ddLoginTest"]),
  },
};
</script>

<style scoped lang="less" >
#login {
  width: 100%;
  height: 100%;
  background: #fff;
  #scanCode {
    height: 500px;
    width: 50%;
    margin-left: 25%;
    text-align: center;
  }
  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #fff;
    text-align: center;
    font-size: 25px;
    font-weight: 500;
    line-height: 300px;
    font-weight: 600;
  }
}
</style>