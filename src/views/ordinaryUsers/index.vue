<template>
  <div class="oridinaryUsers">
    <div class="top">
      <div class="time">{{ date1 }}&nbsp;&nbsp;{{ date2 }}</div>
      <div class="tit">数字驾驶舱桌面版</div>
      <div class="user">
        <span>{{ week[day] }}</span>
        <img src="../../assets/oridinary/portrait.png" alt=" " />
        <span>普通用户</span>
      </div>
    </div>
    <pcdrive></pcdrive>
    <div class="bottom">
        <div class="page">
            
        </div>
        <div></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import pcdrive from "./pcdrive"
export default {
  name: "oridinaryUsers",
  data() {
    return {
      date1: "2021-3-24",
      date2: "12:00",
      day: 0,
      week: {
        0: "星期日",
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
      },
      iden: {},
    };
  },
  mounted() {
    this.getTime();
  },
  components:{
      pcdrive
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  methods: {
    getTime() {
      let date = new Date();
      this.date1 = date.toLocaleDateString().split("/").join("-");
      this.date2 = date.getHours() + ":" + date.getMinutes();
      this.day = date.getDay();
      console.log(this.day);
    },
  },
};
</script>

<style scoped lang="less">
.oridinaryUsers {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("../../assets/oridinary/head.png"),
    url("../../assets/oridinary/leftside.png"),
    url("../../assets/oridinary/rightside.png"),
    url("../../assets/oridinary/bottom.png"),
    url("../../assets/oridinary/line.png");
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat,no-repeat;
  background-size: 98% auto, auto 65%, auto 65%, 65% auto,65% auto;
  background-position: center top, left 26%, right 26%, center bottom,center bottom;
  .top {
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 8%;
    box-sizing: border-box;
    padding-top: 1.1%;
    div {
      flex: 1;
    }
    .tit {
      text-align: center;
      font-family: Helvetica;
      font-size: 28px;
      color: #ffffff;
      letter-spacing: 4px;
    }
    .time {
      text-align: left;
      font-family: MicrosoftYaHei;
      font-size: 10px;
      color: #00eaff;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .user {
      font-family: MicrosoftYaHei;
      font-size: 10px;
      color: #00eaff;
      display: flex;
      align-items: center;
      text-align: right;
      justify-content: flex-end;
      span {
        margin-left: 5px;
      }
      img {
        margin-left: 5px;
      }
    }
  }

}
</style>