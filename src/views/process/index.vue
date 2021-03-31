<template>
  <div class="process">
    <div class="tit">流程审批</div>
    <div class="option">
      <div
        v-for="k in options"
        :key="k.name"
        :class="'op ' + (current == k.id ? k.classname1 : k.classname2)"
        @click="chose(k)"
      >
        {{ k.name }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// 流程审批
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "process",
  data() {
    return {
      current: 0,
      options: [
        {
          id: 0,
          routerpath: "/process/hasDoing",
          name: "待办事项",
          classname1: "status02",
          classname2: "status01",
        },
        {
          id: 1,
          routerpath: "/process/iStarted",
          name: "已办事项",
          classname1: "status12",
          classname2: "status11",
        },
        {
          id: 2,
          routerpath: "/process/waitDoing",
          name: "我发起的",
          classname1: "status12",
          classname2: "status11",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    chose(item) {
      this.current = item.id;
      this.$router.push(item.routerpath);
    },
  },
  computed:{
    ...mapState("config",["currentRouterPath"])
  },
   watch: {
    currentRouterPath(newValue,oldValue) {
      this.options.forEach(item=>{
        if(newValue.includes(item.routerpath)){
          this.current = item.id;
        }
      })
    },
  }
};
</script>

<style scoped lang="less">
.process {
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