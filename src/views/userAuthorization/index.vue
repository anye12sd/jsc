<template>
  <div class="userAuthorization">
    <div class="tit">用户授权管理</div>
    <div class="option">
      <div
        v-for="k in usingOption"
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "userAuthorization",
  data() {
    return {
      current: 0,
      usingOption: [],
      isconfig:false,
      options: [
        {
          id: 16,
          routerpath: "/userAuthorization/userManaga",
          name: "用户管理",
          classname1: "status02",
          classname2: "status01",
        },
        {
          id: 1,
          routerpath: "/userAuthorization/roleManaga",
          name: "角色管理",
          classname1: "status12",
          classname2: "status11",
        },
        {
          id: 17,
          routerpath: "/userAuthorization/roleAssignment",
          name: "角色分配",
          classname1: "status12",
          classname2: "status11",
        },
      ],
    };
  },
  mounted() {
    this.change();
  },
  computed: {
    ...mapState("config", ["currentRouterPath", "6"]),
  },
  methods: {
    chose(item) {
      if (this.current == item.id) return;
      this.current = item.id;
      this.$router.push(item.routerpath);
    },
    change() {
      if(this.isconfig) return
      if (this[6].items) {
        this.options.forEach((item) => {
          this[6].items.forEach((p) => {
            if (item.id == p.id) {
              item.name = p.name;
              this.usingOption.push(item);
            }
          });
        });
        this.usingOption[0].classname1 = "status02";
        this.usingOption[0].classname2 = "status01";
        this.current = this.usingOption[0].id
        this.isconfig = true
      }
      // console.log(555555,this[6],this.usingOption)
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
    6() {
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
.userAuthorization {
  margin: 1% auto 0 auto;
  width: 91%;
  // height: 89%;
  height: 89.6%;
  overflow: hidden;
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
    .op:nth-of-type(4) {
      text-align: center;
      position: relative;
      left: -30px;
    }
    .op:nth-of-type(5) {
      text-align: center;
      position: relative;
      left: -30px;
    }
    .special {
      width: 150px;
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