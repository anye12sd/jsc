<template>
  <div class="pcCockpit">
    <div class="tit">PC驾驶舱</div>
    <div class="option">
      <div
        v-for="k in usingOption"
        :key="k.name"
        :class="'op ' + (current == k.id ? k.classname1 : k.classname2)"
        @click="chose(k)"
      >
        {{ k.name }}
      </div>
      <!-- <div :class="'op '+(current==0?'status02':'status01')" @click="chose(0)">页面展示</div>
      <div :class="'op '+(current==1?'status12':'status11')" @click="chose(1)">页面管理</div>
      <div :class="'op '+(current==2?'status12':'status11')" @click="chose(2)">页面订阅</div> -->
    </div>
    <router-view></router-view>
    <!-- <div v-if="current == 0"></div>
    <approval v-else-if="current== 1"></approval>
    <subscribe v-else></subscribe> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
// import approval from './approval'
// import subscribe from "./subscribe"
export default {
  name: "pcCockpit",
  data() {
    return {
      current: 0,
      usingOption: [],
      options: [
        {
          id: 7,
          routerpath: "/pcCockpit/pageShow",
          name: "页面展示",
          classname1: "status02",
          classname2: "status01",
        },
        {
          id: 9,
          routerpath: "/pcCockpit/approval",
          name: "页面管理",
          classname1: "status12",
          classname2: "status11",
        },
        {
          id: 8,
          routerpath: "/pcCockpit/subScribe",
          name: "页面订阅",
          classname1: "status12",
          classname2: "status11",
        },
      ],
    };
  },
  components: {
    // approval,subscribe
  },
  computed: {
    ...mapState("config", ["currentRouterPath", "1"]),
  },
  mounted() {
    this.change();
  },
  methods: {
    ...mapMutations("config",["setpcCockpit"]),
    chose(item) {
      this.current = item.id;
      this.$router.push(item.routerpath);
    },
    change() {
      if (this[1].items) {
        this.options.forEach((item) => {
          this[1].items.forEach((p) => {
            if (item.id == p.id) {
              item.name = p.name;
              this.usingOption.push(item);
            }
          });
        });
        this.usingOption[0].classname1 = "status02";
        this.usingOption[0].classname2 = "status01";
        // this.$store.commit("jurisdiction/setpcCockpit",this.usingOption[0].routerpath.split("/")[2])
      }
    },
  },
  watch: {
    currentRouterPath(newValue, oldValue) {
      this.options.forEach((item) => {
        if (newValue.includes(item.routerpath)) {
          this.current = item.id;
        }
      });
    },
    1() {
      // console.log(this[1])
      this.change();
    },
    usingOption(){
      if(location.hash == "#"+this.usingOption[0].routerpath) return
      this.$router.push(this.usingOption[0].routerpath)
    }

  },
};
</script>

<style scoped lang="less">
.pcCockpit {
  margin: 1% auto 0 auto;
  width: 91%;
  // height: 89%;
  height: 89.6%;
  overflow: hidden;
  // width: 1350px;
  // height: 670px;
  background: #ffffff;
  border-radius: 4px;
  padding: 20px 30px;
  box-sizing: border-box;
  position: relative;
  .tit {
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    color: #292929;
  }
  .option {
    display: flex;
    border-bottom: 1px solid #ebebeb;
    margin-top: 1%;
    .op {
      width: 113px;
      padding: 7px 0;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      cursor: pointer;
      background-size: 98% 98%;
    }
    .op:nth-of-type(1) {
      padding-left: 20px;
      box-sizing: border-box;
    }
    .op:nth-of-type(2) {
      text-align: center;
      position: relative;
      left: -10px;
    }
    .op:nth-of-type(3) {
      text-align: center;
      position: relative;
      left: -20px;
    }
  }
  .status01 {
    background-image: url("../../assets/rect01.png");
    background-repeat: no-repeat;
    color: #666f8e;
  }
  .status02 {
    background-image: url("../../assets/rect02.png");
    background-repeat: no-repeat;
    color: #ffffff;
  }
  .status11 {
    background-image: url("../../assets/rect11.png");
    background-repeat: no-repeat;
    color: #666f8e;
  }
  .status12 {
    background-image: url("../../assets/rect12.png");
    background-repeat: no-repeat;
    color: #ffffff;
  }
}
</style>
