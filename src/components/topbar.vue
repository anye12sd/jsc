<template>
  <div class="topbar">
    <div class="tit">数据分析应用成果超市</div>
    <div
      v-for="p in usingOption"
      :key="p.id"
      :class="'item ' + (p.id == current ? 'active' : '')"
      @click="chose(p.id, p.path)"
    >
      <img :src="p.img" alt="图片缺失" style="width: 30px" />
      <p>{{ p.name }}</p>
    </div>
    <div class="user">
      <div class="left" @click="gobefore">返回前台</div>
      <div class="right">
        <div>
          <span class="userName">{{ userInfo.userName }}</span>
          <span class="identity">{{ identity[userInfo.role_id] }}</span>
        </div>
        <div class="time">{{ date1 }}&nbsp;&nbsp;{{ date2 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { getMenu } from "@/api/user.js";
export default {
  name: "topbar",
  data() {
    return {
      date1: "2021-3-24",
      date2: "12:00",
      current: 0,
      usingOption: [],
      identity: {
        1: "系统管理员",
        2: "单位管理员",
        3: "普通用户",
        4: "模型开发人员",
      },
      option: [
        {
          id: 1,
          img: require("@/assets/topBar/pccok.png"),
          name: "PC驾驶舱",
          path: "/pcCockpit",
        },
        {
          id: 2,
          img: require("@/assets/topBar/modle.png"),
          name: "应用成果超市",
          path: "/supermarket",
        },
        {
          id: 3,
          img: require("@/assets/topBar/introduce.png"),
          name: "模型介绍",
          path: "/modelIntroduce",
        },
        {
          id: 4,
          img: require("@/assets/topBar/needs.png"),
          name: "需求管理",
          path: "/demand",
        },
        {
          id: 6,
          img: require("@/assets/topBar/users.png"),
          name: "用户授权管理",
          path: "/userAuthorization",
        },
        {
          id: 5,
          img: require("@/assets/topBar/process.png"),
          name: "流程审批",
          path: "/process",
        },
      ],
    };
  },
  components: {
    // HelloWorld
  },
  computed:{
    ...mapState('config',['isLogin',"topbararr","userInfo"])
  },
  mounted() {
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 5000);
    this.init();
  },
  methods: {
    init() {
        let op = JSON.parse(JSON.stringify(this.topbararr));
        // console.log(op)
        op.forEach((item, index) => {
          if (item.id == 1) {
            // console.log("kkkkk", item);
            this.$store.commit("config/setpcCockpit", op[index]);
          } else if (item.id == 2) {
            this.$store.commit("config/setsupermarket",op[index]);
          } else if (item.id == 3) {
            this.$store.commit("config/setmodelIntroduce", op[index]);
          } else if (item.id == 4) {
            this.$store.commit("config/setdemand", op[index]);
          } else if (item.id == 5) {
            this.$store.commit("config/setprocess", op[index]);
          } else if (item.id == 6) {
            this.$store.commit(
              "config/setuserAuthorization",
              op[index]
            );
          }
          this.option.forEach((k) => {
            if (item.id == k.id) {
              item.img = k.img;
              item.path = k.path;
            }
          });
        });
        this.usingOption = op;
        // console.log(this.usingOption)
    },
    gobefore(){
      this.$router.push("/oridinaryUsers")
    },
    chose(index, path) {
      this.current = index;
      this.$router.push(path);
    },
    getTime() {
      let date = new Date();
      this.date1 = date.toLocaleDateString().split("/").join("-");
      this.date2 = date.getHours() + ":" + date.getMinutes();
    },
  },
  watch: {
    topbararr(){
      this.init()
    },
    $route(to, from) {
      let path = document.location.hash;
      this.$store.commit("config/setPath", path);
      let flag = true;
      this.option.forEach((item) => {
        if (path.includes(item.path)) {
          flag = false;
          this.current = item.id;
        }
      });
      if (flag) {
        this.current = -1;
      }
    },
    usingOption(){
      // console.log("change")
      let flag = false;
      if(this.usingOption.length == 0) return
      // console.log(this.usingOption)
      this.usingOption.forEach(item=>{
        if(location.hash.includes(item.path)) {
          flag = true
          this.current = item.id
        }
      })
      if(flag) return
      this.$router.push(this.usingOption[0].path)
      // if("/"+location.hash.split("/")[1] == this.usingOption[0].path) return
      // this.$router.push(this.usingOption[0].path)
    }
  },
};
</script>

<style scoped lang="less">
.topbar {
  background: #016cf0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7.4%;
  .tit {
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    margin-left: 2.5%;
    // margin-right: 11.2%;
  }
  .item {
    // width: 6.5%;
    cursor: pointer;
    padding: 0 20px;
    height: 100%;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    // margin-left: 6%;
    display: flex;
    // align-items: center;
    align-content: center;
    flex-wrap: wrap;
    justify-content: center;
    img {
      margin-bottom: 5px;
    }
    p {
      width: 100%;
    }
  }
  .item:nth-of-type(2) {
    margin: 0;
  }
  .active {
    background-image: linear-gradient(0deg, #004bdb 0%, #175ceb 100%);
  }
  .user {
    // position: absolute;
    // right: 16px;
    display: flex;
    align-items: center;
    .left{
      font-family: PingFangSC-Medium;
      color: #ffffff;
      margin-right: 5px;
      cursor: pointer;
    }
    .userName {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
    }
    .identity {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #eff2f6;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      margin-left: 8px;
    }
    .time {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #eaefff;
      letter-spacing: 1px;
    }
  }
}
</style>