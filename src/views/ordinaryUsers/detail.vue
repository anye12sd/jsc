<template>
  <div class="detail">
    <!-- <div class="back" @click="goback">返回模型超市</div> -->
    <div class="toptit">
      <img src="@/assets/img/dw.png" alt="图" />
      <span>应用门户&nbsp;&nbsp;></span>
      <span>{{ modelInfo.modulename }}</span>
    </div>
    <div class="left">
      <div class="lo">
        <div
          v-for="(value, name) in leftopt"
          :key="name"
          @click="showdetail(name)"
          :class="active == name ? 'active' : ''"
        >
          <span
            >{{ value.slice(0, 4) }} <br v-if="value.length > 4" />{{
              value.slice(4)
            }}
          </span>
        </div>
      </div>
      <div class="ro">
        <div
          v-for="(value, name) in rightopt"
          :key="name"
          @click="showdetail(name)"
          :class="active == name ? 'active' : ''"
        >
          <span
            >{{ value.slice(0, 4) }} <br v-if="value.length > 4" />{{
              value.slice(4)
            }}</span
          >
        </div>
      </div>
    </div>
    <div class="right">
      <div class="icon"></div>
      <div class="title">{{ opt[active] }}</div>
      <div class="content" v-if="info[active]">
        <div v-for="(p, index) in info[active].split('\n')" :key="index">
          {{ p }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { introduce } from "@/api/list.js";
import { mapState } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      info: {},
      active: "definition",
      leftopt: {
        definition: "任务定义",
        dismantling: "逐级拆解至最小任务项",
        synergy: "确定牵头/协同关系",
        system: "建立指标体系",
        requirements: "确定数据需求",
        source: "确定数源系统",
      },
      rightopt: {
        collaboration: "任务整体画像",
        integration: "集成流程监控",
        business: "智能分析",
        analysis: "业务集成数据集成",
        monitoring: "确定数据集成流程",
        portrait: "确定业务协同流程",
      },
      opt: {
        definition: "任务定义",
        dismantling: "逐级拆解至最小任务项",
        synergy: "确定牵头/协同关系",
        system: "建立指标体系",
        requirements: "确定数据需求",
        source: "确定数源系统",
        collaboration: "任务整体画像",
        integration: "集成流程监控",
        business: "智能分析",
        analysis: "业务集成数据集成",
        monitoring: "确定数据集成流程",
        portrait: "确定业务协同流程",
      },
    };
  },
  computed: {
    ...mapState("jurisdiction", ["modelInfo"]),
  },
  mounted() {
    // console.log(this.$route.params, this.modelInfo);
    introduce(this.$route.params.id).then((res) => {
      console.log(res);
      this.info = res.data.data;
    });
  },
  methods: {
    showdetail(name) {
      // console.log(name);
      this.active = name;
    },
    goback() {
      // this.$router.go(-1);
      this.$router.push("/oridinaryUsers/modelmarket");
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  height: 78%;
  width: 95%;
  margin: 1% auto 0 auto;
  box-sizing: border-box;
  padding: 5px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .back {
    width: 100%;
    height: 25px;
    line-height: 25px;
    font-family: SourceHanSansCN-Bold;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    text-shadow: 0 0 9px rgba(109, 227, 255, 0.59);
    padding-left: 110px;
    background: url("../../assets/oridinary/toback.png") no-repeat;
    background-position: 50px center;
    background-size: 185px 100%;
    cursor: pointer;
  }
  .toptit {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > span:nth-child(2) {
      opacity: 0.8;
      font-family: MicrosoftYaHei;
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 0;
    }
    > span:nth-child(3) {
      font-family: MicrosoftYaHei-Bold;
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 0;
    }
  }
  .left {
    width: 40%;
    margin-right: 30px;
    display: flex;
    align-items: center;
    display: flex;
    > div {
      width: 50%;
      height: 90%;
      > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        > span {
          display: block;
          text-align: center;
          width: 100%;
        }
      }
    }
    .lo {
      div {
        background: url("../../assets/oridinary/normalleft.png") no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        width: 45%;
        text-align: center;
        padding: 6px 0;
        cursor: pointer;
        height: 11%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 4px;
      }
      > div:nth-of-type(1) {
        margin-left: 10%;
      }
      > div:nth-of-type(2) {
        margin-left: 20%;
      }
      > div:nth-of-type(3) {
        margin-left: 30%;
      }
      > div:nth-of-type(4) {
        margin-left: 40%;
      }
      > div:nth-of-type(5) {
        margin-left: 50%;
      }
      > div:nth-of-type(6) {
        margin-left: 60%;
      }
      > .active {
        background: url("../../assets/oridinary/checkleft.png") no-repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
    }
    .ro {
      div {
        background: url("../../assets/oridinary/normalright.png") no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        width: 45%;
        text-align: center;
        padding: 6px 0;
        cursor: pointer;
        height: 11%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 4px;
      }
      > div:nth-of-type(1) {
        margin-left: 60%;
      }
      > div:nth-of-type(2) {
        margin-left: 50%;
      }
      > div:nth-of-type(3) {
        margin-left: 40%;
      }
      > div:nth-of-type(4) {
        margin-left: 30%;
      }
      > div:nth-of-type(5) {
        margin-left: 20%;
      }
      > div:nth-of-type(6) {
        margin-left: 10%;
      }
      > .active {
        background: url("../../assets/oridinary/checkright.png") no-repeat;
        background-size: 100% 100%;
        background-position: center center;
      }
    }
    div {
      font-family: SourceHanSansCN-Regular;
      font-size: 12px;
      color: #ffffff;
      letter-spacing: 0;
      text-shadow: 0 2px 1px #072026;
    }

    .top {
      width: 100%;
      display: flex;
      height: 75%;
      .main {
        width: 64%;
        margin-left: 6%;
        display: flex;
        align-content: center;
        text-align: center;
        flex-wrap: wrap;
        background-size: 100% 100%;
        cursor: pointer;
        height: 100%;
        > div {
          width: 100%;
          font-family: SourceHanSansCN-Medium;
          font-size: 16px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
        }
      }
    }
  }
  .right {
    width: 40%;
    background: rgba(6, 26, 62, 0.4);
    box-shadow: inset 0 1px 3px 0 rgba(0, 255, 234, 0.5),
      inset 0 0 11px 0 #00b7ff;
    border-radius: 20px;
    padding: 2% 2%;
    box-sizing: border-box;
    height: calc(100% - 25px);
    .icon {
      width: 64px;
      height: 5px;
      background-image: linear-gradient(270deg, #11f8ee 4%, #02c0fd 87%);
    }
    .title {
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      color: #ffffff;
      margin-top: 10px;
    }
    .content {
      font-family: MicrosoftYaHei;
      font-size: 13px;
      color: #ffffff;
      letter-spacing: 1px;
      margin-top: 5px;
    }
  }
}
</style>