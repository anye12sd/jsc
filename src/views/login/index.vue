<template>
  <div id="login">
    <div class="tit">长兴数字驾驶舱平台</div>
    <div v-if="hasToken" class="loading" v-loading="hasToken">登录中</div>
    <div class="pack" v-else>
      <div class="tip">
        <div :class="logintype ? 'active' : ''" @click="logintype = true">
          手机扫码登录
        </div>
        <div :class="logintype ? '' : 'active'" @click="logintype = false">
          账号密码登录
        </div>
      </div>
      <div class="bag" v-show="logintype">
        <div id="scanCode"></div>
      </div>
      <div v-show="!logintype" class="ap">
        <div>
          <input
            type="text"
            placeholder="手机号"
            class="phone"
            v-model="pnum"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="密码"
            class="pw"
            v-model="password"
          />
        </div>
        <div class="memory">
          <span
            :id="isremember ? 'remember' : ''"
            @click="isremember = !isremember"
          ></span>
          <span @click="isremember = !isremember">记住密码</span>
        </div>
        <div class="go" @click="gologin">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import { tologin } from "@/api/user.js";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      HZScan: null,
      hasToken: false,
      logintype: true,
      isremember: false,
      pnum: "",
      password: "",
      ns: ["", "系统", "单位", "普通", "数据", "开发"],
    };
  },
  mounted() {
    // console.log("????")
    // sessionStorage.removeItem("access_token")
    this.init();
    if (localStorage.getItem("cxpcpw")) {
      this.isremember = true;
      this.password = localStorage.getItem("cxpcpw");
    }
  },
  methods: {
    init() {
      let access_token = location.search.split("=")[1];
      if (access_token) {
        this.hasToken = true;
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
        appKey: "hz_gov_dingding_login_dingoa",
        // 浙政钉钉
        ddOrigin: "https://login-pro.ding.zj.gov.cn",
        // 专有钉钉
        // ddOrigin: 'https://login.dg-work.cn',
      });
    },
    remember() {
      if (this.isremember) {
        localStorage.setItem("cxpcpw", this.password);
      } else {
        localStorage.removeItem("cxpcpw");
      }
    },
    gologin() {
      let baseURL = null;
      if (process.env.NODE_ENV == "development") {
        baseURL = "/api";
      }
      if (process.env.NODE_ENV == "production") {
        baseURL = "http://10.21.197.237";
      }
        axios({
        method:"post",
        url:baseURL + '/login',
        data:{
          mobile:this.pnum,
          password:this.password,
          type:2
        }
      })
        .then((res) => {
          // console.log(res);
          if (res.data.status == 200) {
            this.remember();
            this.$store.commit("config/setLogin", true);
            this.$store.commit("config/setUsetInfo", res.data.data);
            this.$store.commit("config/setidentity", res.data.data.role_id);
            sessionStorage.setItem("access_token", res.data.data.access_token);
            let username = "";
            username =
              res.data.data.userName ||
              res.data.data.employeeName ||
              this.ns[res.data.data.role_id];
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
              message: res.data.message,
              type: "warning",
            });
            this.$store.commit("config/setLogin", false);
          }
        });
    },
  },
  computed: {
    ...mapMutations("config", ["setUsetInfo"]),
    ...mapState("config", ["identity"]),
  },
  watch: {
    identity(newValue) {
      if (newValue == 4) {
        this.$router.push("/demand/waitDemand");
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
  overflow: hidden;
  .loading {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
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
      font-family: SourceHanSerifSC-Heavy;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      width: 190px;
      margin: 30px auto;
      display: flex;
      width: 75%;
      justify-content: space-between;
      > div {
        text-align: center;
        cursor: pointer;
        border-bottom: 4px solid transparent;
      }
      > .active {
        border-bottom: 4px solid #00eaff;
      }
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
      top: -90px;
      left: -14px;
      height: 300px;
      width: 220px;
    }
  }
  .ap {
    width: 306px;
    margin: 0 auto;
    > div {
      margin-bottom: 16px;
      > input {
        width: 100%;
        display: inline-block;
        height: 36px;
        line-height: 36px;
        background: #ffffff;
        border-radius: 2px;
        border: 1px solid transparent;
        background-repeat: no-repeat;
        background-position: 1% center;
        padding-left: 25px;
        box-sizing: border-box;
      }
      > input:focus {
        border: 1px solid #409eff;
        outline: 0;
      }
      > .phone {
        background-image: url("../../assets/phone.png");
      }
      > .pw {
        background-image: url("../../assets/pw.png");
      }
    }
    .memory {
      > span:nth-child(1) {
        display: inline-block;
        background-color: transparent;
        width: 16px;
        height: 16px;
        border: 1px solid #fff;
        cursor: pointer;
        vertical-align: middle;
        margin-right: 10px;
      }
      > span:nth-child(2) {
        vertical-align: middle;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        cursor: pointer;
      }
      > #remember {
        background-image: url("../../assets/listlogo/checked.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    > .go {
      cursor: pointer;
      text-align: center;
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 4px;
      height: 48px;
      line-height: 48px;
      background: #0883fe;
      border-radius: 2px;
    }
  }
}
</style>