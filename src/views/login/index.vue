<template>
  <div id="login">
    <div class="tit">长兴数据驾驶舱平台</div>
    <div class="pack">
      <div class="tip">手机扫码登录</div>
      <div class="bag">
        <div id="scanCode"></div>
      </div>
    </div>
    <div v-if="hasToken" class="loading" v-loading="hasToken">登录中</div>
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
      hasToken: false,
    };
  },
  mounted() {
    this.init();
    console.log(this.identity);
  },
  methods: {
    init() {
      let access_token = location.search.split("=")[1];
      console.log(access_token);
      if (access_token) {
        if (this.identity == 4) {
          this.$router.push("/demand");
        } else {
          this.$router.push("/oridinaryUsers");
        }
        this.hasToken = true;
        // this.$router.push("/oridinaryUsers");
        return;
      }
      let str;
      if (process.env.NODE_ENV == "development") {
        str = "http://localhost:9000";
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
    ...mapState("config", ["identity"]),
  },
  watch: {
    identity(newValue) {
      console.log("111", newValue);
      if (newValue == 4) {
        this.$router.push("/demand");
      } else {
        this.$router.push("/oridinaryUsers");
      }
    },
  },
};
</script>

<style scoped lang="less" >
#login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/loginbg.png");
  background-size: 100% 100%;
  text-align: right;
  overflow: hidden;
  .tit {
    width: 382px;
    margin-left: 70%;
    font-family: SourceHanSerifSC-Heavy;
    font-size: 36px;
    color: #ffffff;
    letter-spacing: 4px;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 32px;
  }
  .pack {
    width: 382px;
    height: 436px;
    background-image: url("../../assets/codebg.png");
    background-size: 100% 100%;
    margin-left: 70%;
    overflow: hidden;
    .tip {
      background-image: url("../../assets/left.png"),
        url("../../assets/right.png");
      background-repeat: no-repeat;
      background-position: left center, right center;
      font-family: SourceHanSerifSC-Heavy;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      width: 190px;
      margin: 30px auto;
    }
  }
  .bag {
    margin: 0 auto 0 auto;
    overflow: hidden;
    text-align: center;
    position: relative;
    width: 190px;
    height: 190px;

    #scanCode {
      position: absolute;
      top: -82px;
      left: 1px;
      height: 300px;
      width: 220px;
    }
  }
}
</style>