<template>
  <div class="topbar">
    <div class="tit">长兴驾驶舱PC端后台管理系统</div>
    <div
      v-for="p in option"
      :key="p.txt"
      :class="'item ' + (p.id == current ? 'active' : '')"
      @click="chose(p.id, p.path)"
    >
      <img :src="p.img" alt="图片缺失" style="width: 30px" />
      <p>{{ p.txt }}</p>
    </div>
    <div class="user">
      <img src="" alt="暂无头像" />
      <div class="right">
        <div>
          <span class="userName">{{ userInfo.name }}</span>
          <span class="identity">{{ userInfo.identity }}</span>
        </div>
        <div class="time">{{ date1 }}&nbsp;&nbsp;{{ date2 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "topbar",
  data() {
    return {
      date1: "2021-3-24",
      date2: "12:00",
      current: 0,
      userInfo: {
        name: "王晓明",
        identity: "单位管理员",
      },
      option: [
        {
          id: 0,
          img: require("@/assets/topBar/pccok.png"),
          txt: "PC驾驶舱",
          path: "/pcCockpit",
        },
        {
          id: 1,
          img: require("@/assets/topBar/modle.png"),
          txt: "应用成果超市",
          path: "/supermarket",
        },
        {
          id: 2,
          img: require("@/assets/topBar/introduce.png"),
          txt: "模型介绍",
          path: "/modelIntroduce",
        },
        {
          id: 3,
          img: require("@/assets/topBar/needs.png"),
          txt: "需求管理",
          path: "/demand",
        },
        {
          id: 4,
          img: require("@/assets/topBar/users.png"),
          txt: "用户授权管理",
          path: "/userAuthorization",
        },
        {
          id: 5,
          img: require("@/assets/topBar/process.png"),
          txt: "流程审批",
          path: "/process",
        },
      ],
    };
  },
  components: {
    // HelloWorld
  },
  mounted() {
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 5000);
  },
  methods: {
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
    $route(to, from) {
      let path = document.location.hash;
      this.$store.commit("config/setPath",path)
      this.option.forEach(item=>{
        if(path.includes(item.path)) {
          this.current = item.id
        }
      })
    },
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
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
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