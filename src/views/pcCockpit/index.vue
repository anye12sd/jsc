<template>
  <div class="pcCockpit">
    <div class="tit">PC驾驶舱</div>
    <div class="option">
      <div :class="'op '+(current==0?'status02':'status01')" @click="chose(0)">页面展示</div>
      <div :class="'op '+(current==1?'status12':'status11')" @click="chose(1)">页面审批</div>
    </div>
    <div v-if="current == 0"></div>
    <approval v-else></approval>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import approval from './approval'
export default {
  name: "pcCockpit",
  data() {
    return {
        current:0
    };
  },
  components: {
    approval
  },
  methods: {
      chose(i){
          this.current = i;
      }
  },
};
</script>

<style scoped lang="less">
.pcCockpit {
  margin: 1% auto 0 auto;
  width: 91%;
  height: 89%;
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
  .option{
      display: flex;
      border-bottom: 1px solid #EBEBEB;
      margin-top: 1%;
      .op{
          width: 113px;
          padding: 7px 0;
          font-family: MicrosoftYaHei;
          font-size: 16px;
          cursor: pointer;
          background-size: 98% 98%;
      }
      .op:nth-of-type(1){
          padding-left: 20px;
          box-sizing: border-box;
      }
      .op:nth-of-type(2){
          text-align: center;
          position: relative;
          left: -10px;
      }
  }
  .status01{
      background-image: url("../../assets/rect01.png");
      background-repeat: no-repeat;
      color: #666F8E;
      
  }
  .status02{
      background-image: url("../../assets/rect02.png");
      background-repeat: no-repeat;
      color: #FFFFFF;
  }
  .status11{
      background-image: url("../../assets/rect11.png");
      background-repeat: no-repeat;
      color: #666F8E;
      
  }
  .status12{
      background-image: url("../../assets/rect12.png");
      background-repeat: no-repeat;
      color: #FFFFFF;
  }
}
</style>
