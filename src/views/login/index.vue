<template>
  <div id="login">
    <div id="scanCode"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import {aaaa,bbbb,cccc,dddd} from "@/api/user"
export default {
  name: "login",
  data() {
    return {
      HZScan:null
    };
  },
  mounted() {
    // this.setDD()
    this.init();
    console.log(window)
  },
  methods: {
    setDD(){
        var DDLogin = function (a) {
          var e;
          var c = document.createElement("iframe");
          var d = a.goto;
          c.src = d;
          c.frameBorder = "0";
          c.allowTransparency = "true";
          c.scrolling = "no";
          c.width = a.width ? a.width + "px" : "365px";
          c.height = a.height ? a.height + "px" : "400px";
          e = document.getElementById(a.id);
          e.innerHTML = "";
          e.appendChild(c);
        };
        var d = function (params) {
          const ddOrigin =
            params.ddOrigin || "https://login-pro.ding.zj.gov.cn";
          let url = encodeURIComponent(
            params.defaultPage +
              "/entry?clientId=" +
              params.clientId +
              "&version=2"
          );
          if (params.redirectUri) {
            url = encodeURIComponent(
              params.defaultPage +
                "/entry?redirect_uri=" +
                params.redirectUri +
                "&clientId=" +
                params.clientId +
                "&version=2"
            );
          }
          let goTo = `${ddOrigin}/oauth2/auth.htm?client_id=${params.appKey}&response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true&redirect_uri=${url}`;
          DDLogin({
            id: params.elementId,
            goto: goTo,
            style: "border:none;background-color:transparent;margin-top: 0;",
            width: "220",
            height: "292",
          });
          let hanndleMessage = (event) => {
            let origin = event.origin;
            if (origin === ddOrigin) {
              let loginTmpCode = event.data;
              const entry = `${decodeURIComponent(url)}&code=${
                loginTmpCode.code
              }`;
              location.href = entry;
              window.event.returnValue = false;
            }
          };
          if (typeof window.addEventListener !== "undefined") {
            window.addEventListener("message", hanndleMessage, false);
          } else if (typeof window.attachEvent !== "undefined") {
            window.attachEvent("onmessage", hanndleMessage);
          }
        };

        window.HZScan = d;
        // this.HZScan = d;

        function k(a) {
          var e,
            c = document.createElement("iframe"),
            d = "https://login.dingtalk.com/login/qrcode.htm?goto=" + a.goto;
          (d += a.style ? "&style=" + encodeURIComponent(a.style) : ""),
            (d += a.href ? "&href=" + a.href : ""),
            (c.src = d),
            (c.frameBorder = "0"),
            (c.allowTransparency = "true"),
            (c.scrolling = "no"),
            (c.width = a.width ? a.width + "px" : "365px"),
            (c.height = a.height ? a.height + "px" : "400px"),
            (e = document.getElementById(a.id)),
            (e.innerHTML = ""),
            e.appendChild(c);
        }
        window.DDLogin = k;
    },
    init() {
      window.HZScan({
        elementId: "scanCode",
        clientId: "cef7bd18c41c438c9cb9657bed5c00d2",
        defaultPage: "http://172.21.246.157", //固定
        redirectUri:"http://localhost:8080",
          // "http://eipx7.giscloud.cx/security/authentication/dingding&version=2",
        appKey: "hz_gov_dingding_login_dingoa",
        // 浙政钉钉
        ddOrigin: "https://login-pro.ding.zj.gov.cn",
        // 专有钉钉
        // ddOrigin: 'https://login.dg-work.cn',
      });
      let handleMessage = function (event) {
        let origin = event.origin;
        console.log("origin", event.origin);
        if (origin == "https://login.dingtalk.com") {
          //判断是否来自ddLogin扫码事件。
          let loginTmpCode = event.data;
          //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          console.log("loginTmpCode", loginTmpCode);
          location.href =
            "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=hz_gov_dingding_login_dingoa&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://172.21.246.157&loginTmpCode=" +
            loginTmpCode;
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", handleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", handleMessage);
      }
    },
  },
  computed: {
    // ...mapState("config", ["ddLoginFormal", "ddLoginTest"]),
  },
};
</script>

<style scoped>
</style>